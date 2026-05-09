import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config";
import type { BookingLookupResult } from "@/types";

interface RouteContext {
  params: {
    phone: string;
  };
}

export async function GET(_request: Request, context: RouteContext) {
  const config = getConfig();
  const normalizedPhone = decodeURIComponent(context.params.phone).trim();

  if (!normalizedPhone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  const bookings: BookingLookupResult[] = [
    {
      id: "mock-booking-1001",
      date: "May 12, 2026",
      resourceLabel: config.resources[0]?.label ?? "Space",
      slots: ["10:00 AM", "10:30 AM"],
      total: 200,
      status: "confirmed"
    },
    {
      id: "mock-booking-1002",
      date: "May 16, 2026",
      resourceLabel: config.resources[2]?.label ?? "Space",
      slots: ["6:00 PM"],
      total: 125,
      status: "pending"
    }
  ];

  return NextResponse.json({ phone: normalizedPhone, bookings });
}
