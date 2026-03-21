import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
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

const SITE_URL = "https://denis-portfolio-eight.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const settingsDoc = await client.fetch(siteSettingsQuery);
  const cookieStore = await cookies();
  const headersStore = await headers();

  const localeFromCookie = getInitialLocaleFromCookie(cookieStore);
  const locale = cookieStore.get("locale")?.value
    ? localeFromCookie
    : getInitialLocaleFromHeaders(headersStore);

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

    openGraph: {
      type: "website",
      locale: "en_US",
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
  };
}

const themeInitScript = `
(() => {
  try {
    const storedTheme = sessionStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme ? storedTheme === "dark" : systemDark;
    document.documentElement.classList.toggle("dark", isDark);
  } catch {}
})();
`;

function getInitialLocaleFromHeaders(
  headersStore: Awaited<ReturnType<typeof headers>>
): Locale {
  const acceptLanguage = headersStore.get("accept-language")?.toLowerCase() || "";

  if (acceptLanguage.includes("ru")) {
    return "ru";
  }

  if (acceptLanguage.includes("en")) {
    return "en";
  }

  return "ru";
}

function getInitialLocaleFromCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Locale {
  const locale = cookieStore.get("locale")?.value;

  if (locale === "ru" || locale === "en") {
    return locale;
  }

  return "ru";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersStore = await headers();

  const localeFromCookie = getInitialLocaleFromCookie(cookieStore);
  const initialLocale = cookieStore.get("locale")?.value
    ? localeFromCookie
    : getInitialLocaleFromHeaders(headersStore);

  return (
    <html
      lang={initialLocale}
      className={inter.variable}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LanguageScript initialLocale={initialLocale} />
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}