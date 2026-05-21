"use client";

import Link from "next/link";
import { hubs } from "@/lib/hubs";
import { useLocale } from "@/lib/i18n";

const FOOTER_HUB_LIMIT = 8;

export function Footer() {
  const { lang, t } = useLocale();
  const visible = hubs.slice(0, FOOTER_HUB_LIMIT);
  const remaining = hubs.length - visible.length;

  return (
    <footer className="relative z-10 mt-20 border-t border-line bg-soft px-5 pb-12 pt-14 sm:px-6 md:mt-32 md:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-ink"
            data-magnetic
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-green text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M12 3v18M3 12h18"
                  stroke="white"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>
              kittivong<span className="text-ink-soft">-trading</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
            // {t.footer.hubs_label}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {visible.map((h) => (
              <li key={h.id} className="flex items-center gap-2">
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full " +
                    (h.primary
                      ? "bg-green shadow-[0_0_8px_rgba(22,163,74,0.55)]"
                      : "bg-green-deep/70")
                  }
                />
                <span className={h.primary ? "text-ink font-medium" : "text-ink"}>
                  {h.name[lang]}
                </span>
              </li>
            ))}
            {remaining > 0 && (
              <li className="col-span-2 mt-1 text-ink-soft">
                {t.footer.hubs_more.replace("{n}", String(remaining))}
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
            // {t.footer.contact_label}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/contact"
                className="text-ink underline-offset-4 hover:text-green-deep hover:underline"
                data-magnetic
              >
                {t.footer.contact_cta}
              </Link>
            </li>
            <li className="text-ink-soft">trade@kittivong.trading</li>
            <li className="text-ink-soft">+856 21 000 000</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:tracking-[0.32em]">
        <span>© {new Date().getFullYear()} kittivong-trading — {t.footer.rights}</span>
        <span>{t.footer.version}</span>
      </div>
    </footer>
  );
}
