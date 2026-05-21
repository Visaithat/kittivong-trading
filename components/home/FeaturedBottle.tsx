"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BottlePhoto } from "@/components/products/BottlePhoto";
import { useT } from "@/lib/i18n";
import type { BottleShape } from "@/lib/products";

type Tab = {
  shape: BottleShape;
  code: string;
  imageUrl: string;
};

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=1200&q=88&fit=crop&auto=format`;

const TABS: Tab[] = [
  {
    shape: "apothecary",
    code: "AP-01",
    imageUrl: "/products/helio-peptide-tincture.png",
  },
  {
    shape: "balm",
    code: "BJ-03",
    imageUrl: "/products/mowaan-relieve-oil.png",
  },
  {
    shape: "syrup",
    code: "SY-04",
    imageUrl: UNSPLASH("1584308666744-24d5c474f2ae"),
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeaturedBottle() {
  const ref = useRef<HTMLElement>(null);
  const t = useT();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const current = TABS[active];
  const formKey: keyof typeof t.featured.forms = current.shape as
    | "apothecary"
    | "balm"
    | "syrup";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-soft py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid bg-dotgrid-fade opacity-40"
      />
      <svg
        aria-hidden
        viewBox="0 0 64 64"
        className="pointer-events-none absolute -left-12 top-12 hidden h-48 w-48 rotate-12 opacity-50 sm:block"
      >
        <path
          d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
          fill="#9bd0ad"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 64 64"
        className="pointer-events-none absolute -right-12 bottom-12 hidden h-52 w-52 -rotate-12 opacity-40 sm:block"
      >
        <path
          d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
          fill="#86c79f"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                {t.featured.eyebrow}
              </p>
            </div>
            <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-ink xs:text-3xl md:text-4xl lg:text-6xl">
              {t.featured.title_part}{" "}
              <span className="text-green-deep">{t.featured.title_emph}</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              {t.featured.body}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  {t.featured.spec_origin}
                </dt>
                <dd className="mt-1 text-ink">
                  {t.featured.spec_origin_value}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  {t.featured.spec_form}
                </dt>
                <dd className="mt-1 text-ink">{t.featured.forms[formKey]}</dd>
              </div>
            </dl>

            <div className="mt-10 inline-flex items-center rounded-full bg-card p-1 ring-1 ring-line shadow-[var(--shadow-soft)]">
              {TABS.map((tab, i) => (
                <button
                  key={tab.shape}
                  type="button"
                  onClick={() => setActive(i)}
                  data-magnetic
                  data-cursor={t.featured.tabs[tab.shape as keyof typeof t.featured.tabs]}
                  className={
                    "relative inline-flex items-center rounded-full px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 xs:px-3 xs:tracking-[0.24em] sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.28em] " +
                    (active === i
                      ? "text-white"
                      : "text-ink-soft hover:text-ink")
                  }
                >
                  {active === i && (
                    <motion.span
                      layoutId="featured-tab-active"
                      className="absolute inset-0 rounded-full bg-green shadow-[var(--shadow-green)]"
                      transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t.featured.tabs[tab.shape as keyof typeof t.featured.tabs]}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
              {t.featured.swap_hint}
            </p>

            <div className="mt-8">
              <a
                href="/products"
                data-magnetic
                data-cursor={t.featured.tabs.apothecary}
                className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-ink ring-1 ring-line transition-colors hover:border-green hover:text-green-deep"
              >
                {t.featured.cta}
              </a>
            </div>
          </motion.div>

          {/* Photo stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{ y: sceneY }}
            className="lg:col-span-7"
          >
            <div
              data-magnetic
              data-cursor={t.featured.swap_hint}
              className="card-soft-lg relative aspect-[5/4] overflow-hidden rounded-3xl bg-card"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.code}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <BottlePhoto
                    src={current.imageUrl}
                    alt={current.code}
                    shape={current.shape}
                    priority={active === 0}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.code + "-chip"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute left-6 top-6 z-10 rounded-full bg-card/85 px-3 py-1.5 ring-1 ring-line backdrop-blur-md"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                    {current.code}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
