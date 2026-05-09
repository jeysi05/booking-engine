"use client";

import type { CSSProperties } from "react";
import type { DemoProfile } from "@/types";

interface DatePickerProps {
  profile: DemoProfile;
  selectedDate: Date;
  selectedEndDate: Date | null;
  onSelectDate: (date: Date) => void;
  onSelectEndDate: (date: Date) => void;
  primaryColor: string;
}

const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const monthDayFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function getUpcomingDays(count = 14): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function isSameDay(a: Date | null, b: Date): boolean {
  return Boolean(a && a.toDateString() === b.toDateString());
}

function isBetween(date: Date, start: Date, end: Date | null): boolean {
  if (!end) return false;
  return date > start && date < end;
}

export function DatePicker({ profile, selectedDate, selectedEndDate, onSelectDate, onSelectEndDate, primaryColor }: DatePickerProps) {
  const isNightly = profile.bookingMode === "nightly";
  const heading = isNightly ? "Choose your stay dates" : profile.bookingMode === "daily" ? "Choose your visit date" : "Pick a date";
  const helper = isNightly ? "Tap once for check-in, then choose checkout." : "Next 14 days";

  function handleDateClick(date: Date) {
    if (!isNightly) {
      onSelectDate(date);
      return;
    }

    if (date <= selectedDate || (selectedEndDate && isSameDay(selectedEndDate, date))) {
      onSelectDate(date);
      return;
    }

    onSelectEndDate(date);
  }

  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Date</p>
          <h2 className="mt-1 text-xl font-medium text-[#1C1917]">{heading}</h2>
        </div>
        <p className="text-right text-sm text-[#78716C]">{helper}</p>
      </div>

      <div className="scrollbar-hide -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {getUpcomingDays().map((date, index) => {
          const selectedStart = isSameDay(selectedDate, date);
          const selectedEnd = isSameDay(selectedEndDate, date);
          const inRange = isNightly && isBetween(date, selectedDate, selectedEndDate);
          const selected = selectedStart || selectedEnd;
          const selectedStyle: CSSProperties | undefined = selected
            ? { backgroundColor: primaryColor, borderColor: primaryColor, color: "white" }
            : inRange
              ? { backgroundColor: `${primaryColor}12`, borderColor: `${primaryColor}44` }
              : undefined;

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleDateClick(date)}
              className="h-20 w-20 shrink-0 snap-start rounded-xl border border-[#E5E1DA] bg-white text-center transition hover:border-[#C5BFB8] active:scale-[0.98]"
              style={selectedStyle}
            >
              <span className="block text-[11px] font-medium uppercase tracking-wide opacity-70">{index === 0 ? "Today" : weekdayFormatter.format(date)}</span>
              <span className="mt-1 block text-sm font-semibold">{monthDayFormatter.format(date)}</span>
              {isNightly && selectedStart ? <span className="mt-1 block text-[10px] opacity-75">Check-in</span> : null}
              {isNightly && selectedEnd ? <span className="mt-1 block text-[10px] opacity-75">Checkout</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
