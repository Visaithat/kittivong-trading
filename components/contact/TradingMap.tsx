"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";

const LaosScene3D = dynamic(() => import("./LaosScene3D"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export function TradingMap() {
  const { lang, t } = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);

  // Lazy-mount the WebGL canvas only when the card enters the viewport.
  // Matches the pattern in components/three/SceneCanvas.tsx.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Surface the drag/pinch affordance, then get out of the way. Fades on the
  // first pointer-down or wheel inside the card, or after 8s idle.
  useEffect(() => {
    if (!visible) return;
    const el = wrapperRef.current;
    const dismiss = () => setHintHidden(true);
    const timeoutId = window.setTimeout(dismiss, 8000);
    el?.addEventListener("pointerdown", dismiss, { once: true });
    el?.addEventListener("wheel", dismiss, { once: true, passive: true });
    return () => {
      window.clearTimeout(timeoutId);
      el?.removeEventListener("pointerdown", dismiss);
      el?.removeEventListener("wheel", dismiss);
    };
  }, [visible]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full overflow-hidden rounded-3xl card-soft-lg bg-soft"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 40%, rgba(22,163,74,0.12) 0%, transparent 72%)",
        }}
      />

      {/* Coverage badge */}
      <div className="absolute left-3 top-3 z-10 rounded-2xl bg-white/88 px-2.5 py-1.5 ring-1 ring-line backdrop-blur-md shadow-[var(--shadow-soft)] sm:left-4 sm:top-4 sm:px-3 sm:py-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-green-deep">
          {lang === "lo" ? "ບໍລິການທົ່ວປະເທດ" : "Nationwide coverage"}
        </p>
        <p className="mt-0.5 font-display text-lg font-semibold leading-tight text-ink">
          <span className="text-green-deep">17 / 17</span>
          <span className="ml-1 text-xs font-medium text-ink-soft">
            {lang === "lo" ? "ແຂວງ + ນະຄອນຫຼວງ" : "provinces + capital"}
          </span>
        </p>
      </div>

      {/* 3D scene fills the card. */}
      <div className="absolute inset-0">
        {visible ? <LaosScene3D /> : <MapSkeleton />}
      </div>

      {/* Drag/pinch affordance — fades on first interaction or 8s timeout. */}
      <div
        className={[
          "pointer-events-none absolute right-3 top-3 z-10 sm:right-4 sm:top-4",
          "rounded-full bg-white/85 backdrop-blur-md px-3 py-1.5",
          "ring-1 ring-line shadow-[var(--shadow-soft)]",
          "font-mono text-[9px] uppercase tracking-[0.24em] text-green-deep",
          "transition-opacity duration-700",
          hintHidden ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {lang === "lo" ? "⤳ ລາກ · ບີບເພື່ອຊູມ" : "⤳ Drag · Pinch to zoom"}
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-[0.22em] text-ink-soft sm:bottom-4 sm:left-4 sm:right-4 sm:gap-x-4 sm:text-[9px] sm:tracking-[0.28em]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-2 w-2 rounded-full bg-green shadow-[0_0_6px_rgba(22,163,74,0.6)]" />
            {t.contact.map.legend_primary}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-deep shadow-[0_0_6px_rgba(4,120,87,0.6)]" />
            {t.contact.map.legend_desk}
          </span>
        </div>
        <span className="text-[8px] tracking-[0.2em] text-ink-mute opacity-70">
          geoBoundaries CC-BY
        </span>
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 120 160"
        className="h-3/5 w-3/5 opacity-25"
        aria-hidden
      >
        {/* A loose, recognizable Laos silhouette for the loading state.
            Narrow tongue north, central waist, southern tail. */}
        <path
          d="M62 8 L70 12 L72 20 L66 28 L70 36 L62 42 L66 52 L60 60 L72 68 L78 80 L70 92 L74 102 L66 112 L62 124 L70 138 L62 152 L54 142 L50 128 L56 116 L52 102 L58 92 L48 84 L54 72 L48 62 L54 54 L50 44 L56 36 L54 26 L60 18 Z"
          fill="#16a34a"
          fillOpacity={0.5}
          stroke="#047857"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
