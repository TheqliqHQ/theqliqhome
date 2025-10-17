"use client";

import { useEffect } from "react";
import { useUI } from "@/lib/store";
import { motion } from "framer-motion";

export default function Stage({ children }: { children: React.ReactNode }) {
  const { mode, getCurrentColor } = useUI();
  const { bg, fg } = getCurrentColor();

  // Keep <body data-mode="story" | "grid"> in sync
  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  // Sync background and text colors with palette
  useEffect(() => {
    document.documentElement.style.setProperty("--stage-bg", bg);
    document.documentElement.style.setProperty("--stage-fg", fg);
  }, [bg, fg]);

  // Use different container classes per mode:
  // - story: lock to 1 screen, no scroll
  // - grid: allow page to scroll (header/footer move with content)
  const containerClass =
    mode === "story"
      ? "h-screen w-screen overflow-hidden flex flex-col items-center justify-between"
      : "min-h-screen w-screen overflow-x-hidden flex flex-col items-center";

  return (
    <motion.main
      className={containerClass}
      style={{ background: bg, color: fg }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
}
