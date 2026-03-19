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
      "I am a product designer focused on building clear interfaces, systems and user experiences. I aim to combine aesthetics, logic and real user needs.",
  },
  projectHero: {
    client: "Company / Client",
    domain: "Domain",
    timeline: "Timeline",
    role: "Role",
    links: "Links",
  },
  projectNavigation: {
    previousProject: "Previous project",
    nextProject: "Next project",
    back: "Back",
    forward: "Next",
  },
  projectPage: {
    portfolio: {
      title: "Portfolio Website",
      description:
        "A personal portfolio project created to showcase product design work, design processes and experiments with interfaces.",
      fields: {
        client: "Personal project",
        domain: "UX/UI, Product Design",
        timeline: "Feb 2026 — Mar 2026",
        role: "UX/UI Designer, Developer",
      },
      links: {
        github: "GitHub",
        live: "Live version",
      },
    },
    fitnessApp: {
      title: "Fitness App Concept",
      description:
        "A concept of a fitness ecosystem that combines workout tracking, nutrition and social mechanics in one product.",
      fields: {
        client: "Concept project",
        domain: "Fitness, Product Design",
        timeline: "Feb 2026 — Mar 2026",
        role: "UX/UI Designer, Product Designer",
      },
      links: {
        prototype: "Prototype",
        behance: "Behance",
      },
    },
    analyticsDashboard: {
      title: "Analytics Dashboard",
      description:
        "A concept of a modular analytics dashboard for product teams that helps track key metrics and build custom data views.",
      fields: {
        client: "Internal product",
        domain: "Analytics, B2B, Product Design",
        timeline: "Jan 2026 — Mar 2026",
        role: "Product Designer",
      },
      links: {
        prototype: "Prototype",
        github: "GitHub",
      },
    },
  },
  sections: {
    skills: "Skills",
    projects: "Projects & Experiments",
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
          "Design and development of a personal portfolio website showcasing projects, experiments and product design work.",
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
          "Concept of a fitness ecosystem combining workout tracking, nutrition and social mechanics.",
        cover: "/images/project-cover.png",
        href: "/projects/fitness-app",
        tags: [
          { label: "Project", variant: "primary" },
          { label: "Product Design", variant: "secondary" },
        ],
      },
      {
        title: "Analytics Dashboard",
        description:
          "Concept of an analytics dashboard for product teams with a modular system of widgets, metrics and custom data views.",
        cover: "/images/project-cover.png",
        href: "/projects/analytics-dashboard",
        tags: [
          { label: "Project", variant: "primary" },
          { label: "B2B", variant: "secondary" },
          { label: "Analytics", variant: "secondary" },
        ],
      },
    ],
  },
  workExperience: {
    items: [
      {
        title: "SimpleOne • ITG Corporation",
        lines: ["Product Designer", "Oct 2025 — Present"],
        secondaryLines: [1],
      },
      {
        title: "Matrix",
        lines: ["Lead Product Designer", "Jun 2024 — Jun 2025"],
        secondaryLines: [1],
      },
      {
        title: "LockBox",
        lines: ["UX/UI Designer", "Feb 2023 — May 2024"],
        secondaryLines: [1],
      },
      {
        title: "ITMO University",
        lines: ["Graphic Designer", "Sep 2021 — Sep 2022"],
        secondaryLines: [1],
      },
    ],
  },
  education: {
    items: [
      {
        title: "International Banking Institute",
        lines: [
          "Business Informatics",
          "Incomplete higher education",
          "2024 — 2029",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "ITMO University",
        lines: [
          "Business Informatics",
          "Incomplete higher education",
          "2020 — 2023",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Yandex Practicum",
        lines: [
          "UX Research for Designers",
          "Professional development",
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
    title: "Let's work together or simply say hello.",
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