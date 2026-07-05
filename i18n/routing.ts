import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ko", "en", "ja"],
  defaultLocale: "ko",
});

export type Locale = (typeof routing.locales)[number];

export const ogLocales: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
};

export const localeLabels: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
  ja: "JA",
};

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
