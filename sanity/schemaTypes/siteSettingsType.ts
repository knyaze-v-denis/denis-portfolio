import { defineField, defineType } from "sanity";

function validateHref(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value !== "string") {
    return "Ссылка должна быть строкой";
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

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fieldsets: [
    { name: "general", title: "Общее", options: { collapsible: false } },
    { name: "identity", title: "Идентичность", options: { collapsible: false } },
    { name: "seo", title: "SEO", options: { collapsible: false } },
    { name: "contacts", title: "Блок контактов", options: { collapsible: false } },
    { name: "notFound", title: "Страница 404", options: { collapsible: false } },
    { name: "footer", title: "Подвал", options: { collapsible: false } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "* Внутреннее название",
      description: "Служебное поле только для Studio. На сайте не отображается.",
      type: "string",
      initialValue: "Настройки сайта",
      validation: (Rule) => Rule.required().error("Укажите внутреннее название"),
      fieldset: "general",
    }),

    defineField({
      name: "personName",
      title: "* Имя",
      description: "Используется в шапке сайта, OG-изображениях и других глобальных местах.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните имя"),
      fieldset: "identity",
    }),
    defineField({
      name: "personRole",
      title: "* Должность / роль",
      description: "Используется в шапке сайта, hero-блоке и OG-изображениях.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните роль"),
      fieldset: "identity",
    }),
    defineField({
      name: "personPhoto",
      title: "* Фото",
      description: "Основное фото для шапки сайта и OG-изображений.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Добавьте фото"),
      fieldset: "identity",
    }),

    defineField({
      name: "seoTitle",
      title: "* SEO-заголовок по умолчанию",
      description:
        "Фолбэк для title страницы и превью ссылки. Желательно до 60 символов.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните SEO-заголовок"),
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "* SEO-описание по умолчанию",
      description:
        "Фолбэк для meta description и превью ссылки. Желательно до 150–160 символов.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните SEO-описание"),
      fieldset: "seo",
    }),
    defineField({
      name: "contactsTitle",
      title: "* Заголовок блока контактов",
      description: "Используется в глобальном блоке контактов на сайте.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните заголовок блока контактов"),
      fieldset: "contacts",
    }),
    defineField({
      name: "contactsButtons",
      title: "Кнопки блока контактов",
      description: "Глобальные кнопки для блока контактов, который используется на сайте.",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      fieldset: "contacts",
    }),

    defineField({
      name: "notFoundTitle",
      title: "* Заголовок 404",
      description: "Основной заголовок блока сообщения об ошибке на странице 404.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните заголовок 404"),
      fieldset: "notFound",
    }),
    defineField({
      name: "notFoundMessage",
      title: "* Сообщение 404",
      description: "Текст под заголовком в блоке сообщения об ошибке на странице 404.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните сообщение 404"),
      fieldset: "notFound",
    }),
    defineField({
      name: "notFoundButtonLabel",
      title: "* Подпись кнопки 404",
      description: "Текст кнопки возврата на главную страницу в блоке 404.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните подпись кнопки 404"),
      fieldset: "notFound",
    }),
    defineField({
      name: "notFoundProjectsTitle",
      title: "* Заголовок группы проектов на 404",
      description: "Заголовок блока рекомендаций с проектами на странице 404.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните заголовок группы проектов на 404"),
      fieldset: "notFound",
    }),
    defineField({
      name: "notFoundExperimentsTitle",
      title: "Заголовок группы experiments на 404",
      description: "Пока не используется на сайте, но подготовлен для будущего блока Experiments на странице 404.",
      type: "localizedString",
      fieldset: "notFound",
    }),

    defineField({
      name: "showFooterAside",
      title: "Показывать правый блок в подвале",
      description: "Включает или скрывает дополнительный блок справа в footer.",
      type: "boolean",
      initialValue: true,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideText",
      title: "Текст правого блока",
      description: "Основной текст дополнительного блока в footer.",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideLinkLabel",
      title: "Подпись ссылки правого блока",
      description: "Текст ссылки в дополнительном блоке footer.",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideLinkHref",
      title: "Цель ссылки правого блока",
      description: "Можно использовать внешнюю ссылку, mailto:, tel:, якорь или внутренний путь.",
      type: "string",
      validation: (Rule) => Rule.custom(validateHref),
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
  ],
  preview: {
    select: {
      title: "title",
      personNameRu: "personName.ru",
      personNameEn: "personName.en",
      media: "personPhoto",
    },
    prepare({ title, personNameRu, personNameEn, media }) {
      return {
        title: title || "Настройки сайта",
        subtitle: personNameRu || personNameEn || "",
        media,
      };
    },
  },
});