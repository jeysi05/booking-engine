"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { getDefaultProfile } from "@/lib/config";
import { formatCurrency } from "@/lib/pricing";
import type { BookingLookupResult } from "@/types";

const config = getDefaultProfile();

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
    <main className="min-h-screen bg-[#F9F7F4] text-[#1C1917]">
      <Header config={config} />
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-[#E5E1DA] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="font-serif text-4xl leading-tight text-[#1C1917]">Find your reservation</h1>
          <p className="mt-3 text-sm leading-6 text-[#78716C]">Enter the phone number used at checkout to view upcoming reservations.</p>

          <form onSubmit={searchBookings} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              inputMode="tel"
              placeholder={config.client.contact.phone}
              className="w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-sm text-[#1C1917] outline-none transition placeholder:text-[#A8A29E] focus:border-transparent focus:ring-2"
              style={{ "--tw-ring-color": config.client.primaryColor } as CSSProperties}
            />
            <button type="submit" className="rounded-xl px-5 py-3 text-sm font-medium text-white transition active:scale-[0.98]" style={{ backgroundColor: config.client.primaryColor }}>
              {isLoading ? "Searching…" : "Search"}
            </button>
          </form>

          {error ? <p className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p> : null}
        </div>

        <div className="mt-6 space-y-3">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-2xl border border-[#E5E1DA] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs capitalize text-[#A8A29E]">{booking.status}</p>
                  <h2 className="mt-1 text-lg font-medium text-[#1C1917]">{booking.resourceLabel}</h2>
                  <p className="mt-1 text-sm text-[#78716C]">{booking.date}</p>
                </div>
                <p className="rounded-full bg-[#F2F0EC] px-3 py-1.5 text-sm font-medium text-[#1C1917]">{formatCurrency(booking.total)}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {booking.slots.map((slot) => (
                  <span key={slot} className="rounded-full border border-[#E5E1DA] px-3 py-1.5 text-xs text-[#78716C]">{slot}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
