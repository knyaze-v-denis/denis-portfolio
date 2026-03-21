import type { Metadata } from "next";
import { cookies } from "next/headers";
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

const SITE_URL = "https://www.knyaze-v-denis.ru";

function getOpenGraphLocale(locale: Locale) {
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
      canonical: SITE_URL,
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

  const initialLocale = getInitialLocaleFromCookie(cookieStore);

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