"use client";

import { useState } from "react";
import { CartDrawer } from "@/components/booking/CartDrawer";
import { CourtPicker } from "@/components/booking/CourtPicker";
import { DatePicker } from "@/components/booking/DatePicker";
import { SlotGrid } from "@/components/booking/SlotGrid";
import { StayDateRange } from "@/components/booking/StayDateRange";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { useBookingState } from "@/hooks/useBookingState";
import { useSlots } from "@/hooks/useSlots";
import { getConfig } from "@/lib/config";
import { calculateDailySubtotal, calculateSlotSubtotal, formatCurrency, getBaseRate, getDateDifferenceInDays, getPricingUnitLabel } from "@/lib/pricing";
import type { ClientConfig } from "@/types";

const appConfig = getConfig();
const previewSkins = [
  { title: "Villa", description: "Nightly stays with early check-in, breakfast, and guest passes." },
  { title: "Court", description: "Hourly reservations with rentals, coaching, and peak pricing." },
  { title: "Studio", description: "Creative sessions with equipment, backdrops, and production add-ons." }
];

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

function getSummaryDuration(profile: ClientConfig, slotCount: number, dailyDuration: number) {
  if (profile.bookingMode === "hourly") {
    return `${slotCount} ${getPricingUnitLabel("hour", slotCount)}`;
  }
  return `${dailyDuration} ${getPricingUnitLabel(profile.pricingUnit, dailyDuration)}`;
}

function BookingExperience({ profile, onSelectProfile }: { profile: ClientConfig; onSelectProfile: (profileId: string) => void }) {
  const booking = useBookingState(profile.resources[0]?.id ?? "");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrow);
  const isHourly = profile.bookingMode === "hourly";
  const { slots, isLoading, error } = useSlots(booking.state.selectedDate, booking.state.selectedResource, profile.client.id, isHourly);
  const selectedResource = profile.resources.find((resource) => resource.id === booking.state.selectedResource) ?? profile.resources[0];
  const dailyDuration = profile.pricingUnit === "night" ? getDateDifferenceInDays(checkInDate, checkOutDate) : 1;
  const hourlyTotal = calculateSlotSubtotal(booking.state.selectedSlots, profile.operatingHours.slotDurationMinutes);
  const dailyTotal = calculateDailySubtotal(getBaseRate(profile), dailyDuration);
  const estimatedTotal = isHourly ? hourlyTotal : dailyTotal;
  const hasSelection = isHourly ? booking.state.selectedSlots.length > 0 : Boolean(selectedResource && checkInDate);
  const durationLabel = getSummaryDuration(profile, booking.state.selectedSlots.length, dailyDuration);

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pb-40 pt-8 sm:px-6 sm:pt-10">
        <div className="mb-6 overflow-x-auto rounded-full border border-[#E5E1DA] bg-white p-1 shadow-sm">
          <div className="grid min-w-[28rem] grid-cols-4 gap-1">
            {appConfig.demoProfiles.map((demoProfile) => {
              const isActive = demoProfile.client.id === profile.client.id;
              return (
                <button
                  key={demoProfile.client.id}
                  type="button"
                  onClick={() => onSelectProfile(demoProfile.client.id)}
                  className="rounded-full px-4 py-2 text-sm font-medium transition"
                  style={isActive ? { backgroundColor: profile.client.primaryColor, color: "white" } : { color: "#78716C" }}
                >
                  {demoProfile.ui.switcherLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {isHourly ? (
            <DatePicker selectedDate={booking.state.selectedDate} onSelectDate={booking.selectDate} primaryColor={profile.client.primaryColor} heading={profile.ui.dateHeading} helperText={profile.ui.minimumLabel} />
          ) : (
            <StayDateRange profile={profile} checkInDate={checkInDate} checkOutDate={checkOutDate} onSelectCheckIn={setCheckInDate} onSelectCheckOut={setCheckOutDate} />
          )}
          <CourtPicker resources={profile.resources} selectedResource={booking.state.selectedResource} onSelectResource={booking.selectResource} primaryColor={profile.client.primaryColor} heading={profile.ui.resourceHeading} />
          {isHourly ? (
            <SlotGrid
              slots={slots}
              tiers={profile.pricingTiers}
              pricingUnit={profile.pricingUnit}
              selectedSlots={booking.state.selectedSlots}
              isLoading={isLoading}
              error={error}
              onToggleSlot={booking.toggleSlot}
              primaryColor={profile.client.primaryColor}
              heading={profile.ui.timeHeading}
              helperText={profile.ui.minimumLabel}
            />
          ) : null}

          {hasSelection ? (
            <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <p className="text-sm text-[#A8A29E]">{isHourly ? "Step 4" : "Step 3"}</p>
                <h2 className="text-xl font-medium text-[#1C1917]">Optional add-ons</h2>
                <p className="mt-1 text-sm text-[#78716C]">Add extras that fit this {profile.niche} booking.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {profile.addons.map((addon) => (
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
                <p className="text-sm text-[#A8A29E]">{isHourly ? "Step 5" : "Step 4"}</p>
                <h2 className="text-xl font-medium text-[#1C1917]">Reservation summary</h2>
                <p className="mt-1 text-sm text-[#78716C]">
                  {hasSelection ? `${selectedResource?.label ?? "Selected space"} · ${durationLabel} · ${formatCurrency(estimatedTotal)}` : isHourly ? "Select a time to continue." : profile.pricingUnit === "night" ? "Select your stay dates." : "Select a visit date."}
                </p>
              </div>
              <button
                type="button"
                onClick={booking.openCart}
                disabled={!hasSelection}
                className="rounded-xl border border-[#E5E1DA] px-5 py-3 text-sm font-medium text-[#1C1917] transition hover:border-[#C5BFB8] disabled:cursor-not-allowed disabled:text-[#A8A29E]"
              >
                Review checkout
              </button>
            </div>
          </section>
        </div>

        <div className="mt-6 text-center text-sm text-[#78716C]">
          Need help? <a href={profile.client.contact.chatUrl} className="font-medium underline underline-offset-4" style={{ color: profile.client.primaryColor }}>Contact the venue</a>
        </div>

        <section className="mt-16 border-t border-[#E5E1DA] pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl leading-tight text-[#1C1917] sm:text-4xl">Built for villas, staycations, courts, studios, and resorts</h2>
            <p className="mt-4 text-sm leading-6 text-[#78716C]">
              Select a niche above to see the same white-label engine adapt its copy, resources, pricing model, add-ons, and checkout summary.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {previewSkins.map((skin) => (
              <article key={skin.title} className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm">
                <div className="mb-4 h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, #F2F0EC, ${profile.client.primaryColor}33)` }} />
                <h3 className="text-lg font-medium text-[#1C1917]">{skin.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#78716C]">{skin.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={profile.client.contact.chatUrl} className="inline-flex rounded-xl px-5 py-3 text-sm font-medium text-white transition active:scale-[0.98]" style={{ backgroundColor: profile.client.primaryColor }}>
              Get your booking page
            </a>
          </div>
        </section>
      </div>

      <BottomNav
        profile={profile}
        slotCount={booking.state.selectedSlots.length}
        estimatedTotal={estimatedTotal}
        selectedDate={booking.state.selectedDate}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        duration={isHourly ? booking.state.selectedSlots.length : dailyDuration}
        selectedResourceLabel={selectedResource?.label ?? "Selected space"}
        primaryColor={profile.client.primaryColor}
        onOpenCart={booking.openCart}
        onCheckout={booking.openCart}
      />
      <CartDrawer
        isOpen={booking.state.isCartOpen}
        onClose={booking.closeCart}
        selectedDate={booking.state.selectedDate}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        dailyDuration={dailyDuration}
        selectedResourceLabel={selectedResource?.label ?? "Selected space"}
        selectedSlots={booking.state.selectedSlots}
        dailySubtotal={dailyTotal}
        config={profile}
        onCheckoutComplete={booking.clearSlots}
      />
    </>
  );
}

export default function BookingPage() {
  const [activeProfileId, setActiveProfileId] = useState(appConfig.defaultProfileId);
  const activeProfile = appConfig.demoProfiles.find((profile) => profile.client.id === activeProfileId) ?? appConfig.demoProfiles[0];

  return (
    <main className="min-h-screen bg-[#F9F7F4] text-[#1C1917]">
      <Header config={activeProfile} />
      <HeroBanner config={activeProfile} />
      <BookingExperience key={activeProfile.client.id} profile={activeProfile} onSelectProfile={setActiveProfileId} />
    </main>
  );
}
