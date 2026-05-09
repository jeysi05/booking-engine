"use client";

import type { CSSProperties } from "react";
import type { PricingTier, TimeSlot } from "@/types";
import { formatCurrency } from "@/lib/pricing";

const tierBorderClasses: Record<PricingTier["color"], string> = {
  blue: "border-blue-500 bg-blue-50/60",
  orange: "border-orange-500 bg-orange-50/60",
  yellow: "border-yellow-400 bg-yellow-50/70",
  gray: "border-slate-400 bg-slate-50"
};

interface SlotCardProps {
  slot: TimeSlot;
  tier: PricingTier;
  isSelected: boolean;
  onToggle: (slot: TimeSlot) => void;
  primaryColor: string;
}

export function SlotCard({ slot, tier, isSelected, onToggle, primaryColor }: SlotCardProps) {
  const isUnavailable = slot.status !== "available";

  return (
    <button
      type="button"
      disabled={isUnavailable}
      onClick={() => onToggle(slot)}
      className={`rounded-2xl border-2 px-3 py-3 text-left transition ${tierBorderClasses[tier.color]} ${
        isSelected ? "ring-2 ring-offset-2" : ""
      } ${isUnavailable ? "cursor-not-allowed border-slate-200 bg-slate-100 opacity-55 grayscale" : "hover:-translate-y-0.5 hover:shadow-md"}`}
      style={isSelected ? { "--tw-ring-color": primaryColor } as CSSProperties : undefined}
      aria-pressed={isSelected}
    >
      <span className="block text-sm font-bold text-slate-900">{slot.displayTime}</span>
      <span className="mt-1 block text-xs font-semibold text-slate-600">{formatCurrency(slot.pricePerHour)}/hr</span>
      <span className="mt-2 inline-flex rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {slot.status}
      </span>
    </button>
  );
}
