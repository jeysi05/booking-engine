"use client";

import { CartDrawer } from "@/components/booking/CartDrawer";
import { CourtPicker } from "@/components/booking/CourtPicker";
import { DatePicker } from "@/components/booking/DatePicker";
import { SlotGrid } from "@/components/booking/SlotGrid";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { useBookingState } from "@/hooks/useBookingState";
import { useSlots } from "@/hooks/useSlots";
import { getConfig } from "@/lib/config";

const config = getConfig();

export default function BookingPage() {
  const booking = useBookingState(config.resources[0]?.id ?? "");
  const { slots, isLoading, error } = useSlots(booking.state.selectedDate, booking.state.selectedResource);

  return (
    <main className="min-h-screen bg-[#f3f6f4]">
      <Header config={config} />
      <div className="mx-auto max-w-md">
        <HeroBanner config={config} />
        <DatePicker selectedDate={booking.state.selectedDate} onSelectDate={booking.selectDate} primaryColor={config.client.primaryColor} />
        <CourtPicker resources={config.resources} selectedResource={booking.state.selectedResource} onSelectResource={booking.selectResource} primaryColor={config.client.primaryColor} />
        <SlotGrid slots={slots} tiers={config.pricingTiers} selectedSlots={booking.state.selectedSlots} isLoading={isLoading} error={error} onToggleSlot={booking.toggleSlot} primaryColor={config.client.primaryColor} />
      </div>
      <FloatingActions config={config} />
      <BottomNav slotCount={booking.state.selectedSlots.length} primaryColor={config.client.primaryColor} onOpenCart={booking.openCart} onCheckout={booking.openCart} />
      <CartDrawer isOpen={booking.state.isCartOpen} onClose={booking.closeCart} selectedSlots={booking.state.selectedSlots} config={config} onCheckoutComplete={booking.clearSlots} />
    </main>
  );
}
