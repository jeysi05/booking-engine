"use client";

import type { Resource } from "@/types";

interface CourtPickerProps {
  resources: Resource[];
  selectedResource: string;
  onSelectResource: (resourceId: string) => void;
  primaryColor: string;
}

export function CourtPicker({ resources, selectedResource, onSelectResource, primaryColor }: CourtPickerProps) {
  return (
    <section className="px-4 py-3">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Step 2 · Select Court</p>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {resources.map((resource) => {
          const selected = resource.id === selectedResource;
          return (
            <button key={resource.id} type="button" onClick={() => onSelectResource(resource.id)} className="min-w-[112px] text-center">
              <div
                className="h-24 rounded-3xl border-4 bg-cover bg-center shadow-sm transition"
                style={{
                  borderColor: selected ? primaryColor : "transparent",
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.2)), url(${resource.image})`
                }}
              />
              <span className="mt-2 block text-sm font-black text-slate-800">{resource.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
