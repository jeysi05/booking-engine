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
<<<<<<< HEAD
import { calculateSlotSubtotal, formatCurrency } from "@/lib/pricing";

const config = getConfig();
const demoCategories = ["Villas", "Courts", "Pools", "Studios", "Event Spaces"];
const featureCards = ["Config-driven branding", "Flexible pricing rules", "Mobile checkout flow", "Add-ons and lookup"];
=======

const config = getConfig();
>>>>>>> main

export default function BookingPage() {
  const booking = useBookingState(config.resources[0]?.id ?? "");
  const { slots, isLoading, error } = useSlots(booking.state.selectedDate, booking.state.selectedResource);
<<<<<<< HEAD
  const selectedResource = config.resources.find((resource) => resource.id === booking.state.selectedResource) ?? config.resources[0];
  const estimatedTotal = calculateSlotSubtotal(booking.state.selectedSlots, config.operatingHours.slotDurationMinutes);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f2ea]">
      <Header config={config} />
      <div className="relative">
        <div className="absolute left-1/2 top-0 h-80 w-[38rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: config.client.primaryColor }} />
        <div className="relative mx-auto grid max-w-5xl justify-center gap-5 px-0 pb-10 pt-0 lg:grid-cols-[20rem_minmax(0,31rem)] lg:px-6 lg:py-7">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">White-label booking engine</p>
              <h2 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950">One template. Any bookable space.</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                A mobile-first reservation flow for villas, courts, studios, pools, and private venues.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {demoCategories.map((category) => (
                  <span key={category} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-black text-slate-600 shadow-sm">
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-2.5">
                {featureCards.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: config.client.primaryColor }} />
                    <span className="text-sm font-black text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-slate-100 bg-[#fffdfa] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Live demo state</p>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="flex justify-between gap-3"><span className="font-bold text-slate-500">Selected space</span><span className="font-black text-slate-950">{selectedResource?.label ?? "Choose a space"}</span></div>
                  <div className="flex justify-between gap-3"><span className="font-bold text-slate-500">Selected slots</span><span className="font-black text-slate-950">{booking.state.selectedSlots.length}</span></div>
                  <div className="flex justify-between gap-3"><span className="font-bold text-slate-500">Estimated total</span><span className="font-black text-slate-950">{formatCurrency(estimatedTotal)}</span></div>
                </div>
              </div>
            </div>
          </aside>

          <section className="mx-auto w-full max-w-[31rem] lg:mx-0 lg:col-start-2">
            <div className="bg-[#fffdfa] shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:overflow-hidden lg:rounded-[2.25rem] lg:border lg:border-white/80">
              <HeroBanner config={config} />
              <DatePicker selectedDate={booking.state.selectedDate} onSelectDate={booking.selectDate} primaryColor={config.client.primaryColor} />
              <CourtPicker resources={config.resources} selectedResource={booking.state.selectedResource} onSelectResource={booking.selectResource} primaryColor={config.client.primaryColor} />
              <SlotGrid slots={slots} tiers={config.pricingTiers} selectedSlots={booking.state.selectedSlots} isLoading={isLoading} error={error} onToggleSlot={booking.toggleSlot} primaryColor={config.client.primaryColor} />
            </div>
          </section>
        </div>
      </div>
      <FloatingActions config={config} />
      <BottomNav slotCount={booking.state.selectedSlots.length} estimatedTotal={estimatedTotal} primaryColor={config.client.primaryColor} onOpenCart={booking.openCart} onCheckout={booking.openCart} />
      <CartDrawer
        isOpen={booking.state.isCartOpen}
        onClose={booking.closeCart}
        selectedDate={booking.state.selectedDate}
        selectedResourceLabel={selectedResource?.label ?? "Selected space"}
        selectedSlots={booking.state.selectedSlots}
        config={config}
        onCheckoutComplete={booking.clearSlots}
      />
=======

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
>>>>>>> main
    </main>
  );
}
