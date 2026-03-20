import { defineField, defineType } from "sanity";

export const workExperienceType = defineType({
  name: "workExperience",
  title: "Work experience",
  type: "object",
  fields: [
    defineField({
      name: "company",
      title: "* Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "* Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "* Period",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "position",
      period: "period",
    },
    prepare({ title, subtitle, period }) {
      return {
        title: title || "Untitled company",
        subtitle: [subtitle, period].filter(Boolean).join(" · "),
      };
    },
  },
});