"use client";

import { CartDrawer } from "@/components/booking/CartDrawer";
import { CourtPicker } from "@/components/booking/CourtPicker";
import { DatePicker } from "@/components/booking/DatePicker";
import { NicheSwitcher } from "@/components/booking/NicheSwitcher";
import { PricingLegend } from "@/components/booking/PricingLegend";
import { SlotGrid } from "@/components/booking/SlotGrid";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { useBookingState } from "@/hooks/useBookingState";
import { useSlots } from "@/hooks/useSlots";
import { getConfig, getDefaultProfile, getProfileById } from "@/lib/config";
import { buildReservationSummary, getEmptyStateLabel } from "@/lib/pricing";

const config = getConfig();
const defaultProfile = getDefaultProfile(config);

export default function BookingPage() {
  const booking = useBookingState(defaultProfile);
  const activeProfile = getProfileById(booking.state.activeProfileId, config);
  const selectedResource = activeProfile.resources.find((resource) => resource.id === booking.state.selectedResource) ?? activeProfile.resources[0];
  const { slots, isLoading, error } = useSlots(activeProfile, booking.state.selectedDate, booking.state.selectedResource);
  const summary = buildReservationSummary({
    profile: activeProfile,
    resource: selectedResource,
    selectedDate: booking.state.selectedDate,
    selectedEndDate: booking.state.selectedEndDate,
    selectedSlots: booking.state.selectedSlots,
    addonSelections: []
  });

  return (
    <main className="min-h-screen bg-[#F9F7F4] text-[#1C1917]">
      <Header profile={activeProfile} />
      <HeroBanner profile={activeProfile} />
      <NicheSwitcher profiles={config.demoProfiles} activeProfileId={activeProfile.id} onSelectProfile={booking.selectProfile} />

      <div className="mx-auto max-w-4xl px-4 pb-40 pt-8 sm:px-6 sm:pt-10">
        <div className="space-y-6">
          <DatePicker
            profile={activeProfile}
            selectedDate={booking.state.selectedDate}
            selectedEndDate={booking.state.selectedEndDate}
            onSelectDate={(date) => booking.selectDate(date, activeProfile)}
            onSelectEndDate={booking.selectEndDate}
            primaryColor={activeProfile.client.primaryColor}
          />

          <CourtPicker
            profile={activeProfile}
            resources={activeProfile.resources}
            selectedResource={booking.state.selectedResource}
            onSelectResource={booking.selectResource}
            primaryColor={activeProfile.client.primaryColor}
          />

          {activeProfile.bookingMode === "hourly" ? (
            <SlotGrid
              profile={activeProfile}
              selectedResource={selectedResource}
              slots={slots}
              selectedSlots={booking.state.selectedSlots}
              isLoading={isLoading}
              error={error}
              onToggleSlot={booking.toggleSlot}
              primaryColor={activeProfile.client.primaryColor}
            />
          ) : (
            <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Rate</p>
                <h2 className="mt-1 text-xl font-medium text-[#1C1917]">Review your selected dates</h2>
              </div>
              <PricingLegend profile={activeProfile} tiers={activeProfile.pricingTiers} selectedResource={selectedResource} />
              <p className="mt-4 rounded-2xl bg-[#F9F7F4] px-4 py-3 text-sm text-[#78716C]">
                {summary.dateLabel} · {summary.durationLabel}
              </p>
            </section>
          )}

          {summary.isComplete ? (
            <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Optional</p>
                <h2 className="mt-1 text-xl font-medium text-[#1C1917]">Add-ons</h2>
                <p className="mt-1 text-sm text-[#78716C]">Enhance the reservation during checkout.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {activeProfile.addons.map((addon) => (
                  <div key={addon.id} className="rounded-2xl border border-[#E5E1DA] bg-[#F9F7F4] p-4">
                    <p className="font-medium text-[#1C1917]">{addon.label}</p>
                    <p className="mt-1 text-sm text-[#78716C]">Add during checkout</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <section className="mt-16 border-t border-[#E5E1DA] pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl leading-tight text-[#1C1917] sm:text-4xl">Built for villas, staycations, courts, studios, and resorts</h2>
            <p className="mt-4 text-sm leading-6 text-[#78716C]">
              Switch the profile above to see how the same booking engine adapts to nightly stays, hourly reservations, studio sessions, and resort day access.
            </p>
          </div>
        </section>
      </div>

      <FloatingActions profile={activeProfile} />
      <BottomNav
        isComplete={summary.isComplete}
        emptyLabel={getEmptyStateLabel(activeProfile)}
        selectedResourceLabel={summary.resourceLabel}
        dateLabel={summary.dateLabel}
        durationLabel={summary.durationLabel}
        total={summary.total}
        primaryColor={activeProfile.client.primaryColor}
        onOpenCart={booking.openCart}
        onCheckout={booking.openCart}
      />
      <CartDrawer
        isOpen={booking.state.isCartOpen}
        onClose={booking.closeCart}
        profile={activeProfile}
        selectedDate={booking.state.selectedDate}
        selectedEndDate={booking.state.selectedEndDate}
        selectedResource={selectedResource}
        selectedSlots={booking.state.selectedSlots}
        onCheckoutComplete={() => booking.clearSelection(activeProfile)}
      />
    </main>
  );
}
