import type { Messages } from "@/lib/i18n/types";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";

export type DemoProjectSlug =
  | "portfolio"
  | "fitness-app"
  | "analytics-dashboard";

export const getDemoProjectHero = (
  slug: DemoProjectSlug,
  t: Messages
): ProjectHeroProps => {
  switch (slug) {
    case "fitness-app":
      return {
        title: t.projectPage.fitnessApp?.title ?? "Fitness App Concept",
        cover: "/images/project-cover.png",
        description:
          t.projectPage.fitnessApp?.description ??
          "A concept of a fitness ecosystem that combines workout tracking, nutrition and social mechanics in one product.",
        fields: [
          {
            key: "client",
            value: t.projectPage.fitnessApp?.fields.client ?? "Concept project",
          },
          {
            key: "domain",
            value:
              t.projectPage.fitnessApp?.fields.domain ??
              "Fitness, Product Design",
          },
          {
            key: "timeline",
            value:
              t.projectPage.fitnessApp?.fields.timeline ??
              "Feb 2026 — Mar 2026",
          },
          {
            key: "role",
            value:
              t.projectPage.fitnessApp?.fields.role ??
              "UX/UI Designer, Product Designer",
          },
          {
            key: "links",
            links: [
              {
                label:
                  t.projectPage.fitnessApp?.links.prototype ?? "Prototype",
                href: "#",
              },
              {
                label: t.projectPage.fitnessApp?.links.behance ?? "Behance",
                href: "#",
              },
            ],
          },
        ],
      };

    case "analytics-dashboard":
      return {
        title:
          t.projectPage.analyticsDashboard?.title ?? "Analytics Dashboard",
        cover: "/images/project-cover.png",
        description:
          t.projectPage.analyticsDashboard?.description ??
          "A concept of a modular analytics dashboard for product teams that helps track key metrics and build custom data views.",
        fields: [
          {
            key: "client",
            value:
              t.projectPage.analyticsDashboard?.fields.client ??
              "Internal product",
          },
          {
            key: "domain",
            value:
              t.projectPage.analyticsDashboard?.fields.domain ??
              "Analytics, B2B, Product Design",
          },
          {
            key: "timeline",
            value:
              t.projectPage.analyticsDashboard?.fields.timeline ??
              "Jan 2026 — Mar 2026",
          },
          {
            key: "role",
            value:
              t.projectPage.analyticsDashboard?.fields.role ??
              "Product Designer",
          },
          {
            key: "links",
            links: [
              {
                label:
                  t.projectPage.analyticsDashboard?.links.prototype ??
                  "Prototype",
                href: "#",
              },
              {
                label:
                  t.projectPage.analyticsDashboard?.links.github ?? "GitHub",
                href: "#",
              },
            ],
          },
        ],
      };

    case "portfolio":
    default:
      return {
        title: t.projectPage.portfolio.title,
        cover: "/images/project-cover.png",
        description: t.projectPage.portfolio.description,
        fields: [
          {
            key: "client",
            value: t.projectPage.portfolio.fields.client,
          },
          {
            key: "domain",
            value: t.projectPage.portfolio.fields.domain,
          },
          {
            key: "timeline",
            value: t.projectPage.portfolio.fields.timeline,
          },
          {
            key: "role",
            value: t.projectPage.portfolio.fields.role,
          },
          {
            key: "links",
            links: [
              {
                label: t.projectPage.portfolio.links.github,
                href: "#",
              },
              {
                label: t.projectPage.portfolio.links.live,
                href: "#",
              },
            ],
          },
        ],
      };
  }
};