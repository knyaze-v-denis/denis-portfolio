"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { messages } from "@/lib/i18n/messages";
import type { Locale, Messages } from "@/lib/i18n/types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const stored = sessionStorage.getItem("locale");
  if (stored === "ru" || stored === "en") return stored;

  const browserLanguage = navigator.language.toLowerCase();
  return browserLanguage.startsWith("ru") ? "ru" : "en";
}

type LanguageProviderProps = {
  children: React.ReactNode;
};

export default function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLocaleState(getInitialLocale());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    sessionStorage.setItem("locale", nextLocale);
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale]
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