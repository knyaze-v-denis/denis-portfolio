import { ImageResponse } from "next/og";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { mapSanitySiteSettingsToSiteSettingsData } from "@/sanity/lib/mappers";
import { urlForImage } from "@/sanity/lib/image";
import type { Locale } from "@/lib/i18n/types";
import type { Image } from "sanity";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getInitialLocaleFromCookie,
  SITE_URL as BASE_SITE_URL,
} from "../../../layout";

export const runtime = "nodejs";

const BACKGROUND_COLOR = "#f1f3f6";
const FOREGROUND_PRIMARY = "#0b0c0e";
const FOREGROUND_SECONDARY = "#8a8d93";
const FOREGROUND_INVERSE = "#f1f3f6";
const TAG_SURFACE_PRIMARY = "#0b0c0e";
const PATTERN_COLOR = "#e5e7eb";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type LocalizedString = {
  ru?: string;
  en?: string;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function hasSupportedLocale(locale?: string) {
  return !!locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

function assertValidLocale(locale?: string) {
  if (locale && !hasSupportedLocale(locale)) {
    notFound();
  }
}

type SanityProjectOg = {
  title?: LocalizedString | string;
  coverImage?: Image;
};

function pickLocaleValue(
  field: LocalizedString | string | undefined,
  locale: Locale
) {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  return field[locale] ?? field.ru ?? field.en;
}

function getLocaleFromParams(locale?: string): Locale | null {
  if (!locale) {
    return null;
  }

  return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : null;
}

async function resolveLocale(localeFromRoute?: string): Promise<Locale> {
  const localeFromParams = getLocaleFromParams(localeFromRoute);

  if (localeFromParams) {
    return localeFromParams;
  }

  const cookieStore = await cookies();
  return getInitialLocaleFromCookie(cookieStore) ?? DEFAULT_LOCALE;
}

function getEyebrow(locale: Locale) {
  return locale === "en" ? "PROJECT" : "ПРОЕКТ";
}

function PatternBlock({ width, height }: { width: number; height: number }) {
  const stripeCount = Math.ceil((width + height) / 24) + 2;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: stripeCount }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            display: "flex",
            left: `${index * 24 - height}px`,
            top: "0px",
            width: "2px",
            height: `${height * 2}px`,
            background: PATTERN_COLOR,
            transform: "rotate(-45deg)",
            transformOrigin: "top left",
          }}
        />
      ))}
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}) {
  const { slug, locale: localeFromRoute } = await params;
  assertValidLocale(localeFromRoute);
  const locale = await resolveLocale(localeFromRoute);

  let projectTitle = (locale === "en" ? "Project" : "Проект").toUpperCase();
  let projectImageSrc = `${BASE_SITE_URL}/images/project-cover.png`;

  const [projectDocument, siteSettingsDocument] = await Promise.all([
    client.fetch<SanityProjectOg | null>(projectBySlugQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  if (projectDocument) {
    projectTitle = (
      pickLocaleValue(projectDocument.title, locale) ?? projectTitle
    ).toUpperCase();

    if (projectDocument.coverImage) {
      projectImageSrc = urlForImage(projectDocument.coverImage)
        .width(1200)
        .height(1200)
        .url();
    }
  }

  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

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
          fontFamily: "Arial, sans-serif",
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
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: "12px",
                background: TAG_SURFACE_PRIMARY,
                color: FOREGROUND_INVERSE,
                fontSize: 28,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {getEyebrow(locale)}
            </div>

            <div
              style={{
                display: "flex",
                width: "747px",
                height: "48px",
                marginLeft: "auto",
                flexShrink: 0,
              }}
            >
              <PatternBlock width={747} height={48} />
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
                display: "flex",
                width: "747px",
                height: "263px",
                marginLeft: "40px",
                flexShrink: 0,
              }}
            >
              <PatternBlock width={747} height={263} />
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
                display: "flex",
                fontSize: 40,
                lineHeight: "48px",
                color: FOREGROUND_PRIMARY,
                textTransform: "uppercase",
                fontWeight: 500,
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
              <div style={{ display: "flex" }}>{personName}</div>
              <div style={{ display: "flex" }}>•</div>
              <div style={{ display: "flex" }}>{personRole}</div>
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