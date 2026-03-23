import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { sitemapProjectsQuery } from "@/sanity/lib/queries";

const baseUrl = "https://www.knyaze-v-denis.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch(sitemapProjectsQuery);

  const staticPages = [
    {
      url: `${baseUrl}/ru`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
  ];

  const projectPages = (projects || []).flatMap((project: { slug: string; _updatedAt: string }) => [
    {
      url: `${baseUrl}/ru/projects/${project.slug}`,
      lastModified: new Date(project._updatedAt),
    },
    {
      url: `${baseUrl}/en/projects/${project.slug}`,
      lastModified: new Date(project._updatedAt),
    },
  ]);

  return [...staticPages, ...projectPages];
}