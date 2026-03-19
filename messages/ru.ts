import type { Messages } from "@/lib/i18n/types";

export const ru: Messages = {
  header: {
    name: "Денис Князев",
    role: "Продуктовый дизайнер",
    cta: "Связаться",
    localeRu: "Ру",
    localeEn: "En",
  },
  hero: {
    name: "Денис Князев",
    role: "Продуктовый дизайнер",
    about:
      "Я продуктовый дизайнер, который проектирует понятные интерфейсы, системы и пользовательский опыт. Мне важно соединять эстетику, логику и реальные потребности пользователей.",
  },
  sections: {
    skills: "Навыки",
    projects: "Проекты и эксперименты",
    workExperience: "Опыт работы",
    education: "Образование",
    contacts: "Контакты",
  },
  skills: {
    groups: {
      hard: "Хард скиллы",
      soft: "Софт скиллы",
      languages: "Языки",
    },
    items: {
      hard: [
        "UX-дизайн",
        "UI-дизайн",
        "Вайрфреймы",
        "Прототипирование",
        "Дизайн-системы",
        "Исследования",
        "Figma",
        "User Flows",
        "Информационная архитектура",
        "Юзабилити-тестирование",
      ],
      soft: [
        "Коммуникация",
        "Презентация",
        "Командная работа",
        "Решение проблем",
        "Критическое мышление",
        "Коллаборация",
      ],
      languages: ["Русский", "Английский", "Финский"],
    },
  },
  projects: {
    items: [
      {
        title: "Портфолио-сайт",
        description:
          "Дизайн и разработка персонального сайта-портфолио с проектами, экспериментами и историей работы над продуктами.",
        cover: "/images/project-cover.png",
        href: "/projects/portfolio",
        tags: [
          { label: "Проект", variant: "primary" },
          { label: "UX/UI", variant: "secondary" },
          { label: "Next.js", variant: "secondary" },
        ],
      },
      {
        title: "Концепт фитнес-приложения",
        description:
          "Концепт фитнес-экосистемы, объединяющей трекинг тренировок, питание и социальные механики.",
        cover: "/images/project-cover.png",
        href: "/projects/fitness-app",
        tags: [
          { label: "Проект", variant: "primary" },
          { label: "Продуктовый дизайн", variant: "secondary" },
        ],
      },
    ],
  },
  workExperience: {
    items: [
      {
        title: "SimpleOne • ITG Corporation",
        lines: ["Продуктовый дизайнер", "Октябрь 2025 — сейчас"],
        secondaryLines: [1],
      },
      {
        title: "Матрикс",
        lines: ["Ведущий продуктовый дизайнер", "Июнь 2024 — Июнь 2025"],
        secondaryLines: [1],
      },
      {
        title: "LockBox",
        lines: ["UX/UI дизайнер", "Февраль 2023 — Май 2024"],
        secondaryLines: [1],
      },
      {
        title: "Университет ИТМО",
        lines: ["Графический дизайнер", "Сентябрь 2021 — Сентябрь 2022"],
        secondaryLines: [1],
      },
    ],
  },
  education: {
    items: [
      {
        title: "МБИ им. А. Собчака",
        lines: [
          "Бизнес-информатика",
          "Неоконченное высшее",
          "2024 — 2029",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Университет ИТМО",
        lines: [
          "Бизнес-информатика",
          "Неоконченное высшее",
          "2020 — 2023",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Яндекс Практикум",
        lines: [
          "UX-исследования для дизайнеров",
          "Повышение квалификации",
          "2026",
        ],
        secondaryLines: [1, 2],
      },
      {
        title: "Женя Арутюнов",
        lines: ["Как дизайнить кодом", "2025"],
        secondaryLines: [1],
      },
    ],
  },
  contacts: {
    title: "Давай поработаем вместе или просто поздороваемся.",
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
        label: "Скачать CV",
        href: "#",
        variant: "secondary",
      },
    ],
  },
  footer: {
    copyright: "©2026. Все права защищены",
    designedBy: "Designed by",
    author: "Denis Knyazev",
    authorHref: "https://t.me/knyaze_v_denis",
  },
};