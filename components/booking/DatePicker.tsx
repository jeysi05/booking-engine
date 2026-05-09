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
    <section className="px-4 pt-6 sm:px-0">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">Step 1</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Choose your date</h2>
        </div>
        <p className="text-xs font-bold text-slate-500">Next 7 days</p>
      </div>
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {getNextSevenDays().map((date, index) => {
          const selected = isSameDay(date, selectedDate);
          const selectedStyle: CSSProperties | undefined = selected
            ? {
                background: `linear-gradient(145deg, ${primaryColor}, #13251d)`,
                borderColor: primaryColor,
                color: "white",
                boxShadow: `0 18px 35px ${primaryColor}33`
              }
            : undefined;

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelectDate(date)}
              className="min-w-[92px] rounded-3xl border border-slate-200/80 bg-white/90 px-3 py-4 text-center shadow-sm shadow-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/10"
              style={selectedStyle}
            >
              <span className="block text-[11px] font-black uppercase tracking-[0.18em] opacity-70">{index === 0 ? "Today" : weekdayFormatter.format(date)}</span>
              <span className="mt-2 block text-xl font-black tracking-tight">{monthDayFormatter.format(date)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}