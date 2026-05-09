import type { ClientConfig } from "@/types";

interface FloatingActionsProps {
  config: ClientConfig;
}

export function FloatingActions({ config }: FloatingActionsProps) {
  const actions = [
    { label: "Chat", href: config.client.contact.chatUrl, icon: "💬" },
    { label: "Call", href: `tel:${config.client.contact.phone}`, icon: "☎" },
    { label: "SMS", href: `sms:${config.client.contact.sms}`, icon: "✉" }
  ];

  return (
    <div className="fixed bottom-28 right-2 z-30 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className="group flex h-10 items-center justify-end gap-2 rounded-full border border-white/60 bg-white/90 px-2 text-sm font-black text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-xl sm:h-11 sm:px-3"
          aria-label={action.label}
        >
          <span className="hidden pl-2 text-xs sm:inline">{action.label}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ backgroundColor: config.client.primaryColor }}>
            {action.icon}
          </span>
        </a>
      ))}
    </div>
  );
}