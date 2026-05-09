"use client";

import type { CSSProperties } from "react";
import type { Resource } from "@/types";

interface CourtPickerProps {
  resources: Resource[];
  selectedResource: string;
  onSelectResource: (resourceId: string) => void;
  primaryColor: string;
  heading?: string;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

export function CourtPicker({ resources, selectedResource, onSelectResource, primaryColor, heading = "Choose a space" }: CourtPickerProps) {
  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <p className="text-sm text-[#A8A29E]">Step 2</p>
        <h2 className="text-xl font-medium text-[#1C1917]">{heading}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {resources.map((resource, index) => {
          const selected = resource.id === selectedResource;
          const hasPremiumImage = resource.image && !isPlaceholderUrl(resource.image);
          const previewStyle: CSSProperties = {
            backgroundImage: hasPremiumImage
              ? `linear-gradient(180deg, rgba(28,25,23,0.04), rgba(28,25,23,0.42)), url(${resource.image})`
              : `radial-gradient(circle at 18% 18%, rgba(255,255,255,0.46), transparent 30%), linear-gradient(135deg, #d7ccbd, ${index % 2 === 0 ? primaryColor : "#8f7f6c"})`
          };

          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => onSelectResource(resource.id)}
              className="group rounded-2xl border bg-white p-2 text-left shadow-sm transition hover:border-[#C5BFB8] hover:shadow-md active:scale-[0.99]"
              style={{ borderColor: selected ? primaryColor : "#E5E1DA", boxShadow: selected ? `0 0 0 2px ${primaryColor}22` : undefined }}
            >
              <div className="aspect-[4/3] rounded-xl bg-cover bg-center" style={previewStyle} />
              <div className="px-1 pb-1 pt-3">
                <p className="text-sm font-medium text-[#1C1917]">{resource.label}</p>
                <p className="mt-1 text-xs text-[#78716C]">{resource.description ?? "Bookable space"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
