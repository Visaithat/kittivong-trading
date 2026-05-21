"use client";

import { motion } from "framer-motion";

type Intensity = "loud" | "ambient" | "subtle";

type Props = {
  /** Controls visual loudness — pick "loud" for hero use, "ambient" for loading, "subtle" for behind content. */
  intensity?: Intensity;
  className?: string;
};

const LEAF_PATH =
  "M32 4 C 48 12, 60 28, 56 48 C 42 60, 22 58, 10 44 C 6 26, 16 10, 32 4 Z";

// Leaves anchor to outer corners + side mid-points only — never near the
// horizontal center (where the hero title sits). Each entry keeps a buffer
// of >=12% from its nearest neighbour so drift animations don't collide.
const LEAVES = [
  { x: "3%", y: "6%", size: 110, hue: "#86c79f", rotate: -18, seed: 0 },
  { x: "84%", y: "5%", size: 130, hue: "#9bd0ad", rotate: 22, seed: 1 },
  { x: "0%", y: "46%", size: 95, hue: "#a8d8b5", rotate: -8, seed: 2 },
  { x: "90%", y: "50%", size: 120, hue: "#7ac294", rotate: 14, seed: 3 },
  { x: "5%", y: "82%", size: 135, hue: "#9bd0ad", rotate: 28, seed: 4 },
  { x: "82%", y: "84%", size: 110, hue: "#86c79f", rotate: -22, seed: 5 },
];

// Capsules use explicit (x, y) instead of the lane formula so the layout
// is deterministic. Positions alternate left↔right and stay outside the
// 38–62% horizontal "title corridor". Sizes shrink slightly to reduce
// visual noise.
const CAPSULES = [
  { x: "12%", y: "26%", size: 56, hueA: "#bbf7d0", hueB: "#ffffff", tilt: -18 },
  { x: "82%", y: "22%", size: 50, hueA: "#86efac", hueB: "#fef3c7", tilt: 14 },
  { x: "8%", y: "60%", size: 64, hueA: "#16a34a", hueB: "#ffffff", tilt: -8 },
  { x: "86%", y: "66%", size: 54, hueA: "#bbf7d0", hueB: "#dcfce7", tilt: 18 },
  { x: "30%", y: "92%", size: 58, hueA: "#22c55e", hueB: "#ffffff", tilt: -12 },
  { x: "68%", y: "94%", size: 52, hueA: "#86efac", hueB: "#ffffff", tilt: 16 },
];

function opacityFor(intensity: Intensity) {
  if (intensity === "loud") return 1;
  if (intensity === "ambient") return 0.78;
  return 0.5;
}

export function AmbientBackground({
  intensity = "ambient",
  className,
}: Props) {
  const opacity = opacityFor(intensity);

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " +
        (className ?? "")
      }
      style={{ opacity }}
    >
      {/* Cream → mint gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, #ffffff 0%, #f1f7ee 55%, #e7f1e3 100%)",
        }}
      />

      {/* Soft blooms */}
      <div
        className="absolute"
        style={{
          left: "8%",
          top: "20%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(22,163,74,0.16) 0%, transparent 65%)",
          filter: "blur(20px)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "5%",
          bottom: "5%",
          width: 620,
          height: 620,
          background:
            "radial-gradient(circle, rgba(101,182,135,0.22) 0%, transparent 70%)",
          filter: "blur(30px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Breathing concentric rings (centerpiece focus) */}
      <BreathingRings />

      {/* Drifting leaves */}
      {LEAVES.map((leaf) => (
        <motion.svg
          key={leaf.seed}
          viewBox="0 0 64 64"
          width={leaf.size}
          height={leaf.size}
          style={{
            position: "absolute",
            left: leaf.x,
            top: leaf.y,
            filter: "drop-shadow(0 12px 24px rgba(22,163,74,0.18))",
          }}
          initial={false}
          animate={{
            x: [0, 18, -10, 12, 0],
            y: [0, -14, -24, -8, 0],
            rotate: [leaf.rotate, leaf.rotate + 6, leaf.rotate - 4, leaf.rotate + 8, leaf.rotate],
            scale: [1, 1.05, 0.96, 1.03, 1],
          }}
          transition={{
            duration: 12 + leaf.seed * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: leaf.seed * 0.7,
          }}
        >
          <defs>
            <linearGradient
              id={`leaf-amb-${leaf.seed}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor={leaf.hue} stopOpacity="0.95" />
              <stop offset="100%" stopColor={leaf.hue} stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path d={LEAF_PATH} fill={`url(#leaf-amb-${leaf.seed})`} />
          <path
            d="M32 6 C 30 22, 28 38, 22 52"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}

      {/* Drifting capsules */}
      {CAPSULES.map((c, i) => (
        <Capsule key={`${c.x}-${c.y}`} seed={i} {...c} />
      ))}
    </div>
  );
}

function BreathingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        width="60%"
        style={{ maxWidth: 720, minWidth: 300 }}
      >
        <motion.circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="rgba(22,163,74,0.28)"
          strokeWidth="0.8"
          animate={{
            r: [80, 110, 80],
            opacity: [0.28, 0.5, 0.28],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="rgba(22,163,74,0.2)"
          strokeWidth="0.6"
          animate={{
            r: [130, 160, 130],
            opacity: [0.2, 0.36, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(22,163,74,0.12)"
          strokeWidth="0.5"
          animate={{
            r: [180, 210, 180],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>
    </div>
  );
}

function Capsule({
  x,
  y,
  size,
  hueA,
  hueB,
  tilt,
  seed,
}: {
  x: string;
  y: string;
  size: number;
  hueA: string;
  hueB: string;
  tilt: number;
  seed: number;
}) {
  // Capsules orbit in a tight ±10px envelope around their anchor so they
  // stay clearly inside their zone and never overlap a neighbour.
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size * 0.42,
        transform: `rotate(${tilt}deg)`,
        filter: "drop-shadow(0 10px 20px rgba(14,26,19,0.12))",
      }}
      animate={{
        x: [0, 10, -6, 8, 0],
        y: [0, -6, -12, -4, 0],
        rotate: [tilt, tilt + 4, tilt - 3, tilt + 5, tilt],
      }}
      transition={{
        duration: 12 + seed * 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: seed * 0.7,
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: hueA,
          borderRadius: `${size}px 0 0 ${size}px`,
          borderRight: "1px solid rgba(255,255,255,0.4)",
        }}
      />
      <div
        style={{
          width: "50%",
          height: "100%",
          float: "left",
          background: hueB,
          borderRadius: `0 ${size}px ${size}px 0`,
        }}
      />
    </motion.div>
  );
}
