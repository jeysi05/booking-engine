"use client";

import { PricingLegend } from "@/components/booking/PricingLegend";
import { SlotCard } from "@/components/ui/SlotCard";
import type { PricingTier, TimeSlot } from "@/types";

interface SlotGridProps {
  slots: TimeSlot[];
  tiers: PricingTier[];
  selectedSlots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  onToggleSlot: (slot: TimeSlot) => void;
  primaryColor: string;
}

export function SlotGrid({ slots, tiers, selectedSlots, isLoading, error, onToggleSlot, primaryColor }: SlotGridProps) {
  const tierById = new Map(tiers.map((tier) => [tier.id, tier]));

  return (
    <section className="px-4 pb-48 pt-6 sm:px-0">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">Step 3</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Pick your time</h2>
        </div>
        <p className="text-right text-xs font-bold leading-5 text-slate-500">{selectedSlots.length} selected</p>
      </div>
      <PricingLegend tiers={tiers} />

      {isLoading ? (
        <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-8 text-center shadow-sm">
          <div className="mx-auto mb-3 h-10 w-10 animate-pulse rounded-full" style={{ backgroundColor: `${primaryColor}22` }} />
          <p className="text-sm font-black text-slate-700">Loading available slots…</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Checking the latest schedule for this space.</p>
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-100 bg-red-50 p-6 text-center text-sm font-bold text-red-700">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {slots.map((slot) => {
            const tier = tierById.get(slot.pricingTierId) ?? tiers[0];
            return (
              <SlotCard
                key={slot.id}
                slot={slot}
                tier={tier}
                isSelected={selectedSlots.some((selectedSlot) => selectedSlot.id === slot.id)}
                onToggle={onToggleSlot}
                primaryColor={primaryColor}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}