import Link from "next/link";
import type { CSSProperties } from "react";
import type { ClientConfig } from "@/types";

interface HeaderProps {
  config: ClientConfig;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

export function Header({ config }: HeaderProps) {
  const logoStyle: CSSProperties = isPlaceholderUrl(config.client.logo)
    ? { background: `linear-gradient(135deg, ${config.client.primaryColor}, #14251d)` }
    : { backgroundImage: `url(${config.client.logo})` };

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[#fbfaf5]/90 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <div
            className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center text-sm font-black text-white shadow-lg shadow-slate-900/10 ring-1 ring-white/70"
            style={logoStyle}
          >
            {isPlaceholderUrl(config.client.logo) ? config.client.brandName.slice(0, 2).toUpperCase() : null}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-black leading-tight tracking-tight text-slate-950 sm:text-base">{config.client.brandName}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Demo booking experience</p>
          </div>
        </Link>
        <Link
          href="/bookings"
          className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          My Bookings
        </Link>
      </div>
    </header>
  );
}