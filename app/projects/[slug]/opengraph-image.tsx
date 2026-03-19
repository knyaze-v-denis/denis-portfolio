import { ImageResponse } from "next/og";
import { getProjectOgData } from "@/lib/projects/og-data";

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
          background: "#f3f6fa",
          color: "#0b0c0e",
          padding: "56px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "56px",
            borderRadius: "28px",
            background: "#fcfdff",
            border: "1px solid rgba(11,12,14,0.08)",
            display: "flex",
            flexDirection: "column",
            padding: "56px",
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
              width: "fit-content",
            }}
          >
            {data.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "48px",
              gap: "18px",
            }}
          >
            <div
              style={{
                fontSize: 64,
                lineHeight: 1.05,
                fontWeight: 700,
                maxWidth: "860px",
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

          <div
            style={{
              marginTop: "auto",
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