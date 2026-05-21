"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/lib/products";
import { BottlePhoto } from "./BottlePhoto";
import { useLocale } from "@/lib/i18n";

type Props = { product: Product; index: number };

export function ProductCard({ product, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang, t } = useLocale();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 22,
  });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 240,
    damping: 26,
  });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), {
    stiffness: 240,
    damping: 26,
  });

  const hx = useMotionValue(50);
  const hy = useMotionValue(50);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    hx.set(px * 100);
    hy.set(py * 100);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const highlight = useTransform(
    [hx, hy],
    ([bx, by]: number[]) =>
      `radial-gradient(220px circle at ${bx}% ${by}%, rgba(22,163,74,0.14), transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      onPointerLeave={reset}
      onPointerMove={onPointerMove}
      style={{
        x: tx,
        y: ty,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group perspective-1200 relative"
      data-magnetic
      data-cursor={product.category[lang]}
    >
      <div
        className="relative overflow-hidden rounded-3xl bg-card border border-line shadow-[var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-soft-lg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          aria-hidden
          viewBox="0 0 64 64"
          className="absolute -right-6 -top-6 z-10 h-28 w-28 rotate-12 opacity-30"
        >
          <path
            d="M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z"
            fill="#9bd0ad"
          />
        </svg>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: highlight }}
        />

        {/* Photo stage — white background per pharmacy brief */}
        <div className="relative h-[260px] w-full xs:h-[280px] sm:h-[300px]">
          <BottlePhoto
            src={product.imageUrl}
            alt={product.name[lang]}
            shape={product.shape}
          />

          <div className="absolute left-5 top-5 z-20">
            <span className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-green-deep ring-1 ring-line backdrop-blur-md">
              {product.category[lang]}
            </span>
          </div>

          <div className="absolute right-5 top-5 z-20">
            <span className="rounded-full bg-ink/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white">
              {product.label}
            </span>
          </div>
        </div>

        <div className="relative z-10 p-4 xs:p-5 md:p-7" style={{ transform: "translateZ(20px)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-ink-mute">
            // {product.serial}
          </p>
          <h3 className="mt-4 font-display text-xl font-semibold leading-tight tracking-tight text-ink xs:text-2xl">
            {product.name[lang]}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {product.blurb[lang]}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              data-magnetic
              data-cursor={t.products.dossier}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:text-green-deep"
            >
              {t.products.dossier}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                {t.products.in_stock}
              </span>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(22,163,74,0.4)" }}
        />
      </div>
    </motion.div>
  );
}
