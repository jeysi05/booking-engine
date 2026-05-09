"use client";

import { formatCurrency } from "@/lib/pricing";

interface BottomNavProps {
  slotCount: number;
  estimatedTotal: number;
  primaryColor: string;
  onOpenCart: () => void;
  onCheckout: () => void;
}

export function BottomNav({ slotCount, estimatedTotal, primaryColor, onOpenCart, onCheckout }: BottomNavProps) {
  const hasSlots = slotCount > 0;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="mx-auto grid max-w-5xl justify-center lg:grid-cols-[20rem_minmax(0,31rem)] lg:gap-5">
        <div className="mx-auto w-full max-w-[31rem] rounded-[1.5rem] border border-white/80 bg-white/95 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl lg:col-start-2 lg:mx-0">
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <button type="button" onClick={onOpenCart} className="min-w-0 rounded-2xl bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100">
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reservation summary</span>
              <span className="mt-1 flex items-center gap-2 text-sm font-black text-slate-950">
                <span>{slotCount} {slotCount === 1 ? "slot" : "slots"}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{formatCurrency(estimatedTotal)}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={onCheckout}
              disabled={!hasSlots}
              className="rounded-2xl px-5 py-4 text-sm font-black text-white shadow-lg transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              style={hasSlots ? { backgroundColor: primaryColor, boxShadow: `0 16px 34px ${primaryColor}35` } : undefined}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}