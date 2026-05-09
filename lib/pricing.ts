import type { AddonSelection, DemoProfile, PricingTier, Resource, ReservationSummary, TimeSlot } from "@/types";

const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const shortDateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

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

  const fallbackTier = tiers.find((tier) => tier.rules.length === 0) ?? tiers[0];

  if (!matchingTier && !fallbackTier) {
    throw new Error("At least one pricing tier is required.");
  }

  return matchingTier ?? fallbackTier;
}

export function getUnitLabel(unit: DemoProfile["pricingUnit"], quantity = 1): string {
  if (unit === "hour") return quantity === 1 ? "hour" : "hours";
  if (unit === "night") return quantity === 1 ? "night" : "nights";
  if (unit === "day") return quantity === 1 ? "day" : "days";
  return quantity === 1 ? "session" : "sessions";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(amount);
}

export function getDateDifferenceInDays(startDate: Date, endDate: Date | null): number {
  if (!endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

export function formatDateRange(startDate: Date, endDate: Date | null, mode: DemoProfile["bookingMode"]): string {
  if (mode === "nightly") {
    return endDate ? `${shortDateFormatter.format(startDate)}–${shortDateFormatter.format(endDate)}` : `${shortDateFormatter.format(startDate)}–Select checkout`;
  }
  return shortDateFormatter.format(startDate);
}

export function calculateSlotSubtotal(slots: TimeSlot[]): number {
  return slots.reduce((total, slot) => total + slot.price, 0);
}

export function calculateStaySubtotal(profile: DemoProfile, resource: Resource | undefined, startDate: Date, endDate: Date | null): number {
  if (!resource) return 0;

  if (profile.bookingMode === "nightly") {
    const nights = getDateDifferenceInDays(startDate, endDate);
    return nights * resource.baseRate;
  }

  if (profile.bookingMode === "daily") {
    return resource.baseRate;
  }

  return 0;
}

export function calculateAddonSubtotal(addons: DemoProfile["addons"], selections: AddonSelection[]): number {
  return selections.reduce((total, selection) => {
    const addon = addons.find((item) => item.id === selection.addonId);
    return addon ? total + addon.pricePerUnit * selection.quantity : total;
  }, 0);
}

export function buildReservationSummary(params: {
  profile: DemoProfile;
  resource: Resource | undefined;
  selectedDate: Date;
  selectedEndDate: Date | null;
  selectedSlots: TimeSlot[];
  addonSelections: AddonSelection[];
}): ReservationSummary {
  const { profile, resource, selectedDate, selectedEndDate, selectedSlots, addonSelections } = params;
  const slotSubtotal = calculateSlotSubtotal(selectedSlots);
  const staySubtotal = calculateStaySubtotal(profile, resource, selectedDate, selectedEndDate);
  const addonSubtotal = calculateAddonSubtotal(profile.addons, addonSelections);
  const durationUnits = getDurationUnits(profile, selectedDate, selectedEndDate, selectedSlots);
  const subtotal = profile.bookingMode === "hourly" ? slotSubtotal : staySubtotal;

  return {
    resourceLabel: resource?.label ?? "Selected space",
    dateLabel: formatDateRange(selectedDate, selectedEndDate, profile.bookingMode),
    durationLabel: durationUnits > 0 ? `${durationUnits} ${getUnitLabel(profile.pricingUnit, durationUnits)}` : getEmptyStateLabel(profile),
    subtotal,
    addonSubtotal,
    total: subtotal + addonSubtotal,
    isComplete: isReservationComplete(profile, selectedEndDate, selectedSlots)
  };
}

export function getDurationUnits(profile: DemoProfile, selectedDate: Date, selectedEndDate: Date | null, selectedSlots: TimeSlot[]): number {
  if (profile.bookingMode === "hourly") return selectedSlots.length;
  if (profile.bookingMode === "daily") return 1;
  return getDateDifferenceInDays(selectedDate, selectedEndDate);
}

export function isReservationComplete(profile: DemoProfile, selectedEndDate: Date | null, selectedSlots: TimeSlot[]): boolean {
  if (profile.bookingMode === "hourly") return selectedSlots.length >= profile.minimumUnits;
  if (profile.bookingMode === "daily") return true;
  return getDateDifferenceInDays(new Date(), selectedEndDate) !== 0 || selectedEndDate !== null;
}

export function getEmptyStateLabel(profile: DemoProfile): string {
  if (profile.bookingMode === "hourly") return "Select a time to continue";
  if (profile.bookingMode === "nightly") return "Select checkout date";
  return "Select a visit date";
}
