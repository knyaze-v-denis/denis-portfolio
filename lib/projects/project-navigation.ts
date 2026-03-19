import type { Messages } from "@/lib/i18n/types";
import type { DemoProjectSlug } from "@/lib/projects/demo-project";

export type ProjectNavigationItem = {
  slug: DemoProjectSlug;
  title: string;
};

export type ProjectNavigationData = {
  previous: ProjectNavigationItem | null;
  next: ProjectNavigationItem | null;
};

export function getProjectNavigationData(
  slug: DemoProjectSlug,
  t: Messages
): ProjectNavigationData {
  const items: ProjectNavigationItem[] = [
    {
      slug: "portfolio",
      title: t.projectPage.portfolio.title,
    },
    {
      slug: "fitness-app",
      title: t.projectPage.fitnessApp?.title ?? "Fitness App Concept",
    },
    {
      slug: "analytics-dashboard",
      title:
        t.projectPage.analyticsDashboard?.title ?? "Analytics Dashboard",
    },
  ];

  const currentIndex = items.findIndex((item) => item.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex < items.length - 1 ? items[currentIndex + 1] : null,
  };
}