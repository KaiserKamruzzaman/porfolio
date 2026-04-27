"use client";

import { useEffect, useState, useRef } from "react";

const FULL_NAME = "Kaiser Kamruzzaman";
const TYPING_SPEED = 55;

export function LoadingScreen() {
  const [displayed, setDisplayed] = useState("");
  const [cursorBlink, setCursorBlink] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "counting" | "fading" | "hidden">("typing");
  const rafRef = useRef<number>(0);

  // Typing effect
  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i < FULL_NAME.length) {
        i++;
        setDisplayed(FULL_NAME.slice(0, i));
        timeout = setTimeout(type, TYPING_SPEED);
      } else {
        setCursorBlink(true);
        setTimeout(() => {
          setShowMeta(true);
          setPhase("counting");
        }, 300);
      }
    };

    timeout = setTimeout(type, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Progress counter
  useEffect(() => {
    if (phase !== "counting") return;

    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("fading");
          setTimeout(() => setPhase("hidden"), 700);
        }, 150);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#030712",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.07) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* Typing name */}
        <div className="flex items-center" style={{ minHeight: "2.75rem" }}>
          <span
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              fontFamily: "var(--font-poppins), sans-serif",
              letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayed}
          </span>
          {/* Cursor */}
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "2rem",
              marginLeft: "4px",
              background: "linear-gradient(180deg, #4f46e5, #06b6d4)",
              borderRadius: "2px",
              animation: cursorBlink ? "blink 0.8s ease-in-out infinite" : "none",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Role + progress — fade in after typing */}
        <div
          style={{
            opacity: showMeta ? 1 : 0,
            transform: showMeta ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            marginTop: "12px",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              color: "#475569",
              textTransform: "uppercase",
            }}
          >
            Software Engineer
          </p>

          {/* Progress row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                position: "relative",
                width: "160px",
                height: "1px",
                background: "#0f172a",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${count}%`,
                  background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.7rem",
                color: "#1e293b",
                minWidth: "34px",
              }}
            >
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Corner label */}
      <div
        className="pointer-events-none absolute bottom-8 left-8"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "#1e293b",
          textTransform: "uppercase",
        }}
      >
        Portfolio 2025
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
