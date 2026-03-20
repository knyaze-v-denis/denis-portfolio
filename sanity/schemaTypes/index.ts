import { type SchemaTypeDefinition } from "sanity";
import { blockTitleType } from "./blockTitleType";
import { imageBlockType } from "./imageBlockType";
import { listBlockType } from "./listBlockType";
import { projectLinkType } from "./projectLinkType";
import { projectSectionType } from "./projectSectionType";
import { projectType } from "./projectType";
import { quoteBlockType } from "./quoteBlockType";
import { textBlockType } from "./textBlockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    projectLinkType,
    projectSectionType,
    blockTitleType,
    textBlockType,
    listBlockType,
    imageBlockType,
    quoteBlockType,
  ],
};