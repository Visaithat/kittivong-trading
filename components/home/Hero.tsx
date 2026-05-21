"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { HeroHeartbeat } from "./HeroHeartbeat";
import { HeroKineticMotion } from "./HeroKineticMotion";
import { useT } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const t = useT();
  const pathname = usePathname();

  // Bump on every entry to `/` so children remount + animations replay.
  const [entry, setEntry] = useState(0);
  useEffect(() => {
    if (pathname === "/") setEntry((n) => n + 1);
  }, [pathname]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden landscape:min-h-[640px]"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 scale-110"
      >
        <div key={`bg-${entry}`} className="absolute inset-0">
          <AmbientBackground intensity="loud" className="opacity-100" />
          <HeroHeartbeat />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-page/10 to-page" />
      </motion.div>

      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 flex h-full flex-col items-center px-6"
      >
        <h1 className="sr-only">{t.hero.sub}</h1>

        {/* Top region — chip sits below the fixed nav, always */}
        <div className="flex w-full justify-center pt-24 sm:pt-28 md:pt-32">
          <motion.div
            key={`chip-${entry}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-w-full items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-md ring-1 ring-line sm:gap-3 sm:px-4"
          >
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-green animate-pulse" />
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.28em] text-ink-soft sm:text-[10px] sm:tracking-[0.32em]">
              {t.hero.locations}
            </span>
          </motion.div>
        </div>

        {/* Middle region — kinetic title vertical-centers in remaining space */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 sm:gap-6">
          <div
            key={`kinetic-${entry}`}
            className="pointer-events-none mx-auto w-full max-w-[1100px] px-2"
          >
            <HeroKineticMotion brand="kittivong-trading" tagline={t.hero.tagline} />
          </div>

          <motion.div
            key={`cta-${entry}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-center gap-5 sm:gap-6"
          >
            <p className="max-w-xl text-balance text-center text-sm leading-relaxed text-ink-soft sm:text-base md:text-lg">
              {t.hero.sub}
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/products"
                data-magnetic
                data-cursor={t.hero.cursor_browse}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-green px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white shadow-[var(--shadow-green)] transition-transform hover:scale-[1.02]"
              >
                <span>{t.hero.cta_browse}</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                data-magnetic
                data-cursor={t.hero.cursor_contact}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/70 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink backdrop-blur-md transition-colors hover:border-green/50 hover:text-green-deep"
              >
                <span>{t.hero.cta_contact}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom region — scroll hint */}
        <motion.div
          key={`scroll-${entry}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="pointer-events-none hidden justify-center pb-6 sm:flex sm:pb-8"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-ink-mute">
              {t.hero.scroll}
            </span>
            <span className="block h-10 w-px bg-gradient-to-b from-ink-mute/50 to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-page"
      />
    </section>
  );
}
