import { defineField, defineType } from "sanity";

export const blockTitleType = defineType({
  name: "blockTitle",
  title: "Заголовок блока",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "* Текст заголовка",
      description: "Крупный заголовок секции. Используется внутри кейсов проекта.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните текст заголовка"),
    }),
  ],
  preview: {
    select: {
      titleEn: "text.en",
      titleRu: "text.ru",
    },
    prepare({ titleEn, titleRu }) {
      return {
        title: titleEn || titleRu || "Без названия",
        subtitle: "Заголовок блока",
      };
    },
  },
});