import type { AddonSelection, ClientConfig, PricingTier, PricingUnit, TimeSlot } from "@/types";

const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

function timeToMinutes(time: string): number {
  const [hour = "0", minute = "0"] = time.split(":");
  return Number(hour) * 60 + Number(minute);
}

function isWithinRule(slotTime: string, ruleStart: string, ruleEnd: string): boolean {
  const slotMinutes = timeToMinutes(slotTime);
  return slotMinutes >= timeToMinutes(ruleStart) && slotMinutes < timeToMinutes(ruleEnd);
}

export function getPricingTierForSlot(date: Date, time: string, tiers: PricingTier[]): PricingTier {
  const day = dayFormatter.format(date);
  const matchingTier = tiers.find((tier) =>
    tier.rules.some((rule) => rule.days.includes(day) && isWithinRule(time, rule.start, rule.end))
  );

  if (matchingTier) {
    return matchingTier;
  }

  const fallbackTier = tiers.find((tier) => tier.rules.length === 0 && tier.id === "online") ?? tiers.find((tier) => tier.rules.length === 0);

  if (!fallbackTier) {
    throw new Error("At least one pricing tier with empty rules is required as a fallback.");
  }

  return fallbackTier;
}

export function getBaseRate(profile: ClientConfig): number {
  return profile.pricingTiers.find((tier) => tier.rules.length === 0)?.ratePerHour ?? profile.pricingTiers[0]?.ratePerHour ?? 0;
}

export function calculateSlotSubtotal(slots: TimeSlot[], slotDurationMinutes = 60): number {
  return slots.reduce((total, slot) => total + slot.pricePerHour * (slotDurationMinutes / 60), 0);
}

export function getDateDifferenceInDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000));
}

export function calculateDailySubtotal(rate: number, duration: number): number {
  return rate * Math.max(1, duration);
}

export function calculateAddonSubtotal(addons: ClientConfig["addons"], selections: AddonSelection[]): number {
  return selections.reduce((total, selection) => {
    const addon = addons.find((item) => item.id === selection.addonId);
    return addon ? total + addon.pricePerUnit * selection.quantity : total;
  }, 0);
}

export function calculateCartTotal(
  slots: TimeSlot[],
  addons: ClientConfig["addons"],
  selections: AddonSelection[],
  slotDurationMinutes = 60
): number {
  return calculateSlotSubtotal(slots, slotDurationMinutes) + calculateAddonSubtotal(addons, selections);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(amount);
}

export function getPricingUnitLabel(unit: PricingUnit, quantity = 1): string {
  const labels: Record<PricingUnit, [string, string]> = {
    hour: ["hour", "hours"],
    day: ["day", "days"],
    night: ["night", "nights"],
    session: ["session", "sessions"]
  };
  return quantity === 1 ? labels[unit][0] : labels[unit][1];
}

export function formatRate(amount: number, unit: PricingUnit): string {
  return `${formatCurrency(amount)}/${getPricingUnitLabel(unit)}`;
}
