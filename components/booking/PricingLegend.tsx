import type { PricingTier } from "@/types";
import { formatCurrency } from "@/lib/pricing";

const dotClasses: Record<PricingTier["color"], string> = {
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  gray: "bg-slate-400"
};

interface PricingLegendProps {
  tiers: PricingTier[];
}

export function PricingLegend({ tiers }: PricingLegendProps) {
  return (
    <div className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-black text-slate-900">Pricing Guide</h3>
      <div className="grid gap-2">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className={`h-3 w-3 rounded-full ${dotClasses[tier.color]}`} />
            <span>{tier.label}</span>
            <span className="ml-auto text-slate-900">{formatCurrency(tier.ratePerHour)}/hr</span>
          </div>
        ))}
      </div>
    </div>
  );
}
