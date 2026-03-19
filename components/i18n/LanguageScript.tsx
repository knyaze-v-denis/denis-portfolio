import type { Locale } from "@/lib/i18n/types";

type LanguageScriptProps = {
  initialLocale: Locale;
};

export default function LanguageScript({
  initialLocale,
}: LanguageScriptProps) {
  const script = `
    (() => {
      try {
        const storedLocale = sessionStorage.getItem("locale");
        const locale =
          storedLocale === "ru" || storedLocale === "en"
            ? storedLocale
            : "${initialLocale}";

        document.documentElement.setAttribute("lang", locale);
      } catch {
        document.documentElement.setAttribute("lang", "${initialLocale}");
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}