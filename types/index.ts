export interface PricingRule {
  days: string[];
  start: string;
  end: string;
}

export interface PricingTier {
  id: string;
  label: string;
  color: "blue" | "orange" | "yellow" | "gray";
  ratePerHour: number;
  rules: PricingRule[];
}

export interface Resource {
  id: string;
  label: string;
  image: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  displayTime: string;
  pricingTierId: string;
  pricePerHour: number;
  status: "available" | "pending" | "booked";
}

export interface BookingState {
  selectedDate: Date;
  selectedResource: string;
  selectedSlots: TimeSlot[];
  isCartOpen: boolean;
}

export interface ClientConfig {
  client: {
    id: string;
    brandName: string;
    logo: string;
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    primaryColor: string;
    contact: {
      chatUrl: string;
      phone: string;
      sms: string;
    };
  };
  operatingHours: {
    open: string;
    close: string;
    slotDurationMinutes: number;
  };
  resources: Resource[];
  pricingTiers: PricingTier[];
  addons: { id: string; label: string; pricePerUnit: number; maxUnits: number }[];
}

export interface AddonSelection {
  addonId: string;
  quantity: number;
}

export interface BookingLookupResult {
  id: string;
  date: string;
  resourceLabel: string;
  slots: string[];
  total: number;
  status: "confirmed" | "pending" | "cancelled";
}
