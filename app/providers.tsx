"use client";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MagneticCursor } from "@/components/layout/MagneticCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { LocaleProvider } from "@/lib/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SmoothScroll>
        <MagneticCursor />
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </LocaleProvider>
  );
}
