"use client";

import type { CSSProperties } from "react";
import { formatCurrency } from "@/lib/pricing";
import type { PricingTier, TimeSlot } from "@/types";

interface SlotCardProps {
  slot: TimeSlot;
  tier: PricingTier;
  isSelected: boolean;
  onToggle: (slot: TimeSlot) => void;
  primaryColor: string;
}

export function SlotCard({ slot, tier, isSelected, onToggle, primaryColor }: SlotCardProps) {
  const isUnavailable = slot.status !== "available";
  const selectedStyle: CSSProperties | undefined = isSelected
    ? { backgroundColor: primaryColor, borderColor: primaryColor, color: "white" }
    : undefined;

  return (
    <button
      type="button"
      disabled={isUnavailable}
      onClick={() => onToggle(slot)}
      className={`rounded-xl border px-2 py-3 text-center text-sm transition active:scale-[0.98] ${
        isUnavailable
          ? "cursor-not-allowed border-[#E5E1DA] bg-[#F2F0EC] text-[#A8A29E]"
          : "border-[#E5E1DA] bg-white text-[#1C1917] hover:border-[#C5BFB8]"
      }`}
      style={selectedStyle}
      aria-label={`${slot.displayTime}, ${tier.label}`}
      aria-pressed={isSelected}
    >
      <span className="block font-medium">{slot.displayTime}</span>
      <span className="mt-1 block text-[11px] opacity-70">{isUnavailable ? slot.status : formatCurrency(slot.pricePerHour / 2)}</span>
    </button>
  );
}
