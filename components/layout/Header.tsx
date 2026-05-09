import Link from "next/link";
import type { CSSProperties } from "react";
import type { DemoProfile } from "@/types";

interface HeaderProps {
  profile: DemoProfile;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

export function Header({ profile }: HeaderProps) {
  const logoStyle: CSSProperties = isPlaceholderUrl(profile.client.logo)
    ? { background: `linear-gradient(135deg, ${profile.client.primaryColor}, #0f241a)` }
    : { backgroundImage: `url(${profile.client.logo})` };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-[#E5E1DA] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cover bg-center text-sm font-semibold text-white" style={logoStyle}>
            {isPlaceholderUrl(profile.client.logo) ? profile.client.brandName.slice(0, 2).toUpperCase() : null}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1C1917] sm:text-base">{profile.client.brandName}</p>
            <p className="text-xs text-[#78716C]">Demo booking experience</p>
          </div>
        </Link>
        <Link href="/bookings" className="rounded-full border border-[#E5E1DA] px-4 py-2 text-sm font-medium text-[#1C1917] transition hover:border-[#C5BFB8] hover:bg-[#F9F7F4]">
          My Bookings
        </Link>
      </div>
    </header>
  );
}
