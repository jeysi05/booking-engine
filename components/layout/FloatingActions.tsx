import type { ClientConfig } from "@/types";

interface FloatingActionsProps {
  config: ClientConfig;
}

export function FloatingActions({ config }: FloatingActionsProps) {
  const actions = [
    { label: "Chat", href: config.client.contact.chatUrl, icon: "💬" },
    { label: "Call", href: `tel:${config.client.contact.phone}`, icon: "📞" },
    { label: "SMS", href: `sms:${config.client.contact.sms}`, icon: "✉️" }
  ];

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-2">
      {actions.map((action) => (
        <a key={action.label} href={action.href} className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-white shadow-lg" style={{ backgroundColor: config.client.primaryColor }} aria-label={action.label}>
          {action.icon}
        </a>
      ))}
    </div>
  );
}
