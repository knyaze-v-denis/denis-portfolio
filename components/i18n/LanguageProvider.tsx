"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { messages } from "@/lib/i18n/messages";
import type { Locale, Messages } from "@/lib/i18n/types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
};

function replaceLocaleInPathname(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "ru" || segments[0] === "en") {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (locale === "ru" || locale === "en") {
    return locale;
  }

  return null;
}

export default function LanguageProvider({
  children,
  initialLocale,
}: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? initialLocale;

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }
      document.documentElement.setAttribute("lang", nextLocale);

      const nextPathname = replaceLocaleInPathname(pathname, nextLocale);
      const hash = typeof window !== "undefined" ? window.location.hash : "";

      router.push(`${nextPathname}${hash}`);
    },
    [locale, pathname, router]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}