import { NextResponse } from "next/server";
import { getDefaultProfile } from "@/lib/config";
import type { BookingLookupResult } from "@/types";

interface RouteContext {
  params: {
    phone: string;
  };
}

export async function GET(_request: Request, context: RouteContext) {
  const profile = getDefaultProfile();
  const normalizedPhone = decodeURIComponent(context.params.phone).trim();

  if (!normalizedPhone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  const bookings: BookingLookupResult[] = [
    {
      id: "mock-booking-1001",
      date: "May 12–14, 2026",
      resourceLabel: profile.resources[0]?.label ?? "Space",
      durationLabel: "2 nights",
      total: 17000,
      status: "confirmed"
    },
    {
      id: "mock-booking-1002",
      date: "May 16, 2026",
      resourceLabel: profile.resources[1]?.label ?? "Space",
      durationLabel: "1 day",
      total: 4200,
      status: "pending"
    }
  ];

  return NextResponse.json({ phone: normalizedPhone, bookings });
}
