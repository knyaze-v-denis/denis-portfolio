import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import LanguageScript from "@/components/i18n/LanguageScript";
import type { Locale } from "@/lib/i18n/types";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denis Portfolio",
  description: "Personal portfolio website",
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

function getInitialLocaleFromCookie(cookieStore: Awaited<ReturnType<typeof cookies>>): Locale {
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