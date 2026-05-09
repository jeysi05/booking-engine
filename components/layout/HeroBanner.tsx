import type { CSSProperties } from "react";
import type { DemoProfile } from "@/types";

interface HeroBannerProps {
  profile: DemoProfile;
}

function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

export function HeroBanner({ profile }: HeroBannerProps) {
  const hasVenueImage = profile.client.heroImage && !isPlaceholderUrl(profile.client.heroImage);
  const heroStyle: CSSProperties = {
    backgroundImage: hasVenueImage
      ? `linear-gradient(180deg, rgba(28,25,23,0.18), rgba(28,25,23,0.58)), url(${profile.client.heroImage})`
      : `linear-gradient(180deg, rgba(28,25,23,0.16), rgba(28,25,23,0.46)), radial-gradient(circle at 18% 20%, rgba(255,255,255,0.34), transparent 28%), radial-gradient(circle at 84% 16%, ${profile.client.primaryColor}55, transparent 30%), linear-gradient(135deg, #d8cfc1 0%, #9f8f78 45%, ${profile.client.primaryColor} 100%)`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <section className="relative h-[220px] overflow-hidden bg-[#F2F0EC] md:h-[320px]" style={heroStyle}>
      <div className="mx-auto flex h-full max-w-5xl items-end px-4 pb-8 sm:px-6 md:pb-10">
        <div className="max-w-2xl text-white">
          <h1 className="font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">{profile.client.heroTitle}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 md:text-base">{profile.client.heroSubtitle}</p>
        </div>
      </div>
    </section>
  );
}
