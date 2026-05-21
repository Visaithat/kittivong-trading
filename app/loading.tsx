"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { useT } from "@/lib/i18n";

export default function Loading() {
  const t = useT();
  return (
    <section className="relative isolate flex min-h-svh w-full items-center justify-center">
      <AmbientBackground intensity="ambient" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center gap-3 rounded-full bg-white/85 px-5 py-2.5 ring-1 ring-line backdrop-blur-md shadow-[var(--shadow-soft)]"
      >
        <span className="relative inline-flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft">
          {t.loading.chip}
        </span>
      </motion.div>
    </section>
  );
}
