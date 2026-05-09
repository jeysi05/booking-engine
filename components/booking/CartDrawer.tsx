"use client";

import { useMemo, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { calculateAddonSubtotal, calculateCartTotal, calculateSlotSubtotal, formatCurrency } from "@/lib/pricing";
import type { AddonSelection, ClientConfig, TimeSlot } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedResourceLabel: string;
  selectedSlots: TimeSlot[];
  config: ClientConfig;
  onCheckoutComplete: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric"
});

export function CartDrawer({ isOpen, onClose, selectedDate, selectedResourceLabel, selectedSlots, config, onCheckoutComplete }: CartDrawerProps) {
  const [addonSelections, setAddonSelections] = useState<AddonSelection[]>([]);
  const slotSubtotal = calculateSlotSubtotal(selectedSlots, config.operatingHours.slotDurationMinutes);
  const addonSubtotal = calculateAddonSubtotal(config.addons, addonSelections);
  const total = calculateCartTotal(selectedSlots, config.addons, addonSelections, config.operatingHours.slotDurationMinutes);
  const canCheckout = selectedSlots.length > 0;
  const sortedSlots = useMemo(() => [...selectedSlots].sort((a, b) => a.time.localeCompare(b.time)), [selectedSlots]);

  function setAddonQuantity(addonId: string, quantity: number) {
    setAddonSelections((current) => {
      const filtered = current.filter((selection) => selection.addonId !== addonId);
      return quantity > 0 ? [...filtered, { addonId, quantity }] : filtered;
    });
  }

  async function createBooking() {
    if (!canCheckout) return;

    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slots: selectedSlots, addons: addonSelections, total })
    });

    onCheckoutComplete();
    setAddonSelections([]);
  }

  return (
    <Drawer isOpen={isOpen} title="Reservation Summary" onClose={onClose}>
      <div className="max-h-[72vh] overflow-y-auto pr-1">
        <div className="mb-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-[#A8A29E]">Reservation details</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Date</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">{dateFormatter.format(selectedDate)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Space</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">{selectedResourceLabel}</p>
            </div>
          </div>
        </div>

        {sortedSlots.length === 0 ? (
          <p className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-5 text-center text-sm font-semibold text-[#78716C]">
            Select one or more available slots to start a reservation.
          </p>
        ) : (
          <div className="space-y-2.5">
            {sortedSlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between rounded-[1.35rem] border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="font-medium text-[#1C1917]">{slot.displayTime}</p>
                  <p className="text-xs text-[#78716C]">{config.operatingHours.slotDurationMinutes}-minute reservation</p>
                </div>
                <p className="font-medium text-[#1C1917]">{formatCurrency(slot.pricePerHour * (config.operatingHours.slotDurationMinutes / 60))}</p>
              </div>
            ))}
          </div>
        )}

        {canCheckout ? (
          <div className="mt-6">
            <h3 className="mb-3 text-sm text-[#A8A29E]">Add-ons</h3>
          <div className="space-y-3">
            {config.addons.map((addon) => {
              const quantity = addonSelections.find((selection) => selection.addonId === addon.id)?.quantity ?? 0;
              return (
                <div key={addon.id} className="flex items-center justify-between rounded-[1.35rem] border border-slate-100 bg-white p-3 shadow-sm">
                  <div>
                    <p className="font-medium text-[#1C1917]">{addon.label}</p>
                    <p className="text-xs text-[#78716C]">{formatCurrency(addon.pricePerUnit)} each · up to {addon.maxUnits}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-50 p-1">
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-black text-slate-700 shadow-sm" onClick={() => setAddonQuantity(addon.id, Math.max(0, quantity - 1))}>
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-black">{quantity}</span>
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full font-black text-white shadow-sm" style={{ backgroundColor: config.client.primaryColor }} onClick={() => setAddonQuantity(addon.id, Math.min(addon.maxUnits, quantity + 1))}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        ) : null}

        <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#78716C]"><span>Subtotal</span><span>{formatCurrency(slotSubtotal)}</span></div>
            <div className="flex justify-between text-[#78716C]"><span>Add-ons</span><span>{formatCurrency(addonSubtotal)}</span></div>
            <div className="border-t border-slate-100 pt-3">
              <div className="flex justify-between text-xl font-medium text-[#1C1917]"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!canCheckout}
          onClick={createBooking}
          className="mt-4 w-full rounded-[1.35rem] py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#C5BFB8] disabled:shadow-none"
          style={canCheckout ? { backgroundColor: config.client.primaryColor, boxShadow: `0 18px 38px ${config.client.primaryColor}35` } : undefined}
        >
          Confirm reservation
        </button>
      </div>
    </Drawer>
  );
}
