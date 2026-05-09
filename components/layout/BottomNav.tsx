"use client";

interface BottomNavProps {
  slotCount: number;
  primaryColor: string;
  onOpenCart: () => void;
  onCheckout: () => void;
}

export function BottomNav({ slotCount, primaryColor, onOpenCart, onCheckout }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3">
        <button type="button" onClick={() => window.history.back()} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">
          Back
        </button>
        <button type="button" onClick={onOpenCart} className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-lg" style={{ backgroundColor: primaryColor }} aria-label="Open cart">
          🛒
          {slotCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-black text-white">
              {slotCount}
            </span>
          ) : null}
        </button>
        <button type="button" onClick={onCheckout} disabled={slotCount === 0} className="rounded-2xl px-4 py-3 text-sm font-black text-white disabled:bg-slate-300" style={slotCount > 0 ? { backgroundColor: primaryColor } : undefined}>
          Checkout
        </button>
      </div>
    </nav>
  );
}
