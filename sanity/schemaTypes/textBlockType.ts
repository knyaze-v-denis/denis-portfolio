import { defineField, defineType } from "sanity";

export const textBlockType = defineType({
  name: "textBlock",
  title: "Текстовый блок",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "* Текст",
      description: "Основной текстовый контент секции.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните текст"),
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
        subtitle: "Текстовый блок",
      };
    },
  },
});