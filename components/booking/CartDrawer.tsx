"use client";

import { useMemo, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { calculateAddonSubtotal, calculateCartTotal, calculateSlotSubtotal, formatCurrency } from "@/lib/pricing";
import type { AddonSelection, ClientConfig, TimeSlot } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlots: TimeSlot[];
  config: ClientConfig;
  onCheckoutComplete: () => void;
}

export function CartDrawer({ isOpen, onClose, selectedSlots, config, onCheckoutComplete }: CartDrawerProps) {
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
    <Drawer isOpen={isOpen} title="Your Cart" onClose={onClose}>
      <div className="max-h-[72vh] overflow-y-auto pr-1">
        {sortedSlots.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">Select one or more available slots to start a reservation.</p>
        ) : (
          <div className="space-y-2">
            {sortedSlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-black text-slate-900">{slot.displayTime}</p>
                  <p className="text-xs font-semibold text-slate-500">{config.operatingHours.slotDurationMinutes}-minute slot</p>
                </div>
                <p className="font-black text-slate-900">{formatCurrency(slot.pricePerHour * (config.operatingHours.slotDurationMinutes / 60))}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500">Add-ons</h3>
          <div className="space-y-3">
            {config.addons.map((addon) => {
              const quantity = addonSelections.find((selection) => selection.addonId === addon.id)?.quantity ?? 0;
              return (
                <div key={addon.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3">
                  <div>
                    <p className="font-bold text-slate-900">{addon.label}</p>
                    <p className="text-xs font-semibold text-slate-500">{formatCurrency(addon.pricePerUnit)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="h-8 w-8 rounded-full bg-slate-100 font-black" onClick={() => setAddonQuantity(addon.id, Math.max(0, quantity - 1))}>
                      −
                    </button>
                    <span className="w-5 text-center font-black">{quantity}</span>
                    <button type="button" className="h-8 w-8 rounded-full bg-slate-900 font-black text-white" onClick={() => setAddonQuantity(addon.id, Math.min(addon.maxUnits, quantity + 1))}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm font-bold">
          <div className="flex justify-between text-slate-500"><span>Slots</span><span>{formatCurrency(slotSubtotal)}</span></div>
          <div className="flex justify-between text-slate-500"><span>Add-ons</span><span>{formatCurrency(addonSubtotal)}</span></div>
          <div className="flex justify-between text-lg font-black text-slate-950"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>

        <button
          type="button"
          disabled={!canCheckout}
          onClick={createBooking}
          className="mt-5 w-full rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          style={canCheckout ? { backgroundColor: config.client.primaryColor } : undefined}
        >
          Checkout
        </button>
      </div>
    </Drawer>
  );
}
