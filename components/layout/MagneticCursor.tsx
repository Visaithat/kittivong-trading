"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.35 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      enabled.current = false;
      return;
    }

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [data-magnetic], input, textarea, [role='button']"
      ) as HTMLElement | null;
      setHovering(Boolean(interactive));
      const cursorLabel = interactive?.getAttribute("data-cursor");
      setLabel(cursorLabel || null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled.current && typeof window !== "undefined") return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 28,
            height: hovering ? 56 : 28,
            backgroundColor: hovering
              ? "rgba(22,163,74,0.12)"
              : "rgba(22,163,74,0.06)",
            borderColor: hovering
              ? "rgba(22,163,74,0.7)"
              : "rgba(14,26,19,0.25)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[3px]"
          style={{
            boxShadow: hovering
              ? "0 12px 36px rgba(22,163,74,0.22)"
              : "0 6px 18px rgba(14,26,19,0.08)",
          }}
        >
          {label ? (
            <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white shadow">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-[5px] w-[5px] rounded-full bg-green shadow-[0_0_8px_rgba(22,163,74,0.6)]" />
      </motion.div>
    </>
  );
}
