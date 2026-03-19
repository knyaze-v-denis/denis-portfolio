export default function LanguageScript() {
  const script = `
    (() => {
      try {
        const storedLocale = sessionStorage.getItem("locale");
        const browserLanguage = navigator.language.toLowerCase();
        const locale =
          storedLocale === "ru" || storedLocale === "en"
            ? storedLocale
            : browserLanguage.startsWith("ru")
              ? "ru"
              : "en";

        document.documentElement.setAttribute("lang", locale);
      } catch {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}