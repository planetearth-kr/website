"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname, routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  ko: "KO",
  en: "EN",
  ja: "JA",
};

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(nextLocale: string) {
    setOpen(false);
    router.replace(pathname, {
      locale: nextLocale as (typeof routing.locales)[number],
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/20 transition-colors text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path
            strokeWidth="2"
            d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"
          />
        </svg>
        {localeLabels[locale]}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="3" strokeLinecap="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-[80px] z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                l === locale
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/staff" as const, label: t("staff"), internal: true },
    { href: "https://discord.com/invite/PlanetEarth", label: t("discord"), internal: false },
    { href: "https://planetearth.kr/guide", label: t("guide"), internal: false },
    { href: "https://map.planetearth.kr", label: t("map"), internal: false },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PlanetEarth
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) =>
            link.internal ? (
              <Link key={link.href} href={link.href} className="hover:text-gray-300">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="hover:text-gray-300">
                {link.label}
              </a>
            )
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile: hamburger + language switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded hover:bg-white/20 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden">
          {navLinks.map((link) =>
            link.internal ? (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-gray-500 text-sm">
        <p>
          2022-{new Date().getFullYear()} planetearth.kr. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center">
          <span>{t("disclaimer")}</span>
          <span>{t("help")}</span>
        </div>
      </div>
    </footer>
  );
}
