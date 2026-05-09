"use client";

import type { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ isOpen, title, onClose, children }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/50 px-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close reservation summary" onClick={onClose} />
      <section className="relative w-full max-w-md overflow-hidden rounded-t-[2rem] border border-white/70 bg-[#fffdfa] p-5 shadow-[0_-28px_90px_rgba(15,23,42,0.26)] sm:mb-4 sm:rounded-[2rem]">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-stone-200" />
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Secure checkout</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#E5E1DA] bg-white px-4 py-2 text-xs font-medium text-[#78716C] transition hover:bg-[#F9F7F4]">
            Close
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
