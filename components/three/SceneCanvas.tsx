"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { BottleSkeleton } from "./BottleSkeleton";

const ThreeScene = dynamic(() => import("./_ThreeScene"), {
  ssr: false,
  loading: () => <BottleSkeleton />,
});

type Props = {
  children: React.ReactNode;
  className?: string;
  cameraZ?: number;
  fov?: number;
  /** Override the skeleton with custom content. */
  fallback?: ReactNode;
  /**
   * Shape hint used by the default skeleton. Pass a value matching the
   * primary bottle in the scene so the placeholder reads as the right product.
   */
  skeletonVariant?: "apothecary" | "balm" | "syrup" | "dropper";
  /**
   * If false (default), the canvas only mounts when the wrapper enters the
   * viewport — keeps initial page paint cheap. The fallback skeleton renders
   * in the meantime.
   */
  eager?: boolean;
};

export function SceneCanvas({
  children,
  className,
  cameraZ = 4,
  fov = 35,
  fallback,
  skeletonVariant = "apothecary",
  eager = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
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
  }, [eager]);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <ThreeScene cameraZ={cameraZ} fov={fov}>
          {children}
        </ThreeScene>
      ) : (
        fallback ?? <BottleSkeleton variant={skeletonVariant} />
      )}
    </div>
  );
}
