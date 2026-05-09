"use client";

import { PricingLegend } from "@/components/booking/PricingLegend";
import { SlotCard } from "@/components/ui/SlotCard";
import type { DemoProfile, Resource, TimeSlot } from "@/types";

interface SlotGridProps {
  profile: DemoProfile;
  selectedResource?: Resource;
  slots: TimeSlot[];
  selectedSlots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  onToggleSlot: (slot: TimeSlot) => void;
  primaryColor: string;
}

function getHeading(profile: DemoProfile): string {
  if (profile.niche === "court") return "Available court times";
  if (profile.niche === "studio") return "Available studio times";
  return "Available times";
}

export function SlotGrid({ profile, selectedResource, slots, selectedSlots, isLoading, error, onToggleSlot, primaryColor }: SlotGridProps) {
  if (profile.bookingMode !== "hourly") return null;

  const tierById = new Map(profile.pricingTiers.map((tier) => [tier.id, tier]));

  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Time</p>
          <h2 className="mt-1 text-xl font-medium text-[#1C1917]">{getHeading(profile)}</h2>
        </div>
        <p className="text-sm text-[#78716C]">{selectedSlots.length} selected</p>
      </div>
      <PricingLegend profile={profile} tiers={profile.pricingTiers} selectedResource={selectedResource} />

      {isLoading ? (
        <div className="mt-4 rounded-2xl border border-[#E5E1DA] bg-[#F9F7F4] p-6 text-center text-sm text-[#78716C]">Loading available times…</div>
      ) : error ? (
        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm font-medium text-red-700">{error}</div>
      ) : (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {slots.map((slot) => {
            const tier = tierById.get(slot.pricingTierId) ?? profile.pricingTiers[0];
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
