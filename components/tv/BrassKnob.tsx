"use client";

export function BrassKnob({
  rotation,
  onClick,
  active,
}: {
  rotation: number;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Knob"
      style={{
        width: 86,
        height: 86,
        borderRadius: "999px",
        overflow: "hidden", // ✅ crops anything outside circle
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        outline: "none",
      }}
    >
      <img
        src="/images/gallery/goldenknob.svg"
        alt="Knob"
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${rotation}deg) scale(1.18)`, // ✅ zoom in crops bottom arrows
          transformOrigin: "center",
          transition: "transform 320ms ease-in-out", // ✅ like your snippet
          pointerEvents: "none",
          userSelect: "none",
          filter: active
            ? "drop-shadow(0 0 18px rgba(255, 215, 120, 0.75))"
            : "drop-shadow(0 0 12px rgba(0,0,0,0.5))",
        }}
      />
    </button>
  );
}
