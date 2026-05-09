import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/config";
import { generateSlots } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const courtParam = searchParams.get("court");
  const config = getConfig();
  const resource = config.resources.find((item) => item.id === courtParam) ?? config.resources[0];

  if (!dateParam || !resource) {
    return NextResponse.json({ error: "A valid date and court are required." }, { status: 400 });
  }

  const date = new Date(`${dateParam}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date must use YYYY-MM-DD format." }, { status: 400 });
  }

  return NextResponse.json({ slots: generateSlots(date, resource.id) });
}
