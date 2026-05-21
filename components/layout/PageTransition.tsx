"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Route-change transition.
 *
 * Important: we do NOT wrap in <AnimatePresence mode="wait"> because the
 * previous page's exit animation would block the new (R3F-heavy) page from
 * mounting, leaving a blank screen until a reload. Each new pathname remounts
 * this <motion.div> via the `key`, so we get a clean enter animation while the
 * outgoing page unmounts immediately.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
