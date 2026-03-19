export type Locale = "ru" | "en";

export type Messages = {
  header: {
    name: string;
    role: string;
    cta: string;
    localeRu: string;
    localeEn: string;
  };
  hero: {
    name: string;
    role: string;
    about: string;
  };
  sections: {
    skills: string;
    projects: string;
    workExperience: string;
    education: string;
    contacts: string;
  };
  skills: {
    groups: {
      hard: string;
      soft: string;
      languages: string;
    };
    items: {
      hard: string[];
      soft: string[];
      languages: string[];
    };
  };
  projects: {
    items: {
      title: string;
      description: string;
      cover: string;
      href: string;
      tags: {
        label: string;
        variant?: "primary" | "secondary";
      }[];
    }[];
  };
  workExperience: {
    items: {
      title: string;
      lines: string[];
      secondaryLines: number[];
    }[];
  };
  education: {
    items: {
      title: string;
      lines: string[];
      secondaryLines: number[];
    }[];
  };
  contacts: {
    title: string;
    buttons: {
      label: string;
      href: string;
      variant: "primary" | "secondary";
    }[];
  };
  footer: {
    copyright: string;
    designedBy: string;
    author: string;
    authorHref: string;
  };
};