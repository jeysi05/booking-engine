import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getDefaultProfile } from "@/lib/config";

const profile = getDefaultProfile();

export const metadata: Metadata = {
  title: `${profile.client.brandName} Booking`,
  description: profile.client.heroSubtitle
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
