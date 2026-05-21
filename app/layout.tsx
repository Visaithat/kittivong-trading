import type { Metadata, Viewport } from "next";
import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Lao,
  Noto_Serif_Lao,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Formal Lao typography: Noto Serif Lao for display surfaces, Noto Sans Lao for body
const notoSerifLao = Noto_Serif_Lao({
  subsets: ["lao"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif-lao",
});
const notoSansLao = Noto_Sans_Lao({
  subsets: ["lao"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-lao",
});

export const metadata: Metadata = {
  title: "kittivong-trading — trusted pharmacy & wellness trade",
  description:
    "kittivong-trading delivers clean, pharmacy-grade products from Vientiane to the world. Engineered for trust, distributed with care.",
  metadataBase: new URL("https://kittivong.trading"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSerifLao.variable} ${notoSansLao.variable}`}
    >
      <body className="relative min-h-screen bg-page text-ink antialiased">
        <Providers>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
