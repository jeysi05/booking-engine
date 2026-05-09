export type BookingMode = "hourly" | "daily" | "nightly";
export type PricingUnit = "hour" | "day" | "night" | "session";
export type SlotStatus = "available" | "pending" | "booked";
export type PricingTierColor = "blue" | "orange" | "yellow" | "gray" | "green" | "stone";

export interface PricingRule {
  days: string[];
  start: string;
  end: string;
}

export interface PricingTier {
  id: string;
  label: string;
  color: PricingTierColor;
  rate: number;
  unit: PricingUnit;
  rules: PricingRule[];
}

export interface Resource {
  id: string;
  label: string;
  image: string;
  description: string;
  capacityLabel: string;
  baseRate: number;
}

export interface Addon {
  id: string;
  label: string;
  pricePerUnit: number;
  maxUnits: number;
}

export interface ContactInfo {
  chatUrl: string;
  phone: string;
  sms: string;
}

export interface DemoClientBrand {
  id: string;
  brandName: string;
  logo: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  contact: ContactInfo;
}

export interface OperatingHours {
  open: string;
  close: string;
  slotDurationMinutes: number;
}

export interface DemoProfile {
  id: string;
  label: string;
  niche: "villa" | "court" | "studio" | "resort";
  bookingMode: BookingMode;
  pricingUnit: PricingUnit;
  minimumUnits: number;
  client: DemoClientBrand;
  operatingHours?: OperatingHours;
  resources: Resource[];
  pricingTiers: PricingTier[];
  addons: Addon[];
}

export interface TimeSlot {
  id: string;
  time: string;
  displayTime: string;
  pricingTierId: string;
  price: number;
  unit: PricingUnit;
  status: SlotStatus;
}

export interface BookingState {
  activeProfileId: string;
  selectedDate: Date;
  selectedEndDate: Date | null;
  selectedResource: string;
  selectedSlots: TimeSlot[];
  isCartOpen: boolean;
}

export interface ClientConfig {
  defaultProfileId: string;
  demoProfiles: DemoProfile[];
}

export interface AddonSelection {
  addonId: string;
  quantity: number;
}

export interface BookingLookupResult {
  id: string;
  date: string;
  resourceLabel: string;
  durationLabel: string;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
}

export interface ReservationSummary {
  resourceLabel: string;
  dateLabel: string;
  durationLabel: string;
  subtotal: number;
  addonSubtotal: number;
  total: number;
  isComplete: boolean;
}
