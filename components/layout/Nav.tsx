"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";

export function Nav() {
  const pathname = usePathname();
  const t = useT();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/products", label: t.nav.catalog },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-6 sm:pt-6"
    >
      <nav className="glass-strong relative flex max-w-[calc(100vw-1.5rem)] items-center gap-1.5 rounded-full px-2.5 py-2 text-sm shadow-[var(--shadow-soft)] xs:gap-2 sm:gap-4 sm:px-5 sm:py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-ink xs:text-base sm:gap-2"
          data-magnetic
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-green text-white xs:h-7 xs:w-7">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 3v18M3 12h18"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>
            kittivong
            <span className="hidden text-ink-soft sm:inline">-trading</span>
          </span>
        </Link>
        <div className="hidden h-4 w-px bg-line sm:block" />
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  data-magnetic
                  className={cn(
                    "relative inline-flex items-center rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors xs:px-2.5 xs:tracking-[0.22em] sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.28em]",
                    active
                      ? "text-green-deep"
                      : "text-ink-soft hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-mint"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden h-4 w-px bg-line sm:block" />
        <LangSwitch />
        <div className="hidden h-4 w-px bg-line md:block" />
        <div className="hidden items-center gap-2 md:flex">
          <span className="relative inline-flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
            {t.nav.open_now}
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
