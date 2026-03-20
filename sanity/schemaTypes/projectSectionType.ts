import { defineField, defineType } from "sanity";

export const projectSectionType = defineType({
  name: "projectSection",
  title: "Project section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        { type: "blockTitle" },
        { type: "textBlock" },
        { type: "listBlock" },
        { type: "imageBlock" },
        { type: "quoteBlock" },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      blocks: "blocks",
    },
    prepare({ title, blocks }) {
      return {
        title: title || "Untitled section",
        subtitle: `Section · ${blocks?.length || 0} block(s)`,
      };
    },
  },
});