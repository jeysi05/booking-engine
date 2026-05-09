import { NextRequest, NextResponse } from "next/server";
import type { AddonSelection, TimeSlot } from "@/types";

interface CreateBookingPayload {
  slots?: TimeSlot[];
  addons?: AddonSelection[];
  total?: number;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as CreateBookingPayload;

  if (!payload.slots?.length) {
    return NextResponse.json({ error: "At least one slot is required to create a booking." }, { status: 400 });
  }

  return NextResponse.json(
    {
      booking: {
        id: `booking-${Date.now()}`,
        status: "pending",
        slots: payload.slots,
        addons: payload.addons ?? [],
        total: payload.total ?? 0
      }
    },
    { status: 201 }
  );
}