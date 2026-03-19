import type { Locale } from "@/lib/i18n/types";
import type { ProjectContentSection } from "@/lib/projects/types";

export const getDemoProjectSections = (
  slug: string,
  locale: Locale
): ProjectContentSection[] => {
  const safeSlug =
    slug === "fitness-app"
      ? "fitness-app"
      : slug === "analytics-dashboard"
        ? "analytics-dashboard"
        : "portfolio";

  if (safeSlug === "fitness-app") {
    return locale === "ru"
      ? [
          {
            id: "context",
            title: "Контекст",
            blocks: [
              {
                type: "text",
                text: "Проект был задуман как концепт фитнес-экосистемы, объединяющей трекинг тренировок, питание и социальные механики в одном продукте.",
              },
              {
                type: "list",
                items: [
                  "Найти структуру, которая объединяет разные сценарии в одном интерфейсе",
                  "Сделать опыт понятным как для новичков, так и для опытных пользователей",
                  "Сохранить баланс между полезностью и мотивацией",
                ],
              },
            ],
          },
          {
            id: "process",
            title: "Процесс",
            blocks: [
              {
                type: "blockTitle",
                text: "Ключевой фокус",
              },
              {
                type: "text",
                text: "Основной задачей было спроектировать систему экранов, в которой пользователь может без лишней сложности переключаться между трекингом, аналитикой и социальными функциями.",
              },
              {
                type: "image",
                src: "/images/project-cover.png",
                alt: "Process illustration",
                width: 1600,
                height: 900,
                caption:
                  "Пример визуального материала, который в будущем будет управляться через CMS.",
              },
              {
                type: "quote",
                title: "Вывод",
                text: "Чем сложнее продукт, тем важнее сделать его структуру визуально очевидной ещё до первого взаимодействия.",
              },
            ],
          },
        ]
      : [
          {
            id: "context",
            title: "Context",
            blocks: [
              {
                type: "text",
                text: "The project was designed as a concept for a fitness ecosystem that combines workout tracking, nutrition and social mechanics in one product.",
              },
              {
                type: "list",
                items: [
                  "Find a structure that unites multiple scenarios in one interface",
                  "Keep the experience understandable for both beginners and advanced users",
                  "Balance utility and motivation",
                ],
              },
            ],
          },
          {
            id: "process",
            title: "Process",
            blocks: [
              {
                type: "blockTitle",
                text: "Key focus",
              },
              {
                type: "text",
                text: "The main challenge was to design a screen system where users can move between tracking, analytics and social features without unnecessary complexity.",
              },
              {
                type: "image",
                src: "/images/project-cover.png",
                alt: "Process illustration",
                width: 1600,
                height: 900,
                caption:
                  "Example of visual content that will later be managed through CMS.",
              },
              {
                type: "quote",
                title: "Takeaway",
                text: "The more complex the product is, the more important it becomes to make its structure visually obvious before the first interaction.",
              },
            ],
          },
        ];
  }

  if (safeSlug === "analytics-dashboard") {
    return locale === "ru"
      ? [
          {
            id: "context",
            title: "Контекст",
            blocks: [
              {
                type: "text",
                text: "Проект исследует интерфейс аналитической панели для продуктовых команд, которым важно быстро отслеживать ключевые показатели и работать с кастомными представлениями данных.",
              },
              {
                type: "list",
                items: [
                  "Гибкая система виджетов",
                  "Конструктор метрик",
                  "Настраиваемые дашборды",
                ],
              },
            ],
          },
          {
            id: "solution",
            title: "Решение",
            blocks: [
              {
                type: "blockTitle",
                text: "Модульный подход",
              },
              {
                type: "text",
                text: "Основной идеей стало построение системы, в которой пользователи могут собирать собственные аналитические представления из повторно используемых модулей и блоков данных.",
              },
              {
                type: "image",
                src: "/images/project-cover.png",
                alt: "Analytics dashboard visual",
                width: 1600,
                height: 900,
                caption:
                  "Пример графического блока, который может быть заменён на реальный макет или экран продукта.",
              },
              {
                type: "quote",
                title: "Инсайт",
                text: "Чем сложнее аналитическая система, тем важнее не перегрузить пользователя структурой и дать ему ощущение контроля над данными.",
              },
            ],
          },
        ]
      : [
          {
            id: "context",
            title: "Context",
            blocks: [
              {
                type: "text",
                text: "This project explores an analytics dashboard interface for product teams that need to quickly monitor key indicators and work with custom data views.",
              },
              {
                type: "list",
                items: [
                  "Flexible widget system",
                  "Metric builder",
                  "Custom dashboards",
                ],
              },
            ],
          },
          {
            id: "solution",
            title: "Solution",
            blocks: [
              {
                type: "blockTitle",
                text: "Modular approach",
              },
              {
                type: "text",
                text: "The key idea was to design a system where users can build their own analytical views from reusable modules and data blocks.",
              },
              {
                type: "image",
                src: "/images/project-cover.png",
                alt: "Analytics dashboard visual",
                width: 1600,
                height: 900,
                caption:
                  "Example of a visual block that can later be replaced with a real layout or product screen.",
              },
              {
                type: "quote",
                title: "Insight",
                text: "The more complex the analytics system is, the more important it becomes to avoid structural overload and give the user a sense of control over the data.",
              },
            ],
          },
        ];
  }

  return locale === "ru"
    ? [
        {
          id: "context",
          title: "Контекст",
          blocks: [
            {
              type: "text",
              text: "Этот проект — мой персональный сайт-портфолио, который я спроектировал и собрал с нуля как систему, сочетающую дизайн, анимацию, адаптивность и локализацию.",
            },
            {
              type: "list",
              items: [
                "Собрать цельную систему интерфейса для главной и страницы проекта",
                "Сделать архитектуру пригодной для будущей CMS",
                "Сохранить визуальную аккуратность на десктопе и мобилке",
              ],
            },
          ],
        },
        {
          id: "solution",
          title: "Решение",
          blocks: [
            {
              type: "blockTitle",
              text: "Система контента",
            },
            {
              type: "text",
              text: "Страница проекта строится из секций и типовых блоков контента. Это позволяет гибко управлять наполнением кейса и в будущем подключить CMS без изменения самой структуры страницы.",
            },
            {
              type: "image",
              src: "/images/project-cover.png",
              alt: "Portfolio project visual",
              width: 1600,
              height: 900,
              caption:
                "На этом месте может быть любой медиа-блок: скриншот, схема, макет или итоговый экран.",
            },
            {
              type: "quote",
              title: "Ключевая идея",
              text: "Портфолио должно не только показывать проекты, но и само быть демонстрацией качества системного дизайнерского мышления.",
            },
          ],
        },
      ]
    : [
        {
          id: "context",
          title: "Context",
          blocks: [
            {
              type: "text",
              text: "This project is my personal portfolio website, designed and built from scratch as a system that combines design, motion, responsiveness and localization.",
            },
            {
              type: "list",
              items: [
                "Build a consistent interface system for the homepage and project page",
                "Make the architecture ready for future CMS integration",
                "Keep the visual quality consistent on desktop and mobile",
              ],
            },
          ],
        },
        {
          id: "solution",
          title: "Solution",
          blocks: [
            {
              type: "blockTitle",
              text: "Content system",
            },
            {
              type: "text",
              text: "The project page is built from sections and reusable content blocks. This makes the case study flexible and prepares the page for future CMS-driven content without changing its structure.",
            },
            {
              type: "image",
              src: "/images/project-cover.png",
              alt: "Portfolio project visual",
              width: 1600,
              height: 900,
              caption:
                "This area can hold any media block: screenshot, diagram, layout or final screen.",
            },
            {
              type: "quote",
              title: "Core idea",
              text: "A portfolio should not only present projects — it should itself demonstrate the quality of systematic design thinking.",
            },
          ],
        },
      ];
};