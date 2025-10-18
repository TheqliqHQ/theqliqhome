"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/lib/store";
import cards from "@/content/cards.json";
import { heroBySlug } from "@/content/registry";
import HeroShell from "@/content/hero/heroshell";

export default function CardDetail({ index }: { index: number }) {
  const { detailOpen, closeDetail } = useUI() as any;

  const card = (cards as any)[index] || {};
  const slug: string = card?.slug ?? `card-${index}`;
  const chipText: string | undefined = card?.chip;

  const HeroBody = useMemo(() => heroBySlug[slug] ?? (() => null), [slug]);

  // Add/remove a flag on <body> if you need to style the page while open.
  useEffect(() => {
    if (detailOpen) document.body.setAttribute("data-detail", "open");
    else document.body.removeAttribute("data-detail");
  }, [detailOpen]);

  useEffect(() => {
    return () => document.body.removeAttribute("data-detail");
  }, []);

  return (
    <AnimatePresence>
      {detailOpen && (
        <motion.div
          key="detail-layer"
          className="fixed inset-0 z-[90] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Forward wheel movement to the main page so scroll always works */}
          <div
            className="relative w-full h-full flex items-start justify-center"
            onWheel={(e) => {
              // Forward the delta to the page scroll
              window.scrollBy({ top: e.deltaY, behavior: "auto" });
            }}
          >
            <motion.div
              className="relative mx-auto pointer-events-auto"
              style={{
                maxWidth: 1200,
                marginTop: 100,
                transformOrigin: "center left",
              }}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{
                rotateY: 0,
                opacity: 1,
                transition: { duration: 0.55, ease: [0.18, 0.8, 0.2, 1] },
              }}
              exit={{
                rotateY: 90,
                opacity: 0,
                transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
              }}
            >
              <HeroShell chip={chipText} onClose={closeDetail}>
                <HeroBody />
              </HeroShell>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
