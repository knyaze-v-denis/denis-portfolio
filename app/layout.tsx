import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import LanguageScript from "@/components/i18n/LanguageScript";
import type { Locale } from "@/lib/i18n/types";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Denis Knyazev — Product Designer",
    template: "%s — Denis Knyazev",
  },

  description:
    "Portfolio of Denis Knyazev — product designer focused on UX, UI and product systems.",

  keywords: [
    "product designer",
    "ux designer",
    "ui designer",
    "portfolio",
    "design systems",
    "ux case studies",
  ],

  authors: [
    {
      name: "Denis Knyazev",
      url: SITE_URL,
    },
  ],

  creator: "Denis Knyazev",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Denis Knyazev — Product Designer",
    description:
      "Portfolio of Denis Knyazev — product designer focused on UX, UI and product systems.",
    siteName: "Denis Knyazev",
    images: [
      {
        url: "/og/site-og.jpg",
        width: 1200,
        height: 630,
        alt: "Denis Knyazev portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Denis Knyazev — Product Designer",
    description:
      "Portfolio of Denis Knyazev — product designer focused on UX, UI and product systems.",
    images: ["/og/site-og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

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

  return "en";
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