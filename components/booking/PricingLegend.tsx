import type { PricingTier } from "@/types";
import { formatCurrency } from "@/lib/pricing";

const dotClasses: Record<PricingTier["color"], string> = {
<<<<<<< HEAD
  blue: "bg-blue-500 ring-blue-100",
  orange: "bg-orange-500 ring-orange-100",
  yellow: "bg-yellow-400 ring-yellow-100",
  gray: "bg-slate-400 ring-slate-100"
=======
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  gray: "bg-slate-400"
>>>>>>> main
};

interface PricingLegendProps {
  tiers: PricingTier[];
}

export function PricingLegend({ tiers }: PricingLegendProps) {
  return (
<<<<<<< HEAD
    <div className="mb-5 rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black tracking-tight text-slate-950">Rate Guide</h3>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">Flexible rates by day and time</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Per hour</span>
      </div>
      <div className="grid gap-2.5">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2.5">
            <span className={`h-3 w-3 shrink-0 rounded-full ring-4 ${dotClasses[tier.color]}`} />
            <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-600">{tier.label}</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-slate-950 shadow-sm">{formatCurrency(tier.ratePerHour)}</span>
=======
    <div className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-black text-slate-900">Pricing Guide</h3>
      <div className="grid gap-2">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className={`h-3 w-3 rounded-full ${dotClasses[tier.color]}`} />
            <span>{tier.label}</span>
            <span className="ml-auto text-slate-900">{formatCurrency(tier.ratePerHour)}/hr</span>
>>>>>>> main
          </div>
        ))}
      </div>
    </div>
  );
}
