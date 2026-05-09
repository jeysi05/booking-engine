import { NextRequest, NextResponse } from "next/server";
import type { AddonSelection, TimeSlot } from "@/types";

interface CreateBookingPayload {
  profileId?: string;
  resourceId?: string;
  selectedDate?: string;
  selectedEndDate?: string | null;
  slots?: TimeSlot[];
  addons?: AddonSelection[];
  total?: number;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as CreateBookingPayload;

  if (!payload.resourceId) {
    return NextResponse.json({ error: "A resource is required to create a booking." }, { status: 400 });
  }

  return NextResponse.json(
    {
      booking: {
        id: `booking-${Date.now()}`,
        status: "pending",
        profileId: payload.profileId,
        resourceId: payload.resourceId,
        selectedDate: payload.selectedDate,
        selectedEndDate: payload.selectedEndDate ?? null,
        slots: payload.slots ?? [],
        addons: payload.addons ?? [],
        total: payload.total ?? 0
      }
    },
    { status: 201 }
  );
}
