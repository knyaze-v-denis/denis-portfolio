import { ImageResponse } from "next/og";
import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { mapSanitySiteSettingsToSiteSettingsData } from "@/sanity/lib/mappers";
import type { Locale } from "@/lib/i18n/types";

const BACKGROUND_COLOR = "#f1f3f6";
const FOREGROUND_PRIMARY = "#0b0c0e";
const FOREGROUND_SECONDARY = "#8a8d93";
const FOREGROUND_INVERSE = "#f1f3f6";
const TAG_SURFACE_PRIMARY = "#0b0c0e";
const PATTERN_COLOR = "rgba(11,12,14,0.08)";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function getLocaleFromCookie(localeCookie: string | undefined): Locale {
  return localeCookie === "en" ? "en" : "ru";
}

function getEyebrow(locale: Locale) {
  return locale === "en" ? "PORTFOLIO" : "ПОРТФОЛИО";
}

export default async function Image() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get("locale")?.value);

  const siteSettingsDocument = await client.fetch(siteSettingsQuery);
  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

  const personName = (siteSettings?.personName ?? "Denis Knyazev").toUpperCase();
  const personRole = (
    siteSettings?.personRole ??
    (locale === "en" ? "Product Designer" : "Продуктовый дизайнер")
  ).toUpperCase();
  const personPhotoSrc =
    siteSettings?.personPhotoSrc ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.knyaze-v-denis.ru"}/images/profile-photo.png`;

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
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
                padding: "12px 16px",
                borderRadius: "16px",
                background: TAG_SURFACE_PRIMARY,
                color: FOREGROUND_INVERSE,
                fontSize: 28,
                lineHeight: 1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {getEyebrow(locale)}
            </div>

            <div
              style={{
                position: "relative",
                width: "605px",
                height: "210px",
                marginTop: "110px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    `repeating-linear-gradient(-45deg, ${PATTERN_COLOR} 0px, ${PATTERN_COLOR} 3px, transparent 3px, transparent 24px)`,
                }}
              />
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
                  fontSize: 40,
                  lineHeight: "48px",
                  color: FOREGROUND_PRIMARY,
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                {personName}
              </div>

              <div
                style={{
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