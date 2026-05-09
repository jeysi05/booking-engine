"use client";

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
    <section className="px-4 py-5">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Step 1 · Select Date</p>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {getNextSevenDays().map((date, index) => {
          const selected = isSameDay(date, selectedDate);
          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelectDate(date)}
              className="min-w-[82px] rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm transition"
              style={selected ? { backgroundColor: primaryColor, color: "white", borderColor: primaryColor } : undefined}
            >
              <span className="block text-xs font-bold uppercase opacity-80">{index === 0 ? "Today" : weekdayFormatter.format(date)}</span>
              <span className="mt-1 block text-lg font-black">{monthDayFormatter.format(date)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
