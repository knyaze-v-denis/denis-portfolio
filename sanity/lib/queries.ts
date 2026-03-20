import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    coverImage,
    shortDescription,
    heroDescription,
    client,
    domain,
    timeline,
    role,
    "links": coalesce(links, [])[]{
      label,
      href
    },
    "sections": coalesce(sections, [])[]{
      title,
      "blocks": coalesce(blocks, [])[]{
        ...,
        _type == "imageBlock" => {
          ...,
          image
        }
      }
    }
  }
`;

export const projectMetadataBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    shortDescription
  }
`;