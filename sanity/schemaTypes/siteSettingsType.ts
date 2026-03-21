import { defineField, defineType } from "sanity";

function validateHref(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value !== "string") {
    return "Link must be a string";
  }

  const normalized = value.trim();

  const isAllowed =
    normalized.startsWith("https://") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("#");

  return isAllowed
    ? true
    : 'Use https://, http://, mailto:, tel:, "/" or "#"';
}

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fieldsets: [
    { name: "general", title: "General", options: { collapsible: false } },
    { name: "identity", title: "Identity", options: { collapsible: false } },
    { name: "seo", title: "SEO", options: { collapsible: false } },
    { name: "contacts", title: "Contacts CTA", options: { collapsible: false } },
    { name: "footer", title: "Footer", options: { collapsible: false } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "* Internal title",
      type: "string",
      initialValue: "Site settings",
      validation: (Rule) => Rule.required(),
      fieldset: "general",
    }),

    defineField({
      name: "personName",
      title: "* Person name",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "identity",
    }),
    defineField({
      name: "personRole",
      title: "* Person role",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "identity",
    }),
    defineField({
      name: "personPhoto",
      title: "* Person photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: "identity",
    }),

    defineField({
      name: "seoTitle",
      title: "* Default SEO title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "* Default SEO description",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      fieldset: "seo",
    }),
    defineField({
      name: "contactsTitle",
      title: "* Contacts CTA title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      fieldset: "contacts",
    }),
    defineField({
      name: "contactsButtons",
      title: "Contacts CTA buttons",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      fieldset: "contacts",
    }),

    defineField({
      name: "showFooterAside",
      title: "Show footer right block",
      type: "boolean",
      initialValue: true,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideText",
      title: "Footer right text",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideLinkLabel",
      title: "Footer right link label",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
    defineField({
      name: "footerAsideLinkHref",
      title: "Footer right link target",
      type: "string",
      validation: (Rule) => Rule.custom(validateHref),
      hidden: ({ parent }) => parent?.showFooterAside === false,
      fieldset: "footer",
    }),
  ],
  preview: {
    select: {
      title: "title",
      personNameRu: "personName.ru",
      personNameEn: "personName.en",
      media: "personPhoto",
    },
    prepare({ title, personNameRu, personNameEn, media }) {
      return {
        title: title || "Site settings",
        subtitle: personNameRu || personNameEn || "",
        media,
      };
    },
  },
});