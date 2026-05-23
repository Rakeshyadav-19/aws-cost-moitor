// app/layout.tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400","600","700","800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500"] });

export const metadata: Metadata = {
  title: "CloudPulse — AWS Cost Monitor",
  description: "Real-time AWS cloud cost monitoring, budget alerts, and optimization recommendations.",
  keywords: ["AWS", "cloud cost", "FinOps", "cost explorer", "budget monitoring"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
