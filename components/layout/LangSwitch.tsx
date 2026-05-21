"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options = [
  { value: "en" as const, label: "EN" },
  { value: "lo" as const, label: "ລາວ" },
];

export function LangSwitch() {
  const { lang, setLang } = useLocale();

  return (
    <div className="relative inline-flex items-center rounded-full bg-soft/90 p-0.5 ring-1 ring-line">
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLang(o.value)}
            data-magnetic
            data-cursor={o.value === "en" ? "English" : "ພາສາລາວ"}
            aria-pressed={active}
            className={cn(
              "relative z-10 inline-flex items-center justify-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] transition-colors",
              active ? "text-white" : "text-ink-soft hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="langswitch-active"
                className="absolute inset-0 -z-10 rounded-full bg-green shadow-[var(--shadow-green)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
