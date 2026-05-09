"use client";

import type { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ isOpen, title, onClose, children }: DrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close cart" onClick={onClose} />
      <section className="relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-soft">
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-200" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
            Close
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
