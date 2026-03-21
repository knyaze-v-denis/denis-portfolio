import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "general",
      title: "General",
      options: { collapsible: false },
    },
    {
      name: "hero",
      title: "Hero and card content",
      options: { collapsible: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: false },
    },
    {
      name: "meta",
      title: "Project meta",
      options: { collapsible: false },
    },
    {
      name: "links",
      title: "Links",
      options: { collapsible: false },
    },
    {
      name: "content",
      title: "Content sections",
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "general",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      fieldset: "general",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Used in the project card on the homepage",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      description: "Used in the hero section on the project page",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),
    defineField({
      name: "seoTitle",
      title: "* SEO title",
      description:
        "Used for the project page title tag and social preview title.",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "* SEO description",
      description:
        "Used for the project page meta description and social preview description.",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Used in the project card on the homepage",
      type: "object",
      fields: [
        {
          name: "ru",
          title: "RU",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "EN",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      fieldset: "meta",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "projectLink" }],
      fieldset: "links",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "projectSection" }],
      fieldset: "content",
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      slug: "slug.current",
      media: "coverImage",
      seoTitleEn: "seoTitle.en",
      seoTitleRu: "seoTitle.ru",
      seoDescriptionEn: "seoDescription.en",
      seoDescriptionRu: "seoDescription.ru",
      links: "links",
      sections: "sections",
    },
    prepare({
      titleEn,
      titleRu,
      slug,
      media,
      seoTitleEn,
      seoTitleRu,
      seoDescriptionEn,
      seoDescriptionRu,
      links,
      sections,
    }) {
      const title = titleEn || titleRu || "Untitled project";

      const localeStatus = [
        titleRu ? "RU" : "RU missing",
        titleEn ? "EN" : "EN missing",
      ].join(" · ");

      const seoReady =
        (seoTitleRu || seoTitleEn) && (seoDescriptionRu || seoDescriptionEn);

      const statusParts = [
        slug ? slug : "No slug",
        seoReady ? "SEO ready" : "SEO incomplete",
        `${links?.length || 0} link(s)`,
        `${sections?.length || 0} section(s)`,
        localeStatus,
      ];

      return {
        title,
        subtitle: statusParts.join(" · "),
        media,
      };
    },
  },
});