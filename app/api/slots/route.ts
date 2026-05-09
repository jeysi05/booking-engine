import { NextRequest, NextResponse } from "next/server";
import { getConfig, getProfileById } from "@/lib/config";
import { generateSlots } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profile") ?? getConfig().defaultProfileId;
  const dateParam = searchParams.get("date");
  const resourceParam = searchParams.get("resource") ?? searchParams.get("court");
  const profile = getProfileById(profileId);
  const resource = profile.resources.find((item) => item.id === resourceParam) ?? profile.resources[0];

  if (!dateParam || !resource) {
    return NextResponse.json({ error: "A valid date and resource are required." }, { status: 400 });
  }

  const date = new Date(`${dateParam}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date must use YYYY-MM-DD format." }, { status: 400 });
  }

  return NextResponse.json({ slots: generateSlots(date, resource.id, profile.id) });
}
