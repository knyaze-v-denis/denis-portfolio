import type { MetadataRoute } from "next";

const SITE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/projects/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/projects/fitness-app`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/projects/analytics-dashboard`,
      lastModified: new Date(),
    },
  ];
}