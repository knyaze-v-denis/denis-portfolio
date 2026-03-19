import { MetadataRoute } from "next";

const baseUrl = "https://denis-portfolio-eight.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects/fitness-app`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects/analytics-dashboard`,
      lastModified: new Date(),
    },
  ];
}