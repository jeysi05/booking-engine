import { getProfileById } from "@/lib/config";
import { getPricingTierForSlot } from "@/lib/pricing";
import type { DemoProfile, TimeSlot } from "@/types";

function timeToMinutes(time: string): number {
  const [hour = "0", minute = "0"] = time.split(":");
  return Number(hour) * 60 + Number(minute);
}

function minutesToTime(minutes: number): string {
  const normalizedMinutes = minutes % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60).toString().padStart(2, "0");
  const mins = (normalizedMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

export function formatDisplayTime(time: string): string {
  const [hourValue = "0", minute = "00"] = time.split(":");
  const hour = Number(hourValue);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

function getDeterministicStatus(date: Date, resourceId: string, time: string): TimeSlot["status"] {
  const seed = `${date.toISOString().slice(0, 10)}-${resourceId}-${time}`
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  if (seed % 19 === 0) return "booked";
  if (seed % 17 === 0) return "pending";
  return "available";
}

export function generateSlots(date: Date, resourceId: string, profileId: string): TimeSlot[] {
  const profile = getProfileById(profileId);

  if (profile.bookingMode !== "hourly" || !profile.operatingHours) {
    return [];
  }

  return generateHourlySlots(date, resourceId, profile);
}

function generateHourlySlots(date: Date, resourceId: string, profile: DemoProfile): TimeSlot[] {
  const operatingHours = profile.operatingHours;
  if (!operatingHours) return [];

  const resource = profile.resources.find((item) => item.id === resourceId);
  const startMinutes = timeToMinutes(operatingHours.open);
  const closeMinutes = timeToMinutes(operatingHours.close);
  const endMinutes = closeMinutes <= startMinutes ? closeMinutes + 24 * 60 : closeMinutes;
  const slots: TimeSlot[] = [];

  for (let cursor = startMinutes; cursor < endMinutes; cursor += operatingHours.slotDurationMinutes) {
    const time = minutesToTime(cursor);
    const tier = getPricingTierForSlot(date, time, profile.pricingTiers);
    const price = resource?.baseRate ?? tier.rate;

    slots.push({
      id: `${profile.id}-${resourceId}-${date.toISOString().slice(0, 10)}-${time}`,
      time,
      displayTime: formatDisplayTime(time),
      pricingTierId: tier.id,
      price,
      unit: profile.pricingUnit,
      status: getDeterministicStatus(date, resourceId, time)
    });
  }

  return slots;
}
