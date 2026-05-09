import type { PricingTier } from "@/types";
import { formatCurrency } from "@/lib/pricing";

const dotClasses: Record<PricingTier["color"], string> = {
  blue: "bg-stone-400",
  orange: "bg-stone-500",
  yellow: "bg-stone-300",
  gray: "bg-stone-300"
};

interface PricingLegendProps {
  tiers: PricingTier[];
}

export function PricingLegend({ tiers }: PricingLegendProps) {
  return (
    <div className="rounded-2xl border border-[#E5E1DA] bg-[#F9F7F4] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-[#1C1917]">Rate guide</h3>
        <span className="text-xs text-[#78716C]">Per hour</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex items-center gap-2 text-sm text-[#78716C]">
            <span className={`h-2 w-2 shrink-0 rounded-full ${dotClasses[tier.color]}`} />
            <span className="min-w-0 flex-1 truncate">{tier.label}</span>
            <span className="font-medium text-[#1C1917]">{formatCurrency(tier.ratePerHour)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
