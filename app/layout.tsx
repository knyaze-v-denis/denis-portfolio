import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import LanguageScript from "@/components/i18n/LanguageScript";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LanguageScript />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}