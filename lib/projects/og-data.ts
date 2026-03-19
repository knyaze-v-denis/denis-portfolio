export type OgProjectData = {
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
};

export function getProjectOgData(slug: string): OgProjectData {
  switch (slug) {
    case "fitness-app":
      return {
        eyebrow: "Case study",
        title: "Fitness App Concept",
        subtitle:
          "A concept for a fitness ecosystem combining tracking, nutrition and social features.",
        image: "/images/project-cover.png",
      };

    case "analytics-dashboard":
      return {
        eyebrow: "Case study",
        title: "Analytics Dashboard",
        subtitle:
          "A modular dashboard concept for product teams and key metrics.",
        image: "/images/project-cover.png",
      };

    case "portfolio":
    default:
      return {
        eyebrow: "Case study",
        title: "Portfolio Website",
        subtitle:
          "Design and development of a personal portfolio website.",
        image: "/images/project-cover.png",
      };
  }
}

export function getSiteOgData() {
  return {
    eyebrow: "Portfolio",
    title: "Denis Knyazev",
    subtitle: "Product designer focused on UX, UI and product systems.",
    image: "/images/profile-photo.png",
  };
}