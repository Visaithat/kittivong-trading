"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { useT } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  const t = useT();

  return (
    <section className="relative isolate flex min-h-svh w-full items-center justify-center px-6 py-32">
      <AmbientBackground intensity="loud" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 ring-1 ring-line backdrop-blur-md"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
            {t.notFound.eyebrow}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="font-display text-[120px] font-semibold leading-none tracking-tight text-ink md:text-[180px]"
        >
          <span className="bg-gradient-to-b from-ink to-green-deep bg-clip-text text-transparent">
            {t.notFound.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="max-w-md text-balance text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {t.notFound.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            data-magnetic
            data-cursor="Home"
            className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white shadow-[var(--shadow-green)] transition-transform hover:scale-[1.02]"
          >
            <span>{t.notFound.cta_home}</span>
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            data-magnetic
            data-cursor="Contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink backdrop-blur-md transition-colors hover:border-green/50 hover:text-green-deep"
          >
            <span>{t.notFound.cta_contact}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
