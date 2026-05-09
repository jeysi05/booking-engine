<<<<<<< HEAD
import type { CSSProperties } from "react";
=======
>>>>>>> main
import type { ClientConfig } from "@/types";

interface HeroBannerProps {
  config: ClientConfig;
}

<<<<<<< HEAD
function isPlaceholderUrl(url: string): boolean {
  return url.includes("placehold.co");
}

function formatOperatingHours(open: string, close: string): string {
  return `${open}–${close}`;
}

export function HeroBanner({ config }: HeroBannerProps) {
  const hasVenueImage = config.client.heroImage && !isPlaceholderUrl(config.client.heroImage);
  const heroStyle: CSSProperties = {
    backgroundImage: hasVenueImage
      ? `linear-gradient(180deg, rgba(7, 18, 13, 0.10), rgba(7, 18, 13, 0.78)), url(${config.client.heroImage})`
      : `radial-gradient(circle at 18% 10%, rgba(255,255,255,0.26), transparent 28%), radial-gradient(circle at 82% 0%, ${config.client.primaryColor}55, transparent 28%), linear-gradient(135deg, ${config.client.primaryColor}, #223229 56%, #111b16)`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <section className="px-4 pt-4 sm:px-0">
      <div className="relative min-h-[250px] overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_22px_58px_rgba(15,23,42,0.18)]" style={heroStyle}>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/20" />
        <div className="absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex min-h-[250px] flex-col justify-end p-5 text-white sm:p-6">
          <p className="mb-3 inline-flex w-fit rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/90 shadow-sm backdrop-blur-md">
            Demo venue preview
          </p>
          <h1 className="max-w-[14ch] text-4xl font-black leading-[0.95] tracking-[-0.045em] drop-shadow-sm sm:text-5xl">{config.client.heroTitle}</h1>
          <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-white/80">{config.client.heroSubtitle}</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <span className="rounded-2xl border border-white/20 bg-white/20 px-2.5 py-2 text-center text-[10px] font-black uppercase tracking-wide backdrop-blur-md">Flexible Spaces</span>
            <span className="rounded-2xl border border-white/20 bg-white/20 px-2.5 py-2 text-center text-[10px] font-black uppercase tracking-wide backdrop-blur-md">{config.operatingHours.slotDurationMinutes}-min slots</span>
            <span className="rounded-2xl border border-white/20 bg-white/20 px-2.5 py-2 text-center text-[10px] font-black uppercase tracking-wide backdrop-blur-md">{formatOperatingHours(config.operatingHours.open, config.operatingHours.close)}</span>
          </div>
=======
export function HeroBanner({ config }: HeroBannerProps) {
  return (
    <section className="px-4 pt-4">
      <div
        className="relative min-h-[230px] overflow-hidden rounded-[2rem] bg-cover bg-center shadow-soft"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(9, 20, 15, 0.12), rgba(9, 20, 15, 0.76)), url(${config.client.heroImage})` }}
      >
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
            {config.client.brandName}
          </p>
          <h1 className="text-4xl font-black leading-[0.95] tracking-tight">{config.client.heroTitle}</h1>
          <p className="mt-3 text-sm font-semibold text-white/85">{config.client.heroSubtitle}</p>
>>>>>>> main
        </div>
      </div>
    </section>
  );
}
