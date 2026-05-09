"use client";

import type { DemoProfile } from "@/types";

interface NicheSwitcherProps {
  profiles: DemoProfile[];
  activeProfileId: string;
  onSelectProfile: (profile: DemoProfile) => void;
}

export function NicheSwitcher({ profiles, activeProfileId, onSelectProfile }: NicheSwitcherProps) {
  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0];
  const primaryColor = activeProfile?.client.primaryColor ?? "#1A3A2A";

  return (
    <section className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#E5E1DA] bg-white/95 p-2 shadow-[0_10px_30px_rgba(28,25,23,0.08)] backdrop-blur">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {profiles.map((profile) => {
            const selected = profile.id === activeProfileId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => onSelectProfile(profile)}
                className="rounded-2xl px-4 py-3 text-sm font-medium transition active:scale-[0.98]"
                style={selected ? { backgroundColor: primaryColor, color: "white" } : { color: "#78716C" }}
              >
                {profile.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
