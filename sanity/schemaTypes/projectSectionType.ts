import { defineField, defineType } from "sanity";

export const projectSectionType = defineType({
  name: "projectSection",
  title: "Секция проекта",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "* Заголовок секции",
      description: "Основной заголовок секции на странице проекта.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите заголовок секции"),
    }),
    defineField({
      name: "blocks",
      title: "* Блоки секции",
      description:
        "Добавьте контентные блоки, из которых будет собрана секция проекта.",
      type: "array",
      of: [
        { type: "blockTitle" },
        { type: "textBlock" },
        { type: "listBlock" },
        { type: "imageBlock" },
        { type: "quoteBlock" },
      ],
      validation: (Rule) =>
        Rule.required()
          .error("Добавьте блоки секции")
          .min(1)
          .error("Секция должна содержать хотя бы один блок"),
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      blocks: "blocks",
    },
    prepare({ titleEn, titleRu, blocks }) {
      return {
        title: titleEn || titleRu || "Без названия",
        subtitle: `Секция · ${blocks?.length || 0} блок(ов)`,
      };
    },
  },
});