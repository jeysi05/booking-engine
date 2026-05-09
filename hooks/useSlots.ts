"use client";

import { useEffect, useMemo, useState } from "react";
import type { TimeSlot } from "@/types";

function toDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function useSlots(date: Date, resourceId: string, profileId: string, enabled = true) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const dateParam = useMemo(() => toDateParam(date), [date]);

  useEffect(() => {
    if (!enabled) {
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
        const response = await fetch(`/api/slots?date=${dateParam}&resource=${resourceId}&profile=${profileId}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to load availability for the selected space.");
        }

        const payload = (await response.json()) as { slots: TimeSlot[] };
        setSlots(payload.slots);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load availability.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchSlots();

    return () => controller.abort();
  }, [dateParam, enabled, profileId, resourceId]);

  return { slots, isLoading, error };
}
