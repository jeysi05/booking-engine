"use client";

import type { CSSProperties } from "react";
import type { Resource } from "@/types";

interface CourtPickerProps {
  resources: Resource[];
  selectedResource: string;
  onSelectResource: (resourceId: string) => void;
  primaryColor: string;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

export function CourtPicker({ resources, selectedResource, onSelectResource, primaryColor }: CourtPickerProps) {
  return (
    <section className="px-4 pt-6 sm:px-0">
      <div className="mb-4">
        <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">Step 2</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Choose a space</h2>
      </div>
      <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
        {resources.map((resource, index) => {
          const selected = resource.id === selectedResource;
          const hasPremiumImage = resource.image && !isPlaceholderUrl(resource.image);
          const cardStyle: CSSProperties = {
            borderColor: selected ? primaryColor : "rgba(226,232,240,0.9)",
            boxShadow: selected ? `0 20px 44px ${primaryColor}26` : undefined,
            backgroundImage: hasPremiumImage
              ? `linear-gradient(180deg, rgba(5, 12, 9, 0.06), rgba(5, 12, 9, 0.76)), url(${resource.image})`
              : `radial-gradient(circle at 20% 10%, rgba(255,255,255,0.35), transparent 28%), linear-gradient(135deg, ${primaryColor}${index % 2 === 0 ? "dd" : "aa"}, #13231b)`
          };

          return (
            <button key={resource.id} type="button" onClick={() => onSelectResource(resource.id)} className="group min-w-[164px] text-left">
              <div
                className="relative h-36 overflow-hidden rounded-[1.75rem] border-2 bg-cover bg-center shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-xl"
                style={cardStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
                <div className="absolute left-3 top-3 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  Space
                </div>
                {selected ? (
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black" style={{ color: primaryColor }}>
                    ✓
                  </div>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-lg font-black tracking-tight drop-shadow-sm">{resource.label}</p>
                  <p className="mt-1 text-xs font-semibold text-white/75">Tap to select this option</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}