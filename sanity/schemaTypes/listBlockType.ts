import { defineField, defineType } from "sanity";

export const listBlockType = defineType({
  name: "listBlock",
  title: "List block",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: items?.[0] || "Untitled list",
        subtitle: `List block · ${items?.length || 0} item(s)`,
      };
    },
  },
});