"use client";

import type { ReactNode } from "react";

type HeroShellProps = {
  chip?: string;
  onClose?: () => void;
  children: ReactNode;         // LEFT column (text only)
  rightSlot?: ReactNode;       // RIGHT column (image/visual only)
};

/** Editable tokens for size/position */
const CARD_MAX_W = 1200;       // width of the hero card
const CARD_RADIUS = 80;        // corner radius
const CARD_PADDING = { x: 100, y: 36 };
const RIGHT_COL_W = 360;       // right visual width (md+)
const TOP_OFFSET = 64;         // distance from header

export default function HeroShell({
  chip,
  onClose,
  children,
  rightSlot,
}: HeroShellProps) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: CARD_MAX_W, marginTop: TOP_OFFSET }}
    >
      <div
        className="relative w-full"
        style={{
          background: "#f5f5f5",
          borderRadius: CARD_RADIUS,
          padding: `${CARD_PADDING.y}px ${CARD_PADDING.x}px`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {/* Close button – always black bg / white × */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="grid place-items-center"
          style={{
            position: "absolute",
            top: 70,
            right: 85,
            width: 40,
            height: 40,
            borderRadius: 9999,
            background: "#000",
            color: "#fff",
            fontWeight: 100,
            lineHeight: "40px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          X
        </button>

        {/* Chip */}
        {chip ? (
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                display: "inline-block",
                borderRadius: 9999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: "var(--stage-bg, #2E6CE6)",
                color: "var(--stage-fg, #fff)",
              }}
            >
              {chip}
            </span>
          </div>
        ) : null}

        {/* Two-column responsive layout */}
        <div
          className="grid gap-6 items-center"
          style={{
            gridTemplateColumns: rightSlot ? `minmax(0,1fr) ${RIGHT_COL_W}px` : "1fr",
          }}
        >
          <div className="hero-scope hero-left">{children}</div>
          {rightSlot ? (
            <div className="hero-scope hero-right">
              <div className="hero-art-frame">{rightSlot}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
