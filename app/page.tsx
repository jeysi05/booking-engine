"use client";

import { CartDrawer } from "@/components/booking/CartDrawer";
import { CourtPicker } from "@/components/booking/CourtPicker";
import { DatePicker } from "@/components/booking/DatePicker";
import { SlotGrid } from "@/components/booking/SlotGrid";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { useBookingState } from "@/hooks/useBookingState";
import { useSlots } from "@/hooks/useSlots";
import { getConfig } from "@/lib/config";
import { calculateSlotSubtotal, formatCurrency } from "@/lib/pricing";

const config = getConfig();
const previewSkins = [
  { title: "Villa", description: "Private stays, pool access, early arrival, and guest passes." },
  { title: "Court", description: "Timed court reservations, equipment rentals, and peak-hour pricing." },
  { title: "Studio", description: "Room bookings, flexible schedules, add-ons, and self-service lookup." }
];

export default function BookingPage() {
  const booking = useBookingState(config.resources[0]?.id ?? "");
  const { slots, isLoading, error } = useSlots(booking.state.selectedDate, booking.state.selectedResource);
  const selectedResource = config.resources.find((resource) => resource.id === booking.state.selectedResource) ?? config.resources[0];
  const estimatedTotal = calculateSlotSubtotal(booking.state.selectedSlots, config.operatingHours.slotDurationMinutes);
  const hasSelectedSlots = booking.state.selectedSlots.length > 0;

  return (
    <main className="min-h-screen bg-[#F9F7F4] text-[#1C1917]">
      <Header config={config} />
      <HeroBanner config={config} />

      <div className="mx-auto max-w-4xl px-4 pb-40 pt-8 sm:px-6 sm:pt-10">
        <div className="space-y-6">
          <DatePicker selectedDate={booking.state.selectedDate} onSelectDate={booking.selectDate} primaryColor={config.client.primaryColor} />
          <CourtPicker resources={config.resources} selectedResource={booking.state.selectedResource} onSelectResource={booking.selectResource} primaryColor={config.client.primaryColor} />
          <SlotGrid slots={slots} tiers={config.pricingTiers} selectedSlots={booking.state.selectedSlots} isLoading={isLoading} error={error} onToggleSlot={booking.toggleSlot} primaryColor={config.client.primaryColor} />

          {hasSelectedSlots ? (
            <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <p className="text-sm text-[#A8A29E]">Step 4</p>
                <h2 className="text-xl font-medium text-[#1C1917]">Optional add-ons</h2>
                <p className="mt-1 text-sm text-[#78716C]">Enhance the reservation during checkout.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.addons.map((addon) => (
                  <div key={addon.id} className="rounded-2xl border border-[#E5E1DA] bg-[#F9F7F4] p-4">
                    <p className="font-medium text-[#1C1917]">{addon.label}</p>
                    <p className="mt-1 text-sm text-[#78716C]">{formatCurrency(addon.pricePerUnit)} each · up to {addon.maxUnits}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#A8A29E]">Step 5</p>
                <h2 className="text-xl font-medium text-[#1C1917]">Reservation summary</h2>
                <p className="mt-1 text-sm text-[#78716C]">
                  {hasSelectedSlots ? `${selectedResource?.label ?? "Selected space"} · ${booking.state.selectedSlots.length} selected` : "Select a time to continue."}
                </p>
              </div>
              <button
                type="button"
                onClick={booking.openCart}
                disabled={!hasSelectedSlots}
                className="rounded-xl border border-[#E5E1DA] px-5 py-3 text-sm font-medium text-[#1C1917] transition hover:border-[#C5BFB8] disabled:cursor-not-allowed disabled:text-[#A8A29E]"
              >
                Review checkout
              </button>
            </div>
          </section>
        </div>

        <div className="mt-6 text-center text-sm text-[#78716C]">
          Need help? <a href={config.client.contact.chatUrl} className="font-medium underline underline-offset-4" style={{ color: config.client.primaryColor }}>Contact the venue</a>
        </div>

        <section className="mt-16 border-t border-[#E5E1DA] pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl leading-tight text-[#1C1917] sm:text-4xl">Built for villas, staycations, courts, studios, and resorts</h2>
            <p className="mt-4 text-sm leading-6 text-[#78716C]">
              The same reservation flow can be branded for different spaces, pricing models, add-ons, and guest expectations by swapping the JSON config.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {previewSkins.map((skin) => (
              <article key={skin.title} className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm">
                <div className="mb-4 h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, #F2F0EC, ${config.client.primaryColor}33)` }} />
                <h3 className="text-lg font-medium text-[#1C1917]">{skin.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#78716C]">{skin.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={config.client.contact.chatUrl} className="inline-flex rounded-xl px-5 py-3 text-sm font-medium text-white transition active:scale-[0.98]" style={{ backgroundColor: config.client.primaryColor }}>
              Get your booking page
            </a>
          </div>
        </section>
      </div>

      <BottomNav
        slotCount={booking.state.selectedSlots.length}
        estimatedTotal={estimatedTotal}
        selectedDate={booking.state.selectedDate}
        selectedResourceLabel={selectedResource?.label ?? "Selected space"}
        primaryColor={config.client.primaryColor}
        onOpenCart={booking.openCart}
        onCheckout={booking.openCart}
      />
      <CartDrawer
        isOpen={booking.state.isCartOpen}
        onClose={booking.closeCart}
        selectedDate={booking.state.selectedDate}
        selectedResourceLabel={selectedResource?.label ?? "Selected space"}
        selectedSlots={booking.state.selectedSlots}
        config={config}
        onCheckoutComplete={booking.clearSlots}
      />
    </main>
  );
}
