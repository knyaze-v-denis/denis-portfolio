import { ImageResponse } from "next/og";
import { getProjectOgData } from "@/lib/projects/og-data";

const SITE_URL = "https://denis-portfolio-eight.vercel.app";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getProjectOgData(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(180deg, #f3f6fa 0%, #e9eef5 100%)",
          color: "#0b0c0e",
          padding: "56px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(11,12,14,0.035) 0, rgba(11,12,14,0.035) 1px, transparent 1px, transparent 28px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "32px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
              padding: "0 16px",
              borderRadius: "12px",
              background: "#0b0c0e",
              color: "#f3f6fa",
              fontSize: 22,
              alignSelf: "flex-start",
            }}
          >
            {data.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              marginTop: "44px",
            }}
          >
            <img
              src={`${SITE_URL}${data.image}`}
              alt={data.title}
              width={180}
              height={180}
              style={{
                borderRadius: "24px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "760px",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.02,
                  fontWeight: 700,
                  maxWidth: "760px",
                }}
              >
                {data.title}
              </div>

              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.3,
                  color: "rgba(11,12,14,0.6)",
                  maxWidth: "760px",
                }}
              >
                {data.subtitle}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "56px",
              fontSize: 22,
              color: "rgba(11,12,14,0.45)",
            }}
          >
            Denis Knyazev — Product Designer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}