import { defineArrayMember, defineField, defineType } from "sanity";

const middleSectionOptions = [
  { title: "Skills", value: "skills" },
  { title: "Projects", value: "projects" },
  { title: "Work Experience", value: "workExperience" },
  { title: "Education", value: "education" },
];

function validateMiddleSections(value: unknown) {
  if (!Array.isArray(value)) {
    return "Section order is required";
  }

  const values = value
    .filter((item): item is string => typeof item === "string")
    .filter(Boolean);

  const required = [
    "skills",
    "projects",
    "workExperience",
    "education",
  ];

  const missing = required.filter((item) => !values.includes(item));
  if (missing.length > 0) {
    return `Missing sections: ${missing.join(", ")}`;
  }

  const duplicates = values.filter(
    (item, index) => values.indexOf(item) !== index
  );
  if (duplicates.length > 0) {
    return `Duplicate sections are not allowed: ${duplicates.join(", ")}`;
  }

  return true;
}

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fieldsets: [
    {
      name: "general",
      title: "General",
      options: { collapsible: false },
    },
    {
      name: "hero",
      title: "Hero section",
      options: { collapsible: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: false },
    },
    {
      name: "skills",
      title: "Skills section",
      options: { collapsible: false },
    },
    {
      name: "workExperience",
      title: "Work Experience section",
      options: { collapsible: false },
    },
    {
      name: "education",
      title: "Education section",
      options: { collapsible: false },
    },
    {
      name: "projects",
      title: "Projects section",
      options: { collapsible: false },
    },
    {
      name: "layout",
      title: "Layout and order",
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "* Internal title",
      type: "string",
      initialValue: "Homepage",
      validation: (Rule) => Rule.required(),
      fieldset: "general",
    }),

    defineField({
      name: "heroAbout",
      title: "* About text",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "hero",
    }),

    defineField({
      name: "heroContacts",
      title: "Hero contacts",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      fieldset: "hero",
    }),

    defineField({
      name: "seoTitle",
      title: "* SEO title",
      description: "Used for the homepage title tag and social preview title.",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "* SEO description",
      description:
        "Used for the homepage meta description and social preview description.",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),

    defineField({
      name: "skillGroups",
      title: "Skill groups",
      description:
        "Groups with empty skill lists will not be rendered on the website.",
      type: "array",
      of: [{ type: "skillGroup" }],
      fieldset: "skills",
    }),

    defineField({
      name: "workExperienceItems",
      title: "Work experience items",
      type: "array",
      of: [{ type: "workExperience" }],
      fieldset: "workExperience",
    }),

    defineField({
      name: "educationItems",
      title: "Education items",
      type: "array",
      of: [{ type: "educationItem" }],
      fieldset: "education",
    }),


    defineField({
      name: "middleSectionsOrder",
      title: "* Middle sections order",
      description:
        "Hero is always first and Contacts is always last. Drag these sections to change only the middle order.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: middleSectionOptions,
          },
        }),
      ],
      validation: (Rule) => Rule.required().custom(validateMiddleSections),
      initialValue: [
        "skills",
        "projects",
        "workExperience",
        "education",
      ],
      fieldset: "layout",
    }),

    defineField({
      name: "homepageProjects",
      title: "Projects on homepage",
      description:
        "Add project documents here to control which projects are visible on the homepage and in what order.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      fieldset: "projects",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});