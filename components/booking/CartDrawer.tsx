"use client";

import { useMemo, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { buildReservationSummary, formatCurrency, getUnitLabel } from "@/lib/pricing";
import type { AddonSelection, DemoProfile, Resource, TimeSlot } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DemoProfile;
  selectedDate: Date;
  selectedEndDate: Date | null;
  selectedResource?: Resource;
  selectedSlots: TimeSlot[];
  onCheckoutComplete: () => void;
}

export function CartDrawer({ isOpen, onClose, profile, selectedDate, selectedEndDate, selectedResource, selectedSlots, onCheckoutComplete }: CartDrawerProps) {
  const [addonSelections, setAddonSelections] = useState<AddonSelection[]>([]);
  const sortedSlots = useMemo(() => [...selectedSlots].sort((a, b) => a.time.localeCompare(b.time)), [selectedSlots]);
  const summary = buildReservationSummary({ profile, resource: selectedResource, selectedDate, selectedEndDate, selectedSlots, addonSelections });

  function setAddonQuantity(addonId: string, quantity: number) {
    setAddonSelections((current) => {
      const filtered = current.filter((selection) => selection.addonId !== addonId);
      return quantity > 0 ? [...filtered, { addonId, quantity }] : filtered;
    });
  }

  async function createBooking() {
    if (!summary.isComplete) return;

    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId: profile.id, selectedDate, selectedEndDate, resourceId: selectedResource?.id, slots: selectedSlots, addons: addonSelections, total: summary.total })
    });

    onCheckoutComplete();
    setAddonSelections([]);
  }

  return (
    <Drawer isOpen={isOpen} title="Reservation Summary" onClose={onClose}>
      <div className="max-h-[72vh] overflow-y-auto pr-1">
        <div className="mb-4 rounded-[1.5rem] border border-[#E5E1DA] bg-white p-4 shadow-sm">
          <p className="text-sm text-[#A8A29E]">Reservation details</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F9F7F4] p-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Date</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">{summary.dateLabel}</p>
            </div>
            <div className="rounded-2xl bg-[#F9F7F4] p-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Space</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">{summary.resourceLabel}</p>
            </div>
          </div>
          <p className="mt-3 rounded-2xl bg-[#F9F7F4] px-3 py-2 text-sm text-[#78716C]">{summary.durationLabel}</p>
        </div>

        {profile.bookingMode === "hourly" ? (
          sortedSlots.length === 0 ? (
            <p className="rounded-[1.5rem] border border-dashed border-[#E5E1DA] bg-white p-5 text-center text-sm font-medium text-[#78716C]">Select one or more available times to start a reservation.</p>
          ) : (
            <div className="space-y-2.5">
              {sortedSlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between rounded-[1.35rem] border border-[#E5E1DA] bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="font-medium text-[#1C1917]">{slot.displayTime}</p>
                    <p className="text-xs text-[#78716C]">1 {getUnitLabel(profile.pricingUnit)}</p>
                  </div>
                  <p className="font-medium text-[#1C1917]">{formatCurrency(slot.price)}</p>
                </div>
              ))}
            </div>
          )
        ) : null}

        {summary.isComplete ? (
          <div className="mt-6">
            <h3 className="mb-3 text-sm text-[#A8A29E]">Add-ons</h3>
            <div className="space-y-3">
              {profile.addons.map((addon) => {
                const quantity = addonSelections.find((selection) => selection.addonId === addon.id)?.quantity ?? 0;
                return (
                  <div key={addon.id} className="flex items-center justify-between rounded-[1.35rem] border border-[#E5E1DA] bg-white p-3 shadow-sm">
                    <div>
                      <p className="font-medium text-[#1C1917]">{addon.label}</p>
                      <p className="text-xs text-[#78716C]">{formatCurrency(addon.pricePerUnit)} each · up to {addon.maxUnits}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[#F9F7F4] p-1">
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-medium text-[#78716C] shadow-sm" onClick={() => setAddonQuantity(addon.id, Math.max(0, quantity - 1))}>−</button>
                      <span className="w-5 text-center text-sm font-medium">{quantity}</span>
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full font-medium text-white shadow-sm" style={{ backgroundColor: profile.client.primaryColor }} onClick={() => setAddonQuantity(addon.id, Math.min(addon.maxUnits, quantity + 1))}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-[1.5rem] border border-[#E5E1DA] bg-white p-4 shadow-sm">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#78716C]"><span>Subtotal</span><span>{formatCurrency(summary.subtotal)}</span></div>
            <div className="flex justify-between text-[#78716C]"><span>Add-ons</span><span>{formatCurrency(summary.addonSubtotal)}</span></div>
            <div className="border-t border-[#E5E1DA] pt-3">
              <div className="flex justify-between text-xl font-medium text-[#1C1917]"><span>Total</span><span>{formatCurrency(summary.total)}</span></div>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!summary.isComplete}
          onClick={createBooking}
          className="mt-4 w-full rounded-xl py-4 text-sm font-medium text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#C5BFB8]"
          style={summary.isComplete ? { backgroundColor: profile.client.primaryColor } : undefined}
        >
          Confirm reservation
        </button>
      </div>
    </Drawer>
  );
}
