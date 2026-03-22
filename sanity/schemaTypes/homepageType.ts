import { defineArrayMember, defineField, defineType } from "sanity";

const middleSectionOptions = [
  { title: "Навыки", value: "skills" },
  { title: "Проекты", value: "projects" },
  { title: "Опыт работы", value: "workExperience" },
  { title: "Образование", value: "education" },
];

function validateMiddleSections(value: unknown) {
  if (!Array.isArray(value)) {
    return "Необходимо указать порядок секций";
  }

  const values = value
    .filter((item): item is string => typeof item === "string")
    .filter(Boolean);

  const required = [
    "skills",
    "projects",
    "workExperience",
    "education",
  ];

  const missing = required.filter((item) => !values.includes(item));
  if (missing.length > 0) {
    return `Не хватает секций: ${missing.join(", ")}`;
  }

  const duplicates = values.filter(
    (item, index) => values.indexOf(item) !== index
  );
  if (duplicates.length > 0) {
    return `Повторяющиеся секции недопустимы: ${duplicates.join(", ")}`;
  }

  return true;
}

export const homepageType = defineType({
  name: "homepage",
  title: "Главная страница",
  type: "document",
  fieldsets: [
    {
      name: "general",
      title: "Общее",
      options: { collapsible: false },
    },
    {
      name: "hero",
      title: "Hero-блок",
      options: { collapsible: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: false },
    },
    {
      name: "skills",
      title: "Секция навыков",
      options: { collapsible: false },
    },
    {
      name: "workExperience",
      title: "Секция опыта работы",
      options: { collapsible: false },
    },
    {
      name: "education",
      title: "Секция образования",
      options: { collapsible: false },
    },
    {
      name: "projects",
      title: "Секция проектов",
      options: { collapsible: false },
    },
    {
      name: "layout",
      title: "Структура и порядок",
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "* Внутреннее название",
      description: "Служебное поле только для Studio. На сайте не отображается.",
      type: "string",
      initialValue: "Главная страница",
      validation: (Rule) => Rule.required().error("Укажите внутреннее название"),
      fieldset: "general",
    }),

    defineField({
      name: "heroAbout",
      title: "* Текст о себе",
      description: "Используется в hero-блоке главной страницы.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните текст о себе"),
      fieldset: "hero",
    }),

    defineField({
      name: "heroContacts",
      title: "Контакты в hero-блоке",
      description: "Используются только в первом экране главной страницы.",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      fieldset: "hero",
    }),

    defineField({
      name: "seoTitle",
      title: "* SEO-заголовок",
      description: "Используется в title главной страницы и в превью ссылки. Желательно до 60 символов.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Заполните SEO-заголовок"),
      fieldset: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "* SEO-описание",
      description:
        "Используется в meta description главной страницы и в превью ссылки. Желательно до 150–160 символов.",
      type: "localizedText",
      validation: (Rule) => Rule.required().error("Заполните SEO-описание"),
      fieldset: "seo",
    }),

    defineField({
      name: "skillGroups",
      title: "Группы навыков",
      description:
        "Группы с пустым списком навыков не будут показаны на сайте.",
      type: "array",
      of: [{ type: "skillGroup" }],
      fieldset: "skills",
    }),

    defineField({
      name: "workExperienceItems",
      title: "Элементы опыта работы",
      description: "Используются в секции опыта работы на главной странице.",
      type: "array",
      of: [{ type: "workExperience" }],
      fieldset: "workExperience",
    }),

    defineField({
      name: "educationItems",
      title: "Элементы образования",
      description: "Используются в секции образования на главной странице.",
      type: "array",
      of: [{ type: "educationItem" }],
      fieldset: "education",
    }),


    defineField({
      name: "middleSectionsOrder",
      title: "* Порядок секций в середине страницы",
      description:
        "Hero всегда идет первым, а блок контактов — последним. Здесь можно менять только порядок средних секций.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: middleSectionOptions,
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .error("Укажите порядок секций")
          .custom(validateMiddleSections),
      initialValue: [
        "skills",
        "projects",
        "workExperience",
        "education",
      ],
      fieldset: "layout",
    }),

    defineField({
      name: "homepageProjects",
      title: "Проекты на главной",
      description:
        "Добавьте проекты сюда, чтобы управлять тем, какие проекты показываются на главной странице и в каком порядке.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      fieldset: "projects",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});