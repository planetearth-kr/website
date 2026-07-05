"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Link,
  useRouter,
  usePathname,
  routing,
  localeLabels,
  type Locale,
} from "@/i18n/routing";

function useDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  setOpen: (open: boolean) => void
) {
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, open, setOpen]);
}

type NavItem = { href: string; label: string; internal: boolean };

function NavLink({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  return item.internal ? (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, setOpen);

  function switchLocale(nextLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("language")}
        aria-expanded={open}
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
  const navRef = useRef<HTMLElement>(null);
  useDismiss(navRef, menuOpen, setMenuOpen);

  const navLinks: NavItem[] = [
    { href: "/staff", label: t("staff"), internal: true },
    { href: "/discord", label: t("discord"), internal: false },
    { href: "/guide", label: t("guide"), internal: false },
    { href: "/map", label: t("map"), internal: false },
  ];

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50 text-white py-4"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PlanetEarth
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink key={link.href} item={link} className="hover:text-gray-300" />
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded hover:bg-white/20 transition-colors"
            aria-label={t("menu")}
            aria-expanded={menuOpen}
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

      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              item={link}
              className="block px-4 py-3 hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
