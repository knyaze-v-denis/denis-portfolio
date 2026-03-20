import { defineField, defineType } from "sanity";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Image block",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image block",
        subtitle: "Image block",
        media,
      };
    },
  },
});