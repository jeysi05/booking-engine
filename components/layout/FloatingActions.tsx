import type { DemoProfile } from "@/types";

interface FloatingActionsProps {
  profile: DemoProfile;
}

export function FloatingActions({ profile }: FloatingActionsProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 text-center text-sm text-[#78716C] sm:px-6">
      Need help?{" "}
      <a href={profile.client.contact.chatUrl} className="font-medium underline underline-offset-4" style={{ color: profile.client.primaryColor }}>
        Contact the venue
      </a>
    </div>
  );
}
