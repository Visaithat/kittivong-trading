"use client";

import { motion } from "framer-motion";

type Props = {
  brand: string;
  tagline: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.45, 0, 0.55, 1] as const;

export function HeroKineticMotion({ brand, tagline }: Props) {
  const chars = brand.split("");
  return (
    <div className="relative flex w-full flex-col items-center justify-center">

      {/* Brand title — per-char stagger */}
      <motion.h2
        aria-label={brand}
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { delayChildren: 0.05, staggerChildren: 0.06 },
          },
        }}
        className="m-0 inline-flex flex-wrap items-baseline justify-center overflow-hidden px-1 pb-3 text-center font-display font-bold leading-[1.02] tracking-[-0.025em] text-ink"
        style={{ fontSize: "clamp(2.25rem, 7.2vw, 10rem)" }}
      >
        {chars.map((c, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: 60, opacity: 0, filter: "blur(10px)" },
              show: { y: 0, opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.95, ease: EASE }}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.h2>

      {/* Underline — pathLength reveal */}
      <svg
        aria-hidden
        viewBox="0 0 900 6"
        preserveAspectRatio="none"
        className="mt-5 block h-[6px] w-[min(80%,900px)] sm:mt-6"
      >
        <defs>
          <linearGradient id="hero-underline-motion" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="3"
          x2="900"
          y2="3"
          stroke="url(#hero-underline-motion)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.3, ease: EASE_INOUT, delay: 1.2 },
            opacity: { duration: 0.3, delay: 1.2 },
          }}
          style={{ filter: "drop-shadow(0 6px 14px rgba(22,163,74,0.4))" }}
        />
      </svg>

      {/* Tagline — clipPath reveal */}
      <motion.div
        aria-label={tagline}
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        transition={{
          clipPath: { duration: 1.2, ease: EASE, delay: 2 },
          opacity: { duration: 0.6, delay: 2 },
        }}
        className="mt-5 text-center font-mono font-medium text-green-deep sm:mt-6"
        style={{
          fontSize: "clamp(0.7rem, 1.4vw, 1.05rem)",
          letterSpacing: "0.5em",
        }}
      >
        {tagline}
      </motion.div>
    </div>
  );
}
