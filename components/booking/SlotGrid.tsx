"use client";

import { PricingLegend } from "@/components/booking/PricingLegend";
import { SlotCard } from "@/components/ui/SlotCard";
import type { PricingTier, PricingUnit, TimeSlot } from "@/types";

interface SlotGridProps {
  slots: TimeSlot[];
  tiers: PricingTier[];
  pricingUnit: PricingUnit;
  selectedSlots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  onToggleSlot: (slot: TimeSlot) => void;
  primaryColor: string;
  heading?: string;
  helperText?: string;
}

export function SlotGrid({ slots, tiers, pricingUnit, selectedSlots, isLoading, error, onToggleSlot, primaryColor, heading = "Available times", helperText }: SlotGridProps) {
  const tierById = new Map(tiers.map((tier) => [tier.id, tier]));

  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#A8A29E]">Step 3</p>
          <h2 className="text-xl font-medium text-[#1C1917]">{heading}</h2>
        </div>
        <p className="text-sm text-[#78716C]">{helperText ?? `${selectedSlots.length} selected`}</p>
      </div>
      <PricingLegend tiers={tiers} pricingUnit={pricingUnit} />

      {isLoading ? (
        <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-[#F9F7F4] p-6 text-center text-sm text-[#78716C]">Loading available times…</div>
      ) : error ? (
        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm font-medium text-red-700">{error}</div>
      ) : (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
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
