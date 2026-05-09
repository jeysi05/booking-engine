"use client";

import type { CSSProperties } from "react";

interface DatePickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  primaryColor: string;
}

const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const monthDayFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function getNextSevenDays(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

export function DatePicker({ selectedDate, onSelectDate, primaryColor }: DatePickerProps) {
  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#A8A29E]">Step 1</p>
          <h2 className="text-xl font-medium text-[#1C1917]">Pick a date</h2>
        </div>
        <p className="text-sm text-[#78716C]">Next 7 days</p>
      </div>
      <div className="scrollbar-hide -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {getNextSevenDays().map((date, index) => {
          const selected = isSameDay(date, selectedDate);
          const selectedStyle: CSSProperties | undefined = selected
            ? { backgroundColor: primaryColor, borderColor: primaryColor, color: "white" }
            : undefined;

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelectDate(date)}
              className="h-20 w-16 shrink-0 snap-start rounded-xl border border-[#E5E1DA] bg-white text-center transition hover:border-[#C5BFB8] active:scale-[0.98]"
              style={selectedStyle}
            >
              <span className="block text-xs font-medium opacity-70">{index === 0 ? "Today" : weekdayFormatter.format(date)}</span>
              <span className="mt-1 block text-sm font-semibold">{monthDayFormatter.format(date)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
