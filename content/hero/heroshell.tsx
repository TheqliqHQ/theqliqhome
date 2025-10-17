// content/hero/HeroShell.tsx
"use client";

import type { ReactNode } from "react";

type HeroShellProps = {
  chip?: string;
  onClose?: () => void;
  /** Left column: your title, blurb, etc. */
  children: ReactNode;
  /** Right column: image or any visual (optional) */
  rightSlot?: ReactNode;
};

export default function HeroShell({ chip, onClose, children, rightSlot }: HeroShellProps) {
  return (
    <div
      className="rounded-[28px] bg-white border border-black/10 relative"
      style={{ padding: "36px 40px" }}
    >
      {/* Close button — anchored to the hero card */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="grid place-items-center"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 40,
          height: 40,
          borderRadius: 9999,
          background: "var(--stage-fg, #ffffff)", // invert for contrast
          color: "var(--stage-bg, #2E6CE6)",
          fontWeight: 800,
          lineHeight: "40px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        ×
      </button>

      {/* Chip – matches current stage bg/fg */}
      <div style={{ marginBottom: 12 }}>
        <span
          style={{
            display: "inline-block",
            borderRadius: 9999,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            backgroundColor: "var(--stage-bg, #2E6CE6)",
            color: "var(--stage-fg, #ffffff)",
          }}
        >
          {chip || "Section"}
        </span>
      </div>

      {/* Two-column hero layout (stacks on small screens) */}
      <div className="grid gap-6 items-center md:grid-cols-[1fr,340px]">
        <div>{children}</div>
        {rightSlot ? <div className="min-h-[200px]">{rightSlot}</div> : null}
      </div>
    </div>
  );
}
