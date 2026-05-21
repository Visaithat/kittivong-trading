"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BottlePhoto } from "@/components/products/BottlePhoto";
import { useT } from "@/lib/i18n";
import type { BottleShape } from "@/lib/products";

const BEAT_VISUAL: { shape: BottleShape; imageUrl: string }[] = [
  { shape: "apothecary", imageUrl: "/brand-story/beat-shelf.jpg" },
  { shape: "balm", imageUrl: "/brand-story/beat-hands.jpg" },
  { shape: "dropper", imageUrl: "/brand-story/beat-reach.jpg" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function StoryPanel({
  beat,
  visual,
  index,
}: {
  beat: {
    code: string;
    label: string;
    title: string;
    body: string;
    bullets: readonly string[];
  };
  visual: { shape: BottleShape; imageUrl: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.6]
  );
  const sceneY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid min-h-[50svh] grid-cols-1 items-center gap-8 px-5 sm:gap-10 sm:px-6 md:min-h-[70svh] md:grid-cols-12 md:gap-12 lg:gap-16 lg:px-8 landscape:md:min-h-[80svh]"
    >
      <motion.div
        style={{ y, opacity }}
        className={`md:col-span-5 ${isEven ? "md:col-start-1" : "md:col-start-8 md:row-start-1"}`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
            {beat.code} — {beat.label}
          </p>
        </div>
        <motion.h2
          style={{ y: titleY }}
          className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-ink xs:text-3xl md:text-4xl lg:text-6xl"
        >
          {beat.title}
        </motion.h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
          {beat.body}
        </p>

        <ul className="mt-8 space-y-2 text-sm">
          {beat.bullets.map((point) => (
            <li key={point} className="flex items-center gap-2 text-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-green" fill="none">
                <path
                  d="M5 12.5l4 4 10-10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        style={{ y: sceneY }}
        className={`relative md:col-span-6 ${isEven ? "md:col-start-7" : "md:col-start-1 md:row-start-1"}`}
      >
        <div className="card-soft-lg relative aspect-[5/6] overflow-hidden rounded-3xl bg-card">
          <BottlePhoto
            src={visual.imageUrl}
            alt={beat.label}
            shape={visual.shape}
            sizes="(min-width: 1024px) 50vw, 100vw"
            lifestyle
          />

          <svg
            aria-hidden
            viewBox="0 0 64 64"
            className="absolute -left-6 -top-6 z-10 h-28 w-28 rotate-12 opacity-50"
          >
            <path
              d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
              fill="#86c79f"
            />
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 64 64"
            className="absolute -bottom-6 -right-6 z-10 h-32 w-32 -rotate-12 opacity-40"
          >
            <path
              d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
              fill="#9bd0ad"
            />
          </svg>

          <div className="absolute inset-0 z-10 flex items-end p-8">
            <div className="rounded-2xl bg-white/85 px-4 py-3 backdrop-blur-md shadow-[var(--shadow-soft)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                chapter.{beat.code}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-ink">
                {beat.label}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function BrandStory() {
  const t = useT();
  return (
    <section className="relative z-10 mx-auto max-w-7xl py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="mb-14 px-5 sm:px-6 md:mb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
            {t.brand.eyebrow}
          </p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-7xl"
        >
          {t.brand.title_part_a}{" "}
          <span className="text-green-deep">{t.brand.title_emph}</span>
          {t.brand.title_part_b}
        </motion.h2>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {t.brand.beats.map((b, i) => (
          <StoryPanel
            key={b.code}
            beat={b}
            visual={BEAT_VISUAL[i] ?? BEAT_VISUAL[0]}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
