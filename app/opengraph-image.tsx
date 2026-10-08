import { ImageResponse } from "next/og"

export const alt = "Kaiser Kamruzzaman | Full-Stack Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #030712 0%, #0f172a 100%)",
          color: "#f1f5f9",
        }}
      >
        <div
          style={{
            width: 72,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Kaiser Kamruzzaman
        </div>
        <div style={{ fontSize: 40, color: "#22d3ee", marginTop: 20 }}>
          Full-Stack Software Engineer
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 32 }}>
          React · Node.js · AWS · DevOps — Germany
        </div>
      </div>
    ),
    size,
  )
}
