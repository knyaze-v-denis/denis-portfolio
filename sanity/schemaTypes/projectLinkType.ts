import { defineField, defineType } from "sanity";

export const projectLinkType = defineType({
  name: "projectLink",
  title: "Ссылка проекта",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "* Подпись",
      description: "Текст кнопки или ссылки (например: GitHub, Live, Case study).",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните подпись ссылки"),
    }),
    defineField({
      name: "href",
      title: "* Ссылка",
      description: "Укажите URL (https://…) или mailto:/tel: при необходимости.",
      type: "url",
      validation: (Rule) => Rule.required().error("Укажите ссылку"),
    }),
  ],
  preview: {
    select: {
      labelEn: "label.en",
      labelRu: "label.ru",
      subtitle: "href",
    },
    prepare({ labelEn, labelRu, subtitle }) {
      return {
        title: labelEn || labelRu || "Ссылка",
        subtitle,
      };
    },
  },
});