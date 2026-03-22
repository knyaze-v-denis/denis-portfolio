import { defineField, defineType } from "sanity";

export const workExperienceType = defineType({
  name: "workExperience",
  title: "Опыт работы",
  type: "object",
  fields: [
    defineField({
      name: "company",
      title: "* Компания",
      description: "Название компании или организации.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите компанию"),
    }),
    defineField({
      name: "position",
      title: "* Должность",
      description: "Например: Product Designer, UX/UI Designer и т.д.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите должность"),
    }),
    defineField({
      name: "period",
      title: "* Период",
      description: "Например: 2022 — настоящее время",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите период работы"),
    }),
  ],
  preview: {
    select: {
      companyEn: "company.en",
      companyRu: "company.ru",
      positionEn: "position.en",
      positionRu: "position.ru",
      periodEn: "period.en",
      periodRu: "period.ru",
    },
    prepare({
      companyEn,
      companyRu,
      positionEn,
      positionRu,
      periodEn,
      periodRu,
    }) {
      const company = companyEn || companyRu;
      const position = positionEn || positionRu;
      const period = periodEn || periodRu;

      return {
        title: company || "Без названия",
        subtitle: [position, period].filter(Boolean).join(" · "),
      };
    },
  },
});