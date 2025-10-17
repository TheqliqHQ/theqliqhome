"use client";

import { useUI } from "@/lib/store";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ToggleDock() {
  const { mode, setMode } = useUI();
  const [isHovering, setIsHovering] = useState(false);

  const isStory = mode === "story";
  const isGrid = mode === "grid";

  return (
    <motion.div
      className="toggle-dock rounded-full bg-black/90 px-1.5 py-1.5 flex items-center gap-1.5 shadow-[0_8px_30px_rgba(0,0,0,.45)] cursor-pointer select-none"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ pointerEvents: "auto" }}
    >
      {/* Story button */}
      <motion.button
        type="button"
        aria-label="Story view"
        onClick={() => setMode("story")}
        className={`w-10 h-10 rounded-full grid place-items-center transition-colors ${
          isStory ? "bg-white" : "bg-black"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <div className={`w-[18px] h-[18px] rounded-[5px] ${isStory ? "bg-black" : "bg-white"}`} />
      </motion.button>

      {/* Grid button with 4 animated dots */}
      <motion.button
        type="button"
        aria-label="Grid view"
        onClick={() => setMode("grid")}
        className={`w-10 h-10 rounded-full grid place-items-center transition-colors ${
          isGrid ? "bg-white" : "bg-black"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <motion.div
          className="grid grid-cols-2 gap-[4px]"
          animate={{ rotate: isGrid ? 90 : isHovering ? 20 : 0, scale: isHovering ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.span
              key={i}
              className={`w-[7px] h-[7px] rounded-full ${isGrid ? "bg-black" : "bg-white"}`}
              animate={{ scale: isHovering ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1.2, repeat: isHovering ? Infinity : 0, ease: "easeInOut", delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
