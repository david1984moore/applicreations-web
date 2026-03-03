// app/opengraph-image.tsx — Dynamic OG image for social sharing
import { ImageResponse } from "next/og";

export const alt = "Applicreations | Delaware Web Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#3d2a5c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Applicreations
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
          }}
        >
          Delaware Web Development
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Custom websites for small businesses
        </div>
      </div>
    ),
    { ...size }
  );
}
