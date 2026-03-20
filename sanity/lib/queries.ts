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
    tags,
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

export const projectNavigationItemsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc){
    title,
    "slug": slug.current
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    tags,
    coverImage
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    title,
    heroImage,
    heroRole,
    "heroContacts": coalesce(heroContacts, [])[]{
      label,
      href,
      variant
    },
    heroAbout,
    "skillGroups": coalesce(skillGroups, [])[]{
      kind,
      title,
      showTitle,
      "items": coalesce(items, [])
    },
    "workExperienceItems": coalesce(workExperienceItems, [])[]{
      company,
      position,
      period
    },
    "educationItems": coalesce(educationItems, [])[]{
      institution,
      program,
      educationType,
      customEducationType,
      period
    },
    contactsTitle,
    "contactsButtons": coalesce(contactsButtons, [])[]{
      label,
      href,
      variant
    },
    "middleSectionsOrder": coalesce(middleSectionsOrder, []),
    "homepageProjects": coalesce(homepageProjects, [])[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      tags,
      coverImage
    }
  }
`;