import { defineField, defineType } from "sanity";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Изображение",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "* Изображение",
      description: "Основное изображение для секции.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Добавьте изображение"),
    }),
    defineField({
      name: "alt",
      title: "* Alt-текст",
      description: "Краткое описание изображения для доступности и SEO.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните alt-текст"),
    }),
    defineField({
      name: "caption",
      title: "Подпись",
      description: "Необязательная подпись под изображением.",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      captionEn: "caption.en",
      captionRu: "caption.ru",
      media: "image",
    },
    prepare({ captionEn, captionRu, media }) {
      return {
        title: captionEn || captionRu || "Изображение",
        subtitle: "Блок изображения",
        media,
      };
    },
  },
});