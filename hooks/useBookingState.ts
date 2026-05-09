"use client";

import { useReducer } from "react";
import type { BookingState, DemoProfile, TimeSlot } from "@/types";

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  next.setHours(0, 0, 0, 0);
  return next;
}

type BookingAction =
  | { type: "select-profile"; profile: DemoProfile }
  | { type: "select-date"; date: Date; profile: DemoProfile }
  | { type: "select-end-date"; date: Date }
  | { type: "select-resource"; resourceId: string }
  | { type: "toggle-slot"; slot: TimeSlot }
  | { type: "set-cart-open"; isOpen: boolean }
  | { type: "clear-selection"; profile: DemoProfile };

function initialState(profile: DemoProfile): BookingState {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    activeProfileId: profile.id,
    selectedDate: today,
    selectedEndDate: profile.bookingMode === "nightly" ? addDays(today, 1) : null,
    selectedResource: profile.resources[0]?.id ?? "",
    selectedSlots: [],
    isCartOpen: false
  };
}

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "select-profile":
      return initialState(action.profile);
    case "select-date": {
      const nextEndDate =
        action.profile.bookingMode === "nightly"
          ? state.selectedEndDate && state.selectedEndDate > action.date
            ? state.selectedEndDate
            : addDays(action.date, 1)
          : null;

      return {
        ...state,
        selectedDate: action.date,
        selectedEndDate: nextEndDate,
        selectedSlots: []
      };
    }
    case "select-end-date":
      return { ...state, selectedEndDate: action.date, selectedSlots: [] };
    case "select-resource":
      return { ...state, selectedResource: action.resourceId, selectedSlots: [] };
    case "toggle-slot": {
      if (action.slot.status !== "available") return state;

      const isSelected = state.selectedSlots.some((slot) => slot.id === action.slot.id);
      return {
        ...state,
        selectedSlots: isSelected
          ? state.selectedSlots.filter((slot) => slot.id !== action.slot.id)
          : [...state.selectedSlots, action.slot].sort((a, b) => a.time.localeCompare(b.time))
      };
    }
    case "set-cart-open":
      return { ...state, isCartOpen: action.isOpen };
    case "clear-selection":
      return { ...initialState(action.profile), isCartOpen: false };
    default:
      return state;
  }
}

export function useBookingState(defaultProfile: DemoProfile) {
  const [state, dispatch] = useReducer(reducer, defaultProfile, initialState);

  return {
    state,
    selectProfile: (profile: DemoProfile) => dispatch({ type: "select-profile", profile }),
    selectDate: (date: Date, profile: DemoProfile) => dispatch({ type: "select-date", date, profile }),
    selectEndDate: (date: Date) => dispatch({ type: "select-end-date", date }),
    selectResource: (resourceId: string) => dispatch({ type: "select-resource", resourceId }),
    toggleSlot: (slot: TimeSlot) => dispatch({ type: "toggle-slot", slot }),
    openCart: () => dispatch({ type: "set-cart-open", isOpen: true }),
    closeCart: () => dispatch({ type: "set-cart-open", isOpen: false }),
    clearSelection: (profile: DemoProfile) => dispatch({ type: "clear-selection", profile })
  };
}
