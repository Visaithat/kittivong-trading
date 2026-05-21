"use client";

type Props = {
  className?: string;
  variant?: "apothecary" | "balm" | "syrup" | "dropper";
};

/**
 * A lightweight, no-WebGL bottle silhouette used while the real R3F Canvas
 * (and its dynamic three.js import) is loading or before the SceneCanvas
 * IntersectionObserver flips visible. Renders an SVG bottle in soft mint
 * with a sweeping shimmer overlay so it reads as "loading".
 */
export function BottleSkeleton({ className, variant = "apothecary" }: Props) {
  return (
    <div
      className={
        "relative flex h-full w-full items-center justify-center overflow-hidden " +
        (className ?? "")
      }
      aria-hidden
    >
      <svg
        viewBox="0 0 200 240"
        className="h-[78%] w-auto opacity-90"
        fill="none"
      >
        <defs>
          <linearGradient id="bs-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dceadb" />
            <stop offset="100%" stopColor="#b8d5bf" />
          </linearGradient>
          <linearGradient id="bs-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65b687" />
            <stop offset="100%" stopColor="#4ea872" />
          </linearGradient>
        </defs>

        {variant === "balm" ? (
          <BalmShape />
        ) : variant === "syrup" ? (
          <SyrupShape />
        ) : variant === "dropper" ? (
          <DropperShape />
        ) : (
          <ApothecaryShape />
        )}

        {/* Label strip */}
        <rect
          x="48"
          y="120"
          width="104"
          height="60"
          rx="6"
          fill="#ffffff"
          opacity="0.55"
        />
        <rect x="58" y="138" width="84" height="6" rx="3" fill="#0e1a13" opacity="0.18" />
        <rect x="58" y="152" width="60" height="5" rx="2" fill="#0e1a13" opacity="0.14" />
        <rect x="58" y="162" width="40" height="4" rx="2" fill="#0e1a13" opacity="0.12" />
      </svg>

      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function ApothecaryShape() {
  return (
    <>
      <rect x="84" y="32" width="32" height="14" rx="3" fill="url(#bs-cap)" />
      <rect x="80" y="44" width="40" height="10" rx="3" fill="#0f2d1e" opacity="0.4" />
      <rect x="76" y="52" width="48" height="6" rx="3" fill="url(#bs-cap)" opacity="0.7" />
      <path
        d="M64 70 Q 100 56 136 70 L 136 200 Q 100 214 64 200 Z"
        fill="url(#bs-body)"
      />
    </>
  );
}

function BalmShape() {
  return (
    <>
      <rect x="46" y="80" width="108" height="34" rx="6" fill="url(#bs-cap)" />
      <rect x="38" y="110" width="124" height="6" rx="3" fill="#8a6038" opacity="0.4" />
      <path
        d="M40 116 Q 100 102 160 116 L 160 210 Q 100 220 40 210 Z"
        fill="url(#bs-body)"
      />
    </>
  );
}

function SyrupShape() {
  return (
    <>
      <rect x="80" y="34" width="40" height="22" rx="4" fill="#ffffff" stroke="#0e1a13" strokeOpacity="0.15" />
      <rect x="86" y="56" width="28" height="10" rx="3" fill="url(#bs-body)" />
      <rect x="50" y="68" width="100" height="148" rx="10" fill="url(#bs-body)" />
    </>
  );
}

function DropperShape() {
  return (
    <>
      <circle cx="100" cy="36" r="14" fill="#86c79f" />
      <rect x="92" y="48" width="16" height="14" rx="3" fill="#0f3a25" opacity="0.5" />
      <rect x="80" y="62" width="40" height="14" rx="4" fill="url(#bs-cap)" />
      <path
        d="M64 86 Q 100 76 136 86 L 136 206 Q 100 218 64 206 Z"
        fill="url(#bs-body)"
      />
    </>
  );
}
