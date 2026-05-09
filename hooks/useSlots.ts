"use client";

import { useEffect, useMemo, useState } from "react";
import type { DemoProfile, TimeSlot } from "@/types";

function toDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function useSlots(profile: DemoProfile, date: Date, resourceId: string) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(profile.bookingMode === "hourly");
  const [error, setError] = useState<string | null>(null);
  const dateParam = useMemo(() => toDateParam(date), [date]);

  useEffect(() => {
    if (profile.bookingMode !== "hourly") {
      setSlots([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function fetchSlots() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/slots?profile=${profile.id}&date=${dateParam}&resource=${resourceId}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to load available times for the selected space.");
        }

        const payload = (await response.json()) as { slots: TimeSlot[] };
        setSlots(payload.slots);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load available times.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchSlots();

    return () => controller.abort();
  }, [dateParam, profile.bookingMode, profile.id, resourceId]);

  return { slots, isLoading, error };
}
