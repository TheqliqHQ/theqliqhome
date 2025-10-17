"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/lib/store";
import cards from "@/content/cards.json";
import { heroBySlug } from "@/content/registry";

/**
 * Shared hero layout tokens — guarantees identical sizing/positioning
 * for every hero, regardless of the slug’s custom content.
 */
const HERO = {
  gapFromHeader: 96,             // distance below header (keeps header visible)
  maxWidth: 1120,                // same width for every hero frame
  sidePadding: 24,               // page horizontal padding
  radius: 28,                    // rounded corners for the frame
  minHeight: "clamp(420px, 58vh, 560px)", // consistent vertical size
  padX: 40,                      // inner padding (content area)
  padY: 36,
  chipOffsetX: 8,                // chip anchor inside the frame
  chipOffsetY: 4,
  chipHeight: 30,
};

function Chip({ text }: { text?: string }) {
  return (
    <span
      className="font-semibold"
      style={{
        display: "inline-block",
        height: HERO.chipHeight,
        lineHeight: `${HERO.chipHeight}px`,
        padding: "0 14px",
        borderRadius: 9999,
        fontSize: 12,
        letterSpacing: 0.2,
        backgroundColor: "var(--stage-bg, #2E6CE6)", // chip uses stage color
        color: "var(--stage-fg, #ffffff)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
      }}
    >
      {text || "Section"}
    </span>
  );
}

/** Fallback hero body if a slug has no custom hero yet */
function DefaultHeroBody() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h2
        className="font-extrabold tracking-tight"
        style={{ fontSize: 36, lineHeight: "44px", color: "#0f172a" }}
      >
        Add a Hero component for this slug in <code>content/hero/&lt;slug&gt;.tsx</code>
      </h2>
      <p className="mt-4 text-slate-600">
        The shared frame keeps size, chip position, and close button identical for all cards.
      </p>
    </div>
  );
}

export default function CardDetail({ index }: { index: number }) {
  const { detailOpen, closeDetail } = useUI() as any;

  const card = (cards as any)[index] || {};
  const slug: string = card?.slug ?? `card-${index}`;
  const chipText: string | undefined = card?.chip;

  // per-slug hero content (frame/chip/close are handled here)
  const HeroBody = useMemo(() => heroBySlug[slug] ?? DefaultHeroBody, [slug]);

  // let header/footer/toggle react to detail state (you already use this flag)
  useEffect(() => {
    if (detailOpen) document.body.setAttribute("data-detail", "open");
    else document.body.removeAttribute("data-detail");
  }, [detailOpen]);

  return (
    <AnimatePresence>
      {detailOpen && (
        <motion.div
          key="detail-layer"
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // keep page background visible (no dark overlay) and allow clicks only on the hero
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          {/* Centered container under the header */}
          <div
            className="mx-auto"
            style={{
              maxWidth: HERO.maxWidth,
              paddingLeft: HERO.sidePadding,
              paddingRight: HERO.sidePadding,
              position: "relative",
              top: HERO.gapFromHeader,
              pointerEvents: "auto", // re-enable pointer events for the hero
            }}
          >
            {/* UNIFORM HERO FRAME */}
            <motion.div
              className="relative"
              style={{
                borderRadius: HERO.radius,
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.08)",
                minHeight: HERO.minHeight as any,
                padding: `${HERO.padY}px ${HERO.padX}px`,
              }}
              initial={{ rotateY: -90, opacity: 0, transformOrigin: "0% 50%" }}
              animate={{
                rotateY: 0,
                opacity: 1,
                transition: { duration: 0.55, ease: [0.18, 0.8, 0.2, 1] },
              }}
              exit={{ rotateY: 90, opacity: 0, transition: { duration: 0.4 } }}
            >
              {/* CHIP (identical position for all heroes) */}
              <div
                style={{
                  position: "absolute",
                  top: HERO.padY + HERO.chipOffsetY,
                  left: HERO.padX + HERO.chipOffsetX,
                }}
              >
                <Chip text={chipText} />
              </div>

              {/* HERO CONTENT SLOT — add spacing so chip never overlaps text */}
              <div
                style={{
                  paddingTop: HERO.chipHeight + 12,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <HeroBody />
              </div>

              {/* FIXED CLOSE BUTTON — same style on every card */}
              <button
                aria-label="Close"
                onClick={closeDetail}
                className="grid place-items-center"
                style={{
                  position: "absolute",
                  top: -12,
                  right: -12,
                  width: 40,
                  height: 40,
                  borderRadius: 9999,
                  background: "#0b0b0b", // solid black (doesn't inherit stage color)
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 800,
                  lineHeight: "40px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                ×
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
