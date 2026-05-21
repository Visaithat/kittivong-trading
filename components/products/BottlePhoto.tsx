"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { BottleSkeleton } from "@/components/three/BottleSkeleton";
import type { BottleShape } from "@/lib/products";

type Props = {
  src: string;
  alt: string;
  shape: BottleShape;
  /** Layout sizes hint for next/image. */
  sizes?: string;
  /** Set true for hero / featured photos (eager + priority). */
  priority?: boolean;
  className?: string;
  /** Force a fixed aspect for the photo stage; defaults to fill. */
  fillObjectFit?: "contain" | "cover";
  /**
   * Lifestyle/editorial photo (people, hands, scenes) instead of a product
   * shot on a white background. Disables the white backdrop, dot-grid,
   * 10% padding, mix-blend-multiply, and silhouette skeleton — all of
   * which assume an isolated bottle on white.
   */
  lifestyle?: boolean;
};

/**
 * Renders a product photo on a clean white card. Shows an SVG silhouette
 * skeleton while loading, and falls back to it permanently if the image 404s.
 * Replaces the previous R3F bottle canvas — no WebGL, faster, smaller bundle.
 */
export function BottlePhoto({
  src,
  alt,
  shape,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
  fillObjectFit = "contain",
  lifestyle = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (lifestyle) {
    return (
      <div
        className={
          "relative h-full w-full overflow-hidden bg-soft " + (className ?? "")
        }
      >
        {/* Subtle shimmer placeholder while the JPG streams in. */}
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-skeleton-pulse bg-soft" />
        )}
        {!errored && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-center"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
            />
          </motion.div>
        )}
        {/* Bottom vignette to anchor the floating overlay chips on the card. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,26,19,0) 0%, rgba(14,26,19,0.28) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={
        "relative h-full w-full overflow-hidden bg-card " + (className ?? "")
      }
    >
      {/* Soft gradient + faint dot grid backdrop for some visual depth without
          stealing focus from the product. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 35%, rgba(255,255,255,1) 0%, rgba(241,247,238,0.7) 70%, rgba(241,247,238,0.4) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dotgrid bg-dotgrid-fade opacity-30"
      />

      {/* Skeleton silhouette: visible while loading, or permanently on error. */}
      {(!loaded || errored) && (
        <div className="absolute inset-0">
          <BottleSkeleton variant={shape} />
        </div>
      )}

      {/* Real photo */}
      {!errored && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={
              "object-center " +
              (fillObjectFit === "contain" ? "object-contain" : "object-cover")
            }
            style={{
              padding: fillObjectFit === "contain" ? "10%" : 0,
              mixBlendMode: "multiply",
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </motion.div>
      )}

      {/* Soft shadow under the bottle to give it presence on the white card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 100%, rgba(14,26,19,0.18) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
