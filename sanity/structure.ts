
import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set(["siteSettings", "homepage"]);

const HIDDEN_TYPES = new Set([
  "siteSettings",
  "homepage",
  "homepageContactLink",
  "projectLink",
  "projectSection",
  "blockTitle",
  "textBlock",
  "listBlock",
  "quoteBlock",
  "imageBlock",
  "skillGroup",
  "workExperienceItem",
  "educationItem",
  "localizedString",
  "localizedText",
]);

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings")
        ),

      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !HIDDEN_TYPES.has(listItem.getId() ?? "")
      ),
    ]);

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = SINGLETON_TYPES;
