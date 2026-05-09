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
<<<<<<< HEAD
    <main className="min-h-screen overflow-hidden bg-[#f5f2ea]">
      <Header config={config} />
      <div className="relative mx-auto grid max-w-5xl justify-center gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[20rem_minmax(0,31rem)] lg:py-8">
        <div className="absolute left-1/2 top-0 h-72 w-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: config.client.primaryColor }} />
        <aside className="relative hidden lg:block">
          <div className="sticky top-24 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">Booking lookup</p>
            <h1 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950">Self-service reservations for every venue.</h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              Guests can find upcoming bookings without calling staff, whether the business is a villa, studio, pool, room, or court.
            </p>
            <div className="mt-5 rounded-[1.5rem] p-4 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${config.client.primaryColor}, #13231b)` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">White-label ready</p>
              <p className="mt-2 text-lg font-black leading-tight">The same lookup flow adapts to any configured brand.</p>
            </div>
          </div>
        </aside>

        <section className="relative mx-auto w-full max-w-[31rem] lg:mx-0 lg:col-start-2">
          <div className="rounded-[2.25rem] border border-white/80 bg-[#fffdfa] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] sm:p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">My Bookings</p>
            <h1 className="mt-2 text-4xl font-black leading-none tracking-[-0.045em] text-slate-950">Find your reservation</h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Enter the phone number used at checkout to view upcoming reservations.</p>

            <form onSubmit={searchBookings} className="mt-6 space-y-3">
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                inputMode="tel"
                placeholder={config.client.contact.phone}
                className="w-full rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2"
                style={{ "--tw-ring-color": config.client.primaryColor } as CSSProperties}
              />
              <button
                type="submit"
                className="w-full rounded-[1.35rem] px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ backgroundColor: config.client.primaryColor, boxShadow: `0 18px 38px ${config.client.primaryColor}35` }}
              >
                {isLoading ? "Searching…" : "Search reservations"}
              </button>
            </form>

            {error ? <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          </div>

          <div className="mt-5 space-y-3 pb-10">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-[1.75rem] border border-white/80 bg-white/95 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{booking.status}</p>
                    <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">{booking.resourceLabel}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{booking.date}</p>
                  </div>
                  <p className="rounded-full bg-slate-50 px-3 py-1.5 text-sm font-black text-slate-950">{formatCurrency(booking.total)}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.slots.map((slot) => (
                    <span key={slot} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600">{slot}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
=======
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
>>>>>>> main
    </main>
  );
}
