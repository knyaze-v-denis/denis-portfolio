import { defineField, defineType } from "sanity";

export const quoteBlockType = defineType({
  name: "quoteBlock",
  title: "Цитата",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      description: "Необязательный заголовок цитаты (например, источник или автор).",
      type: "localizedString",
    }),
    defineField({
      name: "text",
      title: "* Текст цитаты",
      description: "Основной текст цитаты.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните текст цитаты"),
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      textEn: "text.en",
      textRu: "text.ru",
    },
    prepare({ titleEn, titleRu, textEn, textRu }) {
      const title = titleEn || titleRu || "Цитата";
      const subtitle = textEn || textRu || "Без текста";
      return {
        title,
        subtitle,
      };
    },
  },
});