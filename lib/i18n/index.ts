export type Locale = "en" | "lo";

export const LOCALES: Locale[] = ["en", "lo"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  lo: "ລາວ",
};

export { en } from "./en";
export { lo } from "./lo";
export type { Dict } from "./en";

export { LocaleProvider, useLocale, useT } from "./provider";
