"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { getConfig } from "@/lib/config";
import { formatCurrency } from "@/lib/pricing";
import type { BookingLookupResult } from "@/types";

const config = getConfig();

export default function MyBookingsPage() {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<BookingLookupResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchBookings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/${encodeURIComponent(phone)}`);
      if (!response.ok) {
        throw new Error("Unable to retrieve bookings for that phone number.");
      }
      const payload = (await response.json()) as { bookings: BookingLookupResult[] };
      setBookings(payload.bookings);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "Unable to retrieve bookings.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f6f4]">
      <Header config={config} />
      <section className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-[2rem] bg-white p-5 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">My Bookings</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Find your reservations</h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">Enter the phone number used at checkout to view upcoming court bookings.</p>

          <form onSubmit={searchBookings} className="mt-5 flex gap-2">
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              inputMode="tel"
              placeholder="+639XXXXXXXXX"
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-transparent focus:ring-2"
              style={{ "--tw-ring-color": config.client.primaryColor } as CSSProperties}
            />
            <button type="submit" className="rounded-2xl px-4 py-3 text-sm font-black text-white" style={{ backgroundColor: config.client.primaryColor }}>
              {isLoading ? "Searching" : "Search"}
            </button>
          </form>

          {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
        </div>

        <div className="mt-5 space-y-3">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{booking.status}</p>
                  <h2 className="mt-1 text-lg font-black text-slate-950">{booking.resourceLabel}</h2>
                  <p className="text-sm font-semibold text-slate-500">{booking.date}</p>
                </div>
                <p className="font-black text-slate-950">{formatCurrency(booking.total)}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {booking.slots.map((slot) => (
                  <span key={slot} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{slot}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
