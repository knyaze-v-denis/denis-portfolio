// @ts-expect-error -- Next.js supports global CSS side-effect imports in app router layouts
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import LanguageScript from "@/components/i18n/LanguageScript";
import type { Locale } from "@/lib/i18n/types";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { mapSanitySiteSettingsToSiteSettingsData } from "@/sanity/lib/mappers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const SITE_URL = "https://www.knyaze-v-denis.ru";

export const SUPPORTED_LOCALES = ["ru", "en"] as const;
export const DEFAULT_LOCALE: Locale = "ru";

export function getOpenGraphLocale(locale: Locale) {
  return locale === "ru" ? "ru_RU" : "en_US";
}

export async function generateMetadata(): Promise<Metadata> {
  const settingsDoc = await client.fetch(siteSettingsQuery);
  const cookieStore = await cookies();

  const locale = getInitialLocaleFromCookie(cookieStore);
  const openGraphLocale = getOpenGraphLocale(locale);

  const settings = settingsDoc
    ? mapSanitySiteSettingsToSiteSettingsData(settingsDoc, locale)
    : null;

  const title = settings?.seoTitle || "Denis Knyazev — Product Designer";
  const description =
    settings?.seoDescription ||
    "Portfolio of Denis Knyazev — product designer focused on UX, UI and product systems.";

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: title,
      template: `%s — Denis Knyazev`,
    },

    description,

    alternates: {
      canonical: undefined,
    },

    openGraph: {
      type: "website",
      locale: openGraphLocale,
      url: SITE_URL,
      title,
      description,
      siteName: "Denis Knyazev",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    verification: {
      google: "FG-DiKjttBd2jzwUU3ZKz25hjWP-zdl2NGQFgoSaonw",
    },
  };
}

const themeInitScript = `
(() => {
  try {
    const readCookie = (name) => {
      const cookieString = document.cookie || "";
      const cookies = cookieString.split("; ");

      for (const cookie of cookies) {
        if (!cookie) continue;

        const separatorIndex = cookie.indexOf("=");
        const cookieName = separatorIndex === -1 ? cookie : cookie.slice(0, separatorIndex);
        const cookieValue = separatorIndex === -1 ? "" : cookie.slice(separatorIndex + 1);

        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }

      return null;
    };

    const storedTheme =
      sessionStorage.getItem("theme") ||
      localStorage.getItem("theme") ||
      readCookie("theme");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme ? storedTheme === "dark" : systemDark;

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  } catch {}
})();
`;

export function getInitialThemeFromCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>
): "light" | "dark" | null {
  const theme = cookieStore.get("theme")?.value;

  if (theme === "light" || theme === "dark") {
    return theme;
  }

  return null;
}

export function getInitialLocaleFromCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Locale {
  const locale = cookieStore.get("locale")?.value;

  if (locale === "ru" || locale === "en") {
    return locale;
  }

  return DEFAULT_LOCALE;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const initialLocale = getInitialLocaleFromCookie(cookieStore);
  const initialTheme = getInitialThemeFromCookie(cookieStore);

  return (
    <html
      lang={initialLocale}
      className={`${inter.variable}${initialTheme === "dark" ? " dark" : ""}`}
      style={{ colorScheme: initialTheme === "dark" ? "dark" : "light" }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <LanguageScript initialLocale={initialLocale} />
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}