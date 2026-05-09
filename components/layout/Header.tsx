import Link from "next/link";
import type { ClientConfig } from "@/types";

interface HeaderProps {
  config: ClientConfig;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: config.client.primaryColor }}>
            {config.client.brandName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-black leading-tight text-slate-950">{config.client.brandName}</p>
            <p className="text-xs font-semibold text-slate-500">Book a court</p>
          </div>
        </Link>
        <Link href="/bookings" className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">
          My Bookings
        </Link>
      </div>
    </header>
  );
}
