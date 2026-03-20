import { defineField, defineType } from "sanity";

export const textBlockType = defineType({
  name: "textBlock",
  title: "Text block",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled text block",
        subtitle: "Text block",
      };
    },
  },
});