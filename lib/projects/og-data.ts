export type OgProjectData = {
  title: string;
  subtitle: string;
  eyebrow: string;
};

export function getProjectOgData(slug: string): OgProjectData {
  switch (slug) {
    case "fitness-app":
      return {
        eyebrow: "Case study",
        title: "Fitness App Concept",
        subtitle:
          "A concept for a fitness ecosystem combining tracking, nutrition and social features.",
      };

    case "analytics-dashboard":
      return {
        eyebrow: "Case study",
        title: "Analytics Dashboard",
        subtitle:
          "A modular dashboard concept for product teams and key metrics.",
      };

    case "portfolio":
    default:
      return {
        eyebrow: "Case study",
        title: "Portfolio Website",
        subtitle:
          "Design and development of a personal portfolio website.",
      };
  }
}

export function getSiteOgData() {
  return {
    eyebrow: "Portfolio",
    title: "Denis Knyazev",
    subtitle: "Product designer focused on UX, UI and product systems.",
  };
}