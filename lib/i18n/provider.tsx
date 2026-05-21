"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { en } from "./en";
import { lo } from "./lo";
import type { Dict } from "./en";

export type Locale = "en" | "lo";

const DICTS: Record<Locale, Dict> = { en, lo };

type Ctx = {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: Dict;
};

const LocaleCtx = createContext<Ctx | null>(null);

const COOKIE_KEY = "kv_lang";

function readInitialLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)kv_lang=(en|lo)/);
  if (match) return match[1] as Locale;
  const ls = localStorage.getItem(COOKIE_KEY);
  if (ls === "en" || ls === "lo") return ls;
  const browser = navigator.language || "";
  return browser.toLowerCase().startsWith("lo") ? "lo" : "en";
}

export function LocaleProvider({
  children,
  initial = "en",
}: {
  children: React.ReactNode;
  initial?: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initial);

  // Resolve real preference after mount (avoids hydration mismatch).
  useEffect(() => {
    const resolved = readInitialLocale();
    if (resolved !== lang) setLangState(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist + update <html lang>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    try {
      localStorage.setItem(COOKIE_KEY, lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Locale) => setLangState(l), []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: DICTS[lang] }),
    [lang, setLang]
  );

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

export function useT() {
  return useLocale().t;
}
