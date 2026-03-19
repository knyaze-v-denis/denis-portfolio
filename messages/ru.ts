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
  projectHero: {
    client: "Компания / Клиент",
    domain: "Сфера",
    timeline: "Сроки проекта",
    role: "Роль",
    links: "Ссылки",
  },
  projectNavigation: {
    previousProject: "Предыдущий проект",
    nextProject: "Следующий проект",
    back: "Назад",
    forward: "Дальше",
  },
  projectPage: {
    portfolio: {
      title: "Портфолио сайт",
      description:
        "Проект персонального портфолио-сайта, разработанный для демонстрации продуктового дизайна, процессов работы и экспериментов с интерфейсами.",
      fields: {
        client: "Личный проект",
        domain: "UX/UI, продуктовый дизайн",
        timeline: "Февраль 2026 — Март 2026",
        role: "UX/UI дизайнер, разработчик",
      },
      links: {
        github: "GitHub",
        live: "Live версия",
      },
    },
    fitnessApp: {
      title: "Концепт фитнес-приложения",
      description:
        "Концепт фитнес-экосистемы, объединяющей трекинг тренировок, питание и социальные механики в одном продукте.",
      fields: {
        client: "Концепт-проект",
        domain: "Fitness, Product Design",
        timeline: "Февраль 2026 — Март 2026",
        role: "UX/UI дизайнер, продуктовый дизайнер",
      },
      links: {
        prototype: "Прототип",
        behance: "Behance",
      },
    },
    analyticsDashboard: {
      title: "Аналитический дашборд",
      description:
        "Концепт модульного аналитического дашборда для продуктовых команд, который позволяет отслеживать ключевые метрики и собирать кастомные представления данных.",
      fields: {
        client: "Внутренний продукт",
        domain: "Аналитика, B2B, Product Design",
        timeline: "Январь 2026 — Март 2026",
        role: "Продуктовый дизайнер",
      },
      links: {
        prototype: "Прототип",
        github: "GitHub",
      },
    },
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
      {
        title: "Аналитический дашборд",
        description:
          "Концепт аналитического дашборда для продуктовых команд с модульной системой виджетов, метрик и кастомных представлений данных.",
        cover: "/images/project-cover.png",
        href: "/projects/analytics-dashboard",
        tags: [
          { label: "Проект", variant: "primary" },
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