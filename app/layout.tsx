import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getConfig } from "@/lib/config";

const config = getConfig();

export const metadata: Metadata = {
  title: `${config.client.brandName} Booking`,
  description: config.client.heroSubtitle
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
