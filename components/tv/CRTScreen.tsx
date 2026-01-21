"use client";

import { useEffect, useMemo, useState } from "react";

type ImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type VideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

type CRTScreenProps = {
  content: ImageContent | VideoContent;
  mode: "image" | "video";
};

export function CRTScreen({ content, mode }: CRTScreenProps) {
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    setIsSwitching(true);
    const t = setTimeout(() => setIsSwitching(false), 220);
    return () => clearTimeout(t);
  }, [mode, (content as any)?.id]);

  const label = useMemo(() => content?.name || "UNKNOWN", [content]);
  const signal = useMemo(() => {
    return (content as any)?.signal || (mode === "video" ? "Audio/Video" : "Visual Feed");
  }, [content, mode]);

  const isImage = mode === "image";
  const isVideo = mode === "video";
  const imageUrl = isImage ? (content as ImageContent)?.url : "";

  return (
    <div style={{ position: "relative" }}>
      {/* ✅ Glass CRT bezel outer frame */}
      <div
        style={{
          width: "620px",
          height: "450px",
          borderRadius: "44px",
          padding: "16px",
          position: "relative",

          background:
            "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",

          boxShadow:
            "0 20px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* ✅ bezel ring glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "44px",
            pointerEvents: "none",
            boxShadow:
              "0 0 0 2px rgba(255,255,255,0.06), 0 0 28px rgba(120,200,255,0.12), 0 0 28px rgba(255,120,220,0.10)",
          }}
        />

        {/* ✅ inner glass edge */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "36px",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 18% 10%, rgba(255,255,255,0.18), rgba(0,0,0,0) 60%)",
            opacity: 0.55,
          }}
        />

        {/* ✅ actual CRT screen area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "34px",

            background: "radial-gradient(circle at 30% 20%, #0d0d0d, #000 75%)",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.95), inset 0 0 90px rgba(0,0,0,0.75)",
          }}
        >
          {/* Switching noise overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              opacity: isSwitching ? 0.95 : 0,
              transition: "opacity 180ms ease-out",
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 2px, rgba(0,0,0,0.06) 4px)",
              mixBlendMode: "overlay",
              filter: "contrast(160%)",
              pointerEvents: "none",
            }}
          />

          {/* Actual media */}
          {isVideo ? (
            <iframe
              key={(content as VideoContent).videoId}
              src={`https://www.youtube.com/embed/${
                (content as VideoContent).videoId
              }?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
              title={label}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                filter: "brightness(0.92) contrast(1.1) saturate(1.1)",
              }}
            />
          ) : imageUrl ? (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={label}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // ✅ fixes your “not fitting” issue
                filter: "brightness(0.92) contrast(1.08) saturate(1.12)",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
              }}
            >
              NO SIGNAL
            </div>
          )}

          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              pointerEvents: "none",
              opacity: 0.33,
              background:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0.17), rgba(0,0,0,0.17) 1px, rgba(0,0,0,0) 3px)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.70) 100%)",
            }}
          />

          {/* Glass glare */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              pointerEvents: "none",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 40%)",
              opacity: 0.25,
              mixBlendMode: "screen",
            }}
          />

          {/* Bottom info bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              padding: "10px 12px",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.75)",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0))",
            }}
          >
            <span>{label}</span>
            <span style={{ color: "rgba(0,255,170,0.75)" }}>{signal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
