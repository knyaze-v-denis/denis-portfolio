import { defineField, defineType } from "sanity";

const educationTypes = [
  { title: "Incomplete higher education", value: "incomplete-higher" },
  { title: "Higher education", value: "higher" },
  { title: "Professional development", value: "professional-development" },
  { title: "Course", value: "course" },
  { title: "Secondary vocational education", value: "secondary-vocational" },
  { title: "Custom", value: "custom" },
];

function getEducationTypeLabel(
  type?: string,
  customTypeLabel?: string
) {
  if (type === "custom") {
    return customTypeLabel || "Custom";
  }

  return (
    educationTypes.find((item) => item.value === type)?.title ?? ""
  );
}

export const educationItemType = defineType({
  name: "educationItem",
  title: "Education item",
  type: "object",
  fields: [
    defineField({
      name: "institution",
      title: "* Institution",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "program",
      title: "* Program",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "educationType",
      title: "Education type",
      type: "string",
      options: {
        list: educationTypes,
      },
    }),
    defineField({
      name: "customEducationType",
      title: "Custom education type",
      description:
        'Visible only when "Custom" is selected above',
      type: "string",
      hidden: ({ parent }) => parent?.educationType !== "custom",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "institution",
      program: "program",
      educationType: "educationType",
      customEducationType: "customEducationType",
      period: "period",
    },
    prepare({
      title,
      program,
      educationType,
      customEducationType,
      period,
    }) {
      const typeLabel = getEducationTypeLabel(
        educationType,
        customEducationType
      );

      return {
        title: title || "Untitled institution",
        subtitle: [program, typeLabel, period]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});