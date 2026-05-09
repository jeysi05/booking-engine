"use client";

import type { CSSProperties } from "react";
import type { PricingTier, TimeSlot } from "@/types";
import { formatCurrency } from "@/lib/pricing";

<<<<<<< HEAD
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
=======
const tierBorderClasses: Record<PricingTier["color"], string> = {
  blue: "border-blue-500 bg-blue-50/60",
  orange: "border-orange-500 bg-orange-50/60",
  yellow: "border-yellow-400 bg-yellow-50/70",
  gray: "border-slate-400 bg-slate-50"
>>>>>>> main
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
<<<<<<< HEAD
  const selectedStyle: CSSProperties | undefined = isSelected
    ? {
        background: `linear-gradient(145deg, ${primaryColor}, #12241c)`,
        borderColor: primaryColor,
        boxShadow: `0 18px 40px ${primaryColor}2f`
      }
    : undefined;
=======
>>>>>>> main

  return (
    <button
      type="button"
      disabled={isUnavailable}
      onClick={() => onToggle(slot)}
<<<<<<< HEAD
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
=======
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
>>>>>>> main
    </button>
  );
}
