"use client";

import { formatCurrency } from "@/lib/pricing";

interface BottomNavProps {
  isComplete: boolean;
  emptyLabel: string;
  selectedResourceLabel: string;
  dateLabel: string;
  durationLabel: string;
  total: number;
  primaryColor: string;
  onOpenCart: () => void;
  onCheckout: () => void;
}

export function BottomNav({ isComplete, emptyLabel, selectedResourceLabel, dateLabel, durationLabel, total, primaryColor, onOpenCart, onCheckout }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E1DA] bg-white/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto max-w-4xl">
        {isComplete ? (
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <button type="button" onClick={onOpenCart} className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-[#1C1917]">{selectedResourceLabel}</p>
              <p className="mt-0.5 text-xs text-[#78716C]">
                {dateLabel} · {durationLabel} · {formatCurrency(total)}
              </p>
            </button>
            <button type="button" onClick={onCheckout} className="rounded-xl px-5 py-3 text-sm font-medium text-white transition active:scale-[0.98]" style={{ backgroundColor: primaryColor }}>
              Reserve
            </button>
          </div>
        ) : (
          <button type="button" onClick={onOpenCart} className="w-full rounded-xl border border-[#E5E1DA] bg-[#F9F7F4] px-4 py-3 text-center text-sm font-medium text-[#78716C]">
            {emptyLabel}
          </button>
        )}
      </div>
    </nav>
  );
}
