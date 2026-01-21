"use client";

import { useMemo, useState, useEffect } from "react";
import { BrassKnob } from "./BrassKnob";
import { CRTScreen } from "./CRTScreen";

export type TVImageInput = {
  name?: string;
  url: string;
};

type TVImageContent = {
  id: number;
  name: string;
  url: string;
  signal: string;
};

type TVVideoContent = {
  id: number;
  name: string;
  videoId: string;
  signal: string;
};

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function extractYouTubeId(url: string) {
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];

  const short = url.match(/youtu\.be\/([^?]+)/);
  if (short) return short[1];

  return url;
}

export function VintageTV({
  images,
  youtubeLinks = [],
}: {
  images: TVImageInput[];
  youtubeLinks?: string[];
}) {
  const [mode, setMode] = useState<"image" | "video">("image");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // ✅ Easter egg state
  const [secretMode, setSecretMode] = useState(false);

  const tvImages: TVImageContent[] = useMemo(() => {
    const mapped = (images || []).map((img, idx) => ({
      id: idx + 1,
      name: img.name?.trim() || `IMG ${idx + 1}`,
      url: img.url,
      signal: "Visual Feed",
    }));
    return shuffle(mapped);
  }, [images]);

  const tvVideos: TVVideoContent[] = useMemo(() => {
    return (youtubeLinks || []).map((link, idx) => ({
      id: idx + 1,
      name: `VID ${idx + 1}`,
      videoId: extractYouTubeId(link),
      signal: "Audio/Video",
    }));
  }, [youtubeLinks]);

  const handleImageChange = () => {
    if (!tvImages.length) return;
    setMode("image");
    setCurrentImageIndex((prev) => (prev + 1) % tvImages.length);
  };

  const handleVideoChange = () => {
    if (!tvVideos.length) return;
    setMode("video");
    setCurrentVideoIndex((prev) => (prev + 1) % tvVideos.length);
  };

  // ✅ Easter egg: IMG knob at 7 and VID knob at 3 triggers secret mode
  useEffect(() => {
    const imgSlot = (currentImageIndex + 1) % 10;
    const vidSlot = (currentVideoIndex + 1) % 10;

    if (imgSlot === 7 && vidSlot === 3) {
      setSecretMode(true);
    } else {
      setSecretMode(false);
    }
  }, [currentImageIndex, currentVideoIndex]);

  const activeContent =
    mode === "image"
      ? tvImages[currentImageIndex]
      : tvVideos[currentVideoIndex];

  return (
    <div style={{ position: "relative" }}>
      {/* ✅ Big aura glow */}
      <div
        style={{
          position: "absolute",
          inset: "-120px",
          borderRadius: "120px",
          background: secretMode
            ? "radial-gradient(circle at 50% 50%, rgba(255,240,100,0.35), rgba(0,0,0,0) 68%)"
            : mode === "video"
            ? "radial-gradient(circle at 50% 50%, rgba(255,80,200,0.30), rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(60,255,200,0.26), rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ✅ Glowing antennas */}
      <div
        style={{
          position: "absolute",
          top: "-155px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "110px",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: "4px",
            height: "170px",
            borderRadius: "3px",
            transform: "rotate(-22deg)",
            background:
              "linear-gradient(to top, rgba(240,240,240,1), rgba(140,140,140,1))",
            boxShadow:
              "0 0 18px rgba(120,200,255,0.55), 0 0 44px rgba(80,255,220,0.20)",
          }}
        />
        <div
          style={{
            width: "4px",
            height: "170px",
            borderRadius: "3px",
            transform: "rotate(22deg)",
            background:
              "linear-gradient(to top, rgba(240,240,240,1), rgba(140,140,140,1))",
            boxShadow:
              "0 0 18px rgba(255,120,220,0.50), 0 0 44px rgba(255,120,220,0.20)",
          }}
        />
      </div>

      {/* ✅ Glass TV Body (more frosted, less transparent) */}
      <div
        style={{
          width: "840px",
          height: "620px",
          borderRadius: "70px",
          padding: "20px",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",

          /* ✅ MORE frosted look */
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.10))",
          border: "1px solid rgba(255,255,255,0.24)",
          backdropFilter: "blur(26px)",
          WebkitBackdropFilter: "blur(26px)",

          boxShadow:
            "0 60px 140px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.20)",
        }}
      >
        {/* ✅ Neon trim */}
        {/* ✅ Revolving Neon Border Ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "70px",
            padding: "3px",
            pointerEvents: "none",
            zIndex: 4,

            background:
              "conic-gradient(from 0deg, rgba(255,0,220,0.9), rgba(0,255,220,0.8), rgba(255,220,120,0.8), rgba(140,80,255,0.85), rgba(255,0,220,0.9))",

            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: 0.88,
            animation: "neonSpin 2.4s linear infinite",
            filter: "blur(0.2px)",
          }}
        />

<style jsx>{`
  @keyframes neonSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`}</style>


        {/* ✅ Inner frosted panel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "62px",
            padding: "48px",
            position: "relative",

            background: secretMode
              ? "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.22), rgba(40,20,0,0.40) 48%, rgba(0,0,0,0.55) 100%)"
              : "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.22), rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.55) 100%)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          {/* Mode indicator */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 18,
              fontFamily: "Georgia, serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.55)",
              zIndex: 6,
            }}
          >
            <span
              style={{
                color: mode === "image" ? "rgba(60,255,200,0.95)" : "rgba(180,180,180,0.45)",
              }}
            >
              ● IMG
            </span>
            <span
              style={{
                color: mode === "video" ? "rgba(255,120,220,0.95)" : "rgba(180,180,180,0.45)",
              }}
            >
              ● VID
            </span>

            {secretMode && (
              <span
                style={{
                  marginLeft: 14,
                  color: "rgba(255,240,120,0.95)",
                  textShadow: "0 0 12px rgba(255,240,120,0.40)",
                }}
              >
                ● SECRET
              </span>
            )}
          </div>

          {/* Layout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            {/* Screen */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <CRTScreen content={activeContent as any} mode={mode} />
            </div>

            {/* Knobs */}
            <div
              style={{
                width: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <BrassKnob
                  rotation={currentImageIndex * 32}
                  onClick={handleImageChange}
                  active={mode === "image"}
                />
                <div
                  style={{
                    marginTop: 12,
                    color: "rgba(255,215,140,0.85)",
                    fontFamily: "Georgia, serif",
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Images
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <BrassKnob
                  rotation={currentVideoIndex * 32}
                  onClick={handleVideoChange}
                  active={mode === "video"}
                />
                <div
                  style={{
                    marginTop: 12,
                    color: "rgba(255,215,140,0.85)",
                    fontFamily: "Georgia, serif",
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Videos
                </div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,215,140,0.68)",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.26em",
              fontSize: 13,
              textShadow: "0 0 14px rgba(255,215,140,0.14)",
            }}
          >
            ANWESHA ◆ CAPTURES
          </div>
        </div>

        {/* Glass glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "70px",
            pointerEvents: "none",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 48%)",
            opacity: 0.20,
            zIndex: 5,
          }}
        />
      </div>
    </div>
  );
}
