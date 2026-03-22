import { defineField, defineType } from "sanity";

export const listBlockType = defineType({
  name: "listBlock",
  title: "Список",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "* Элементы списка",
      description: "Список пунктов. Используется для перечислений внутри секции.",
      type: "object",
      fields: [
        {
          name: "ru",
          title: "RU",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "EN",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      validation: (Rule) =>
        Rule.required().error("Добавьте хотя бы один пункт списка"),
    }),
  ],
  preview: {
    select: {
      itemsEn: "items.en",
      itemsRu: "items.ru",
    },
    prepare({ itemsEn, itemsRu }) {
      const items = itemsEn || itemsRu || [];
      return {
        title: items?.[0] || "Без названия",
        subtitle: `Список · ${items?.length || 0} пунктов`,
      };
    },
  },
});