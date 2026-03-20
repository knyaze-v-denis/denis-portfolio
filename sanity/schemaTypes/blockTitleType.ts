import { defineField, defineType } from "sanity";

export const blockTitleType = defineType({
  name: "blockTitle",
  title: "Block title",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled block title",
        subtitle: "Block title",
      };
    },
  },
});