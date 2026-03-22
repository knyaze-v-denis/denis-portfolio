import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Проект",
  type: "document",
  fieldsets: [
    {
      name: "general",
      title: "Общее",
      options: { collapsible: false },
    },
    {
      name: "hero",
      title: "Hero и карточка",
      options: { collapsible: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: false },
    },
    {
      name: "meta",
      title: "Метаданные проекта",
      options: { collapsible: false },
    },
    {
      name: "links",
      title: "Ссылки",
      options: { collapsible: false },
    },
    {
      name: "content",
      title: "Секции контента",
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "* Название проекта",
      description: "Основное название проекта. Используется на странице и в превью.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите название проекта"),
      fieldset: "general",
    }),
    defineField({
      name: "slug",
      title: "* Slug",
      description: "Используется в URL страницы проекта.",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Укажите slug"),
      fieldset: "general",
    }),
    defineField({
      name: "coverImage",
      title: "* Обложка",
      description: "Используется в карточке проекта и OG-изображениях.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Добавьте обложку"),
      fieldset: "hero",
    }),
    defineField({
      name: "shortDescription",
      title: "* Краткое описание",
      description: "Показывается в карточке проекта на главной странице.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните краткое описание"),
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "* Описание в hero",
      description: "Показывается в первом экране страницы проекта.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните описание hero"),
      fieldset: "hero",
    }),
    defineField({
      name: "seoTitle",
      title: "* SEO-заголовок",
      description: "Используется в title страницы и в превью ссылки. Желательно до 60 символов.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните SEO-заголовок"),
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "* SEO-описание",
      description:
        "Используется в meta description и в превью ссылки. Желательно до 150–160 символов.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните SEO-описание"),
      fieldset: "seo",
    }),
    defineField({
      name: "tags",
      title: "Теги",
      description: "Используются в карточке проекта на главной",
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
      title: "Клиент",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "domain",
      title: "Домен",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "timeline",
      title: "Сроки",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "role",
      title: "Роль",
      type: "localizedString",
      fieldset: "meta",
    }),
    defineField({
      name: "links",
      title: "Ссылки",
      type: "array",
      of: [{ type: "projectLink" }],
      fieldset: "links",
    }),
    defineField({
      name: "sections",
      title: "Секции",
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
      const title = titleEn || titleRu || "Без названия";

      const localeStatus = [
        titleRu ? "RU" : "RU отсутствует",
        titleEn ? "EN" : "EN отсутствует",
      ].join(" · ");

      const seoReady =
        (seoTitleRu || seoTitleEn) && (seoDescriptionRu || seoDescriptionEn);

      const statusParts = [
        slug ? slug : "Без slug",
        seoReady ? "SEO готово" : "SEO не заполнено",
        `${links?.length || 0} ссылок`,
        `${sections?.length || 0} секций`,
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