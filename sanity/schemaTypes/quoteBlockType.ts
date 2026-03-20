import { defineField, defineType } from "sanity";

export const quoteBlockType = defineType({
  name: "quoteBlock",
  title: "Quote block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "text",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Quote block",
        subtitle: subtitle || "Quote block",
      };
    },
  },
});