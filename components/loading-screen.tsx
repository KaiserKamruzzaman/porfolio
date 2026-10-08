"use client";

import { useEffect, useState, useRef } from "react";

const FULL_NAME = "Kaiser Kamruzzaman";
const TYPING_SPEED = 40;
const SEEN_KEY = "loader-seen-v2";

export function LoadingScreen() {
  const [displayed, setDisplayed] = useState("");
  const [cursorBlink, setCursorBlink] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "counting" | "fading" | "hidden">("typing");
  const rafRef = useRef<number>(0);

  // Show the intro once per session; skip it for returning visits
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(SEEN_KEY);
      if (seen) setPhase("hidden");
    } catch {
      /* storage unavailable: just play the intro */
    }
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase === "hidden") return;
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    // Reduced motion: show the full name at once instead of typing it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(FULL_NAME);
      timeout = setTimeout(() => {
        setShowMeta(true);
        setPhase("counting");
      }, 300);
      return () => clearTimeout(timeout);
    }

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
        }, 150);
      }
    };

    timeout = setTimeout(type, 150);
    return () => clearTimeout(timeout);
  }, [phase === "hidden"]);

  // Progress counter
  useEffect(() => {
    if (phase !== "counting") return;

    const duration = 600;
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
          setTimeout(() => {
            setPhase("hidden");
            try {
              sessionStorage.setItem(SEEN_KEY, "1");
            } catch {
              /* ignore */
            }
          }, 400);
        }, 100);
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
        transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
            transition: "opacity 0.4s ease, transform 0.5s ease",
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
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Software Engineer
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
                color: "#64748b",
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
          color: "#64748b",
          textTransform: "uppercase",
        }}
      >
        Portfolio
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
