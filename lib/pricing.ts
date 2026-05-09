import type { AddonSelection, ClientConfig, PricingTier, TimeSlot } from "@/types";

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

export function calculateSlotSubtotal(slots: TimeSlot[], slotDurationMinutes = 30): number {
  return slots.reduce((total, slot) => total + slot.pricePerHour * (slotDurationMinutes / 60), 0);
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
  slotDurationMinutes = 30
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