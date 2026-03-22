import { ImageResponse } from "next/og";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import type { Image } from "sanity";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getInitialLocaleFromCookie,
  SITE_URL as BASE_SITE_URL,
} from "../layout";

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

type Locale = "ru" | "en";

type LocalizedString = {
  ru?: string;
  en?: string;
};

type SiteSettingsOg = {
  personName?: LocalizedString | string;
  personRole?: LocalizedString | string;
  personPhoto?: Image;
};

function pickLocaleValue(
  field: LocalizedString | string | undefined,
  locale: Locale
) {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  return field[locale] ?? field.ru ?? field.en;
}

type OgParams = {
  locale?: string;
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
  return locale === "en" ? "PORTFOLIO" : "ПОРТФОЛИО";
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
  params?: Promise<OgParams>;
} = {}) {
  const resolvedParams = params ? await params : undefined;
  assertValidLocale(resolvedParams?.locale);
  const locale = await resolveLocale(resolvedParams?.locale);

  let personName = locale === "en" ? "Denis Knyazev" : "ДЕНИС КНЯЗЕВ";
  let personRole = locale === "en" ? "PRODUCT DESIGNER" : "ПРОДУКТОВЫЙ ДИЗАЙНЕР";
  let personPhotoSrc = `${BASE_SITE_URL}/images/profile-photo.png`;

  try {
    const siteSettingsDocument = await client.fetch<SiteSettingsOg | null>(`
      *[_type == "siteSettings"][0]{
        personName,
        personRole,
        personPhoto
      }
    `);

    if (siteSettingsDocument) {
      personName = (
        pickLocaleValue(siteSettingsDocument.personName, locale) ?? personName
      ).toUpperCase();

      personRole = (
        pickLocaleValue(siteSettingsDocument.personRole, locale) ?? personRole
      ).toUpperCase();

      if (siteSettingsDocument.personPhoto) {
        personPhotoSrc = urlForImage(siteSettingsDocument.personPhoto)
          .width(1200)
          .height(1600)
          .url();
      }
    }
  } catch {
    // Keep fallback values so OG generation never fails.
  }

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
            width: "100%",
            height: "100%",
            gap: "40px",
          }}
        >
          <img
            src={personPhotoSrc}
            alt={personName}
            width={405}
            height={526}
            style={{
              width: "405px",
              height: "526px",
              borderRadius: "12px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "605px",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
                padding: "12px 16px",
                borderRadius: "12px",
                background: TAG_SURFACE_PRIMARY,
                color: FOREGROUND_INVERSE,
                fontSize: 28,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {getEyebrow(locale)}
            </div>

            <div
              style={{
                display: "flex",
                width: "605px",
                height: "210px",
                marginTop: "110px",
              }}
            >
              <PatternBlock width={605} height={210} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "53px",
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
                {personName}
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "6px",
                  fontSize: 40,
                  lineHeight: "48px",
                  color: FOREGROUND_SECONDARY,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                {personRole}
              </div>
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