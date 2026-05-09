"use client";

import type { CSSProperties } from "react";
import { formatCurrency, getUnitLabel } from "@/lib/pricing";
import type { DemoProfile, Resource } from "@/types";

interface CourtPickerProps {
  profile: DemoProfile;
  resources: Resource[];
  selectedResource: string;
  onSelectResource: (resourceId: string) => void;
  primaryColor: string;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

function getHeading(profile: DemoProfile): string {
  if (profile.niche === "court") return "Choose a court";
  if (profile.niche === "studio") return "Choose a studio";
  if (profile.niche === "resort") return "Choose a resort space";
  return "Choose your stay";
}

export function CourtPicker({ profile, resources, selectedResource, onSelectResource, primaryColor }: CourtPickerProps) {
  return (
    <section className="rounded-3xl border border-[#E5E1DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A8A29E]">Space</p>
        <h2 className="mt-1 text-xl font-medium text-[#1C1917]">{getHeading(profile)}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              className="group rounded-2xl border bg-white p-2 text-left shadow-sm transition hover:border-[#C5BFB8] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] active:scale-[0.99]"
              style={{ borderColor: selected ? primaryColor : "#E5E1DA", boxShadow: selected ? `0 0 0 2px ${primaryColor}22` : undefined }}
            >
              <div className="aspect-[4/3] rounded-xl bg-cover bg-center" style={previewStyle} />
              <div className="px-2 pb-2 pt-4">
                <p className="font-serif text-lg font-semibold text-[#1C1917]">{resource.label}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#A8A29E]">{resource.capacityLabel}</p>
                <p className="mt-2 text-sm leading-5 text-[#78716C]">{resource.description}</p>
                <p className="mt-3 text-sm font-medium text-[#1C1917]">
                  {formatCurrency(resource.baseRate)} / {getUnitLabel(profile.pricingUnit)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
