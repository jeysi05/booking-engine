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
    <section className="px-4 py-5 pb-32">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Step 3 · Pick Times</p>
      <PricingLegend tiers={tiers} />

      {isLoading ? (
        <div className="rounded-3xl bg-white p-6 text-center text-sm font-bold text-slate-500 shadow-sm">Loading available slots…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center text-sm font-bold text-red-700">{error}</div>
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
