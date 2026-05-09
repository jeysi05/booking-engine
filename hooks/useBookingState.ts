"use client";

import { useReducer } from "react";
import type { BookingState, TimeSlot } from "@/types";

type BookingAction =
  | { type: "select-date"; date: Date }
  | { type: "select-resource"; resourceId: string }
  | { type: "toggle-slot"; slot: TimeSlot }
  | { type: "set-cart-open"; isOpen: boolean }
  | { type: "clear-slots" };

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "select-date":
      return { ...state, selectedDate: action.date, selectedSlots: [] };
    case "select-resource":
      return { ...state, selectedResource: action.resourceId, selectedSlots: [] };
    case "toggle-slot": {
      if (action.slot.status !== "available") {
        return state;
      }

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
    case "clear-slots":
      return { ...state, selectedSlots: [], isCartOpen: false };
    default:
      return state;
  }
}

export function useBookingState(defaultResourceId: string) {
  const [state, dispatch] = useReducer(reducer, {
    selectedDate: new Date(),
    selectedResource: defaultResourceId,
    selectedSlots: [],
    isCartOpen: false
  });

  return {
    state,
    selectDate: (date: Date) => dispatch({ type: "select-date", date }),
    selectResource: (resourceId: string) => dispatch({ type: "select-resource", resourceId }),
    toggleSlot: (slot: TimeSlot) => dispatch({ type: "toggle-slot", slot }),
    openCart: () => dispatch({ type: "set-cart-open", isOpen: true }),
    closeCart: () => dispatch({ type: "set-cart-open", isOpen: false }),
    clearSlots: () => dispatch({ type: "clear-slots" })
  };
}