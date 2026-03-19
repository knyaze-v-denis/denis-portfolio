import type { Messages } from "@/lib/i18n/types";

export const en: Messages = {
  header: {
    name: "Denis Knyazev",
    role: "Product Designer",
    cta: "Get in touch",
    localeRu: "Ру",
    localeEn: "En",
  },
  hero: {
    name: "Denis Knyazev",
    role: "Product Designer",
    about:
      "I’m a product designer focused on crafting clear interfaces, systems, and user experiences. I care about combining aesthetics, logic, and real user needs.",
  },
  sections: {
    skills: "Skills",
    projects: "Projects & experiments",
    workExperience: "Work Experience",
    education: "Education",
    contacts: "Contacts",
  },
  skills: {
    groups: {
      hard: "Hard Skills",
      soft: "Soft Skills",
      languages: "Languages",
    },
    items: {
      hard: [
        "UX Design",
        "UI Design",
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "Research",
        "Figma",
        "User Flows",
        "Information Architecture",
        "Usability Testing",
      ],
      soft: [
        "Communication",
        "Presentation",
        "Teamwork",
        "Problem Solving",
        "Critical Thinking",
        "Collaboration",
      ],
      languages: ["Russian", "English", "Finnish"],
    },
  },
  projects: {
    items: [
      {
        title: "Portfolio Website",
        description:
          "Design and development of a personal portfolio website featuring projects, experiments, and design process.",
        cover: "/images/project-cover.png",
        href: "/projects/portfolio",
        tags: [
          { label: "Project", variant: "primary" },
          { label: "UX/UI", variant: "secondary" },
          { label: "Next.js", variant: "secondary" },
        ],
      },
      {
        title: "Fitness App Concept",
        description:
          "A concept for a fitness ecosystem combining workout tracking, nutrition, and social features.",
        cover: "/images/project-cover.png",
        href: "/projects/fitness-app",
        tags: [
          { label: "Project", variant: "primary" },
          { label: "Product Design", variant: "secondary" },
        ],
      },
    ],
  },
  workExperience: {
    items: [
      {
        title: "SimpleOne • ITG Corporation",
        lines: ["Product Designer", "October 2025 — Present"],
        secondaryLines: [1],
      },
      {
        title: "Matrix",
        lines: ["Lead Product Designer", "June 2024 — June 2025"],
        secondaryLines: [1],
      },
      {
        title: "LockBox",
        lines: ["UX/UI Designer", "February 2023 — May 2024"],
        secondaryLines: [1],
      },
      {
        title: "ITMO University",
        lines: ["Graphic Designer", "September 2021 — September 2022"],
        secondaryLines: [1],
      },
    ],
  },
  education: {
    items: [
      {
        title: "St. Petersburg International Banking Institute",
        lines: [
          "Business Informatics",
          "Incomplete Higher Education",
          "2024 — 2029",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "ITMO University",
        lines: [
          "Business Informatics",
          "Incomplete Higher Education",
          "2020 — 2023",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Yandex Practicum",
        lines: [
          "UX Research for Designers",
          "Professional Development",
          "2026",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Zhenya Arutyunov",
        lines: ["How to Design with Code", "2025"],
        secondaryLines: [1],
      },
    ],
  },
  contacts: {
    title: "Let’s work together or just say hello.",
    buttons: [
      {
        label: "Telegram",
        href: "https://t.me/knyaze_v_denis",
        variant: "primary",
      },
      {
        label: "E-mail",
        href: "mailto:knyaze.v.denis@yandex.ru",
        variant: "secondary",
      },
      {
        label: "Behance",
        href: "#",
        variant: "secondary",
      },
      {
        label: "Download CV",
        href: "#",
        variant: "secondary",
      },
    ],
  },
  footer: {
    copyright: "©2026. All rights reserved",
    designedBy: "Designed by",
    author: "Denis Knyazev",
    authorHref: "https://t.me/knyaze_v_denis",
  },
};