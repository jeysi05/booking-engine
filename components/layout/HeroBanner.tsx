import type { ClientConfig } from "@/types";

interface HeroBannerProps {
  config: ClientConfig;
}

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
        </div>
      </div>
    </section>
  );
}
