import { ImageResponse } from "next/og";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#07080a",
          backgroundImage:
            "radial-gradient(1000px 500px at 50% 115%, rgba(68,144,255,0.30), transparent 70%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              backgroundColor: "#4490ff",
            }}
          />
          <div style={{ fontSize: "30px", fontWeight: 600, letterSpacing: "0.04em" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            Custom Software & AI Automation
          </div>
          <div style={{ fontSize: "32px", color: "rgba(255,255,255,0.6)" }}>
            We build software, automations, and AI workflows that grow businesses.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
