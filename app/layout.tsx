import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/*
  FONT SYSTEM
  ─────────────────────────────────────────────────────
  Slot          | Target (Fontshare)   | Live fallback (Google)
  ─────────────────────────────────────────────────────
  --pp-font     | Cabinet Grotesk      | DM Sans
  --display-font| Clash Display        | DM Sans (bold)
  --mono-font   | IBM Plex Mono        | IBM Plex Mono (exact, Google)
  --logo-font   | Nunito (rounded)     | via Google Fonts
  ─────────────────────────────────────────────────────

  To activate real fonts:
  1. Download Cabinet Grotesk + Clash Display from fontshare.com
  2. Download IBM Plex Mono from fonts.google.com
  3. Drop .woff2 files into /public/fonts/
  4. Uncomment @font-face blocks in globals.css
*/

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--pp-font",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--mono-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MGX — From Insight to Impact",
  description:
    "MexyGabriel (MGX) is Africa's premier ecosystem for research, technology, innovation and entrepreneurship. Enugu, Nigeria.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
