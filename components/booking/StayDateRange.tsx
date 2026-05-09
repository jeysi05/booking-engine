"use client";

import type { CSSProperties } from "react";
import type { ClientConfig } from "@/types";
import { getDateDifferenceInDays, getPricingUnitLabel } from "@/lib/pricing";

interface StayDateRangeProps {
  profile: ClientConfig;
  checkInDate: Date;
  checkOutDate: Date;
  onSelectCheckIn: (date: Date) => void;
  onSelectCheckOut: (date: Date) => void;
}

const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const monthDayFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function getDateOptions(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

export function StayDateRange({ profile, checkInDate, checkOutDate, onSelectCheckIn, onSelectCheckOut }: StayDateRangeProps) {
  const isNightly = profile.pricingUnit === "night";
  const duration = isNightly ? getDateDifferenceInDays(checkInDate, checkOutDate) : 1;

  function selectDate(date: Date) {
    if (!isNightly) {
      onSelectCheckIn(date);
      onSelectCheckOut(date);
      return;
    }

    if (date <= checkInDate || checkOutDate > checkInDate) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      onSelectCheckIn(date);
      onSelectCheckOut(nextDate);
      return;
    }

    onSelectCheckOut(date);
  }

  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#A8A29E]">Step 1</p>
          <h2 className="text-xl font-medium text-[#1C1917]">{profile.ui.dateHeading}</h2>
        </div>
        <p className="text-sm text-[#78716C]">{duration} {getPricingUnitLabel(profile.pricingUnit, duration)}</p>
      </div>

      <div className="scrollbar-hide -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {getDateOptions().map((date) => {
          const isCheckIn = isSameDay(date, checkInDate);
          const isCheckOut = isNightly && isSameDay(date, checkOutDate);
          const isSelected = isCheckIn || isCheckOut;
          const selectedStyle: CSSProperties | undefined = isSelected
            ? { backgroundColor: profile.client.primaryColor, borderColor: profile.client.primaryColor, color: "white" }
            : undefined;

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => selectDate(date)}
              className="h-20 w-20 shrink-0 snap-start rounded-xl border border-[#E5E1DA] bg-white text-center transition hover:border-[#C5BFB8] active:scale-[0.98]"
              style={selectedStyle}
            >
              <span className="block text-xs font-medium opacity-70">{weekdayFormatter.format(date)}</span>
              <span className="mt-1 block text-sm font-semibold">{monthDayFormatter.format(date)}</span>
              <span className="mt-1 block text-[10px] opacity-70">{isCheckIn ? (isNightly ? "In" : "Visit") : isCheckOut ? "Out" : ""}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
