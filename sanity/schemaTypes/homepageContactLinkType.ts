import { defineField, defineType } from "sanity";

function validateHref(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Ссылка обязательна";
  }

  const normalized = value.trim();

  const isAllowed =
    normalized.startsWith("https://") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("#");

  return isAllowed
    ? true
    : 'Используйте https://, http://, mailto:, tel:, "/" или "#"';
}

export const homepageContactLinkType = defineType({
  name: "homepageContactLink",
  title: "Ссылка контактов",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "* Подпись",
      description: "Текст кнопки или ссылки (например: Telegram, Email, LinkedIn).",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните подпись"),
    }),
    defineField({
      name: "href",
      title: "* Ссылка",
      description:
        'Можно использовать https://, http://, mailto:, tel:, "/" или "#"',
      type: "string",
      validation: (Rule) => Rule.required().error("Укажите ссылку").custom(validateHref),
    }),
    defineField({
      name: "variant",
      title: "Тип кнопки",
      description:
        "Используется в блоке контактов. В hero-блоке можно игнорировать.",
      type: "string",
      options: {
        list: [
          { title: "Основная", value: "primary" },
          { title: "Вторичная", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "secondary",
    }),
  ],
  preview: {
    select: {
      titleEn: "label.en",
      titleRu: "label.ru",
      subtitle: "href",
    },
    prepare({ titleEn, titleRu, subtitle }) {
      return {
        title: titleEn || titleRu || "Ссылка",
        subtitle,
      };
    },
  },
});