import { ImageResponse } from "next/og";
import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { mapSanitySiteSettingsToSiteSettingsData } from "@/sanity/lib/mappers";
import { urlForImage } from "@/sanity/lib/image";
import type { Locale } from "@/lib/i18n/types";
import type { Image } from "sanity";

type LocalizedString = {
  ru?: string;
  en?: string;
};

type SanityProjectOg = {
  title?: LocalizedString | string;
  coverImage?: Image;
};

const BACKGROUND_COLOR = "#f1f3f6";
const FOREGROUND_PRIMARY = "#0b0c0e";
const FOREGROUND_SECONDARY = "#8a8d93";
const FOREGROUND_INVERSE = "#f1f3f6";
const TAG_SURFACE_PRIMARY = "#0b0c0e";
const PATTERN_COLOR = "rgba(11,12,14,0.08)";
const SITE_URL = "https://www.knyaze-v-denis.ru";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function getLocaleFromCookie(localeCookie: string | undefined): Locale {
  return localeCookie === "en" ? "en" : "ru";
}

function getEyebrow(locale: Locale) {
  return locale === "en" ? "PROJECT" : "ПРОЕКТ";
}

function pickLocaleValue(
  field: LocalizedString | string | undefined,
  locale: Locale
) {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  return field[locale] ?? field.ru ?? field.en;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get("locale")?.value);

  const [projectDocument, siteSettingsDocument] = await Promise.all([
    client.fetch<SanityProjectOg | null>(projectBySlugQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

  const projectTitle = (
    pickLocaleValue(projectDocument?.title, locale) ??
    (locale === "en" ? "Project" : "Проект")
  ).toUpperCase();

  const projectImageSrc = projectDocument?.coverImage
    ? urlForImage(projectDocument.coverImage).width(1200).height(1200).url()
    : `${SITE_URL}/images/project-cover.png`;

  const personName = (siteSettings?.personName ?? "Denis Knyazev").toUpperCase();
  const personRole = (
    siteSettings?.personRole ??
    (locale === "en" ? "Product Designer" : "Продуктовый дизайнер")
  ).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BACKGROUND_COLOR,
          color: FOREGROUND_PRIMARY,
          padding: "52px 75px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: "16px",
                background: TAG_SURFACE_PRIMARY,
                color: FOREGROUND_INVERSE,
                fontSize: 28,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              {getEyebrow(locale)}
            </div>

            <div
              style={{
                position: "relative",
                flex: 1,
                height: "48px",
                marginLeft: "173px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(-45deg, ${PATTERN_COLOR} 0px, ${PATTERN_COLOR} 3px, transparent 3px, transparent 24px)`,
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: "52px",
            }}
          >
            <img
              src={projectImageSrc}
              alt={projectTitle}
              width={263}
              height={263}
              style={{
                width: "263px",
                height: "263px",
                borderRadius: "12px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                position: "relative",
                flex: 1,
                height: "263px",
                marginLeft: "40px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(-45deg, ${PATTERN_COLOR} 0px, ${PATTERN_COLOR} 3px, transparent 3px, transparent 24px)`,
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "54px",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 40,
                lineHeight: "48px",
                color: FOREGROUND_PRIMARY,
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {projectTitle}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "32px",
                fontSize: 28,
                lineHeight: 1,
                color: FOREGROUND_SECONDARY,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <div>{personName}</div>
              <div>•</div>
              <div>{personRole}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}