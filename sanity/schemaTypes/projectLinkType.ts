import { defineField, defineType } from "sanity";

export const projectLinkType = defineType({
  name: "projectLink",
  title: "Project link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});