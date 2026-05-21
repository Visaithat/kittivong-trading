"use client";

import { motion } from "framer-motion";

const W = 1920;
const H = 1080;
const SEGMENTS = 12;
const BASELINE_Y = H * 0.78;
const STEP_X = W / SEGMENTS;

function buildPath() {
  let d = `M 0 ${BASELINE_Y}`;
  for (let i = 0; i < SEGMENTS; i++) {
    const startX = i * STEP_X;
    d += ` L ${startX + STEP_X * 0.35} ${BASELINE_Y}`;
    d += ` L ${startX + STEP_X * 0.4} ${BASELINE_Y - 50}`;
    d += ` L ${startX + STEP_X * 0.45} ${BASELINE_Y + 70}`;
    d += ` L ${startX + STEP_X * 0.5} ${BASELINE_Y - 20}`;
    d += ` L ${startX + STEP_X * 0.55} ${BASELINE_Y}`;
    d += ` L ${(i + 1) * STEP_X} ${BASELINE_Y}`;
  }
  return d;
}

const DASH_TOTAL = 4400;

export function HeroHeartbeat() {
  const d = buildPath();
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d={d}
        fill="none"
        stroke="rgba(22,163,74,0.12)"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(22,163,74,0.6)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`80 ${DASH_TOTAL}`}
        initial={{ strokeDashoffset: DASH_TOTAL }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ filter: "drop-shadow(0 0 8px rgba(22,163,74,0.45))" }}
      />
    </svg>
  );
}
