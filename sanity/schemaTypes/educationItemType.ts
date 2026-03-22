import { defineField, defineType } from "sanity";

const educationTypes = [
  { title: "Неоконченное высшее", value: "incomplete-higher" },
  { title: "Высшее образование", value: "higher" },
  { title: "Повышение квалификации", value: "professional-development" },
  { title: "Курс", value: "course" },
  { title: "Среднее профессиональное", value: "secondary-vocational" },
  { title: "Свой вариант", value: "custom" },
];

function getEducationTypeLabel(
  type?: string,
  customTypeLabel?: string
) {
  if (type === "custom") {
    return customTypeLabel || "Свой вариант";
  }

  return (
    educationTypes.find((item) => item.value === type)?.title ?? ""
  );
}

export const educationItemType = defineType({
  name: "educationItem",
  title: "Элемент образования",
  type: "object",
  fields: [
    defineField({
      name: "institution",
      title: "* Учебное заведение",
      description: "Название университета или учебного заведения.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите учебное заведение"),
    }),
    defineField({
      name: "program",
      title: "* Программа / направление",
      description: "Например: UX/UI дизайн, Информатика и т.д.",
      type: "localizedString",
      validation: (Rule) => Rule.required().error("Укажите программу"),
    }),
    defineField({
      name: "educationType",
      title: "Тип образования",
      description: "Выберите тип или укажите свой вариант ниже.",
      type: "string",
      options: {
        list: educationTypes,
      },
    }),
    defineField({
      name: "customEducationType",
      title: "Свой тип образования",
      description: 'Отображается, если выбран вариант "Свой вариант" выше',
      type: "localizedString",
      hidden: ({ parent }) => parent?.educationType !== "custom",
    }),
    defineField({
      name: "period",
      title: "Период",
      description: "Например: 2020 — 2024",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      institutionEn: "institution.en",
      institutionRu: "institution.ru",
      programEn: "program.en",
      programRu: "program.ru",
      educationType: "educationType",
      customTypeEn: "customEducationType.en",
      customTypeRu: "customEducationType.ru",
      periodEn: "period.en",
      periodRu: "period.ru",
    },
    prepare({
      institutionEn,
      institutionRu,
      programEn,
      programRu,
      educationType,
      customTypeEn,
      customTypeRu,
      periodEn,
      periodRu,
    }) {
      const institution = institutionEn || institutionRu;
      const program = programEn || programRu;
      const period = periodEn || periodRu;
      const customType = customTypeEn || customTypeRu;

      const typeLabel = getEducationTypeLabel(
        educationType,
        customType
      );

      return {
        title: institution || "Без названия",
        subtitle: [program, typeLabel, period]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});