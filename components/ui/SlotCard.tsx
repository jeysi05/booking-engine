"use client";

import type { CSSProperties } from "react";
import type { PricingTier, TimeSlot } from "@/types";
import { formatCurrency } from "@/lib/pricing";

const tierAccentClasses: Record<PricingTier["color"], string> = {
  blue: "before:bg-blue-500",
  orange: "before:bg-orange-500",
  yellow: "before:bg-yellow-400",
  gray: "before:bg-slate-400"
};

const tierTextClasses: Record<PricingTier["color"], string> = {
  blue: "text-blue-700 bg-blue-50",
  orange: "text-orange-700 bg-orange-50",
  yellow: "text-yellow-700 bg-yellow-50",
  gray: "text-slate-600 bg-slate-100"
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
  const selectedStyle: CSSProperties | undefined = isSelected
    ? {
        background: `linear-gradient(145deg, ${primaryColor}, #12241c)`,
        borderColor: primaryColor,
        boxShadow: `0 18px 40px ${primaryColor}2f`
      }
    : undefined;

  return (
    <button
      type="button"
      disabled={isUnavailable}
      onClick={() => onToggle(slot)}
      className={`relative overflow-hidden rounded-[1.35rem] border bg-white p-3.5 text-left shadow-sm shadow-slate-900/5 transition duration-200 before:absolute before:inset-x-0 before:top-0 before:h-1.5 ${tierAccentClasses[tier.color]} ${
        isSelected ? "text-white" : "border-slate-200/80 text-slate-950 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10"
      } ${isUnavailable ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-65 grayscale" : ""}`}
      style={selectedStyle}
      aria-pressed={isSelected}
    >
      <span className="block text-base font-black tracking-tight">{slot.displayTime}</span>
      <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${isSelected ? "bg-white/20 text-white" : tierTextClasses[tier.color]}`}>
        {formatCurrency(slot.pricePerHour)}/hr
      </span>
      <span className={`mt-3 block text-[10px] font-black uppercase tracking-[0.18em] ${isSelected ? "text-white/70" : "text-slate-400"}`}>{slot.status}</span>
    </button>
  );
}
