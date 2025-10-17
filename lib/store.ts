"use client";
import { create } from "zustand";

/** Brand palette */
const PALETTE = [
  { bg: "rgb(46,108,230)", fg: "#ffffff" }, // blue
  { bg: "rgb(31,178,84)",  fg: "#111111" }, // green
  { bg: "rgb(228,38,22)",  fg: "#ffffff" }, // red
  { bg: "rgb(255,187,37)", fg: "#111111" }, // yellow
];

type UIState = {
  /** view mode */
  mode: "story" | "grid";
  setMode: (m: "story" | "grid") => void;

  /** cards */
  activeIndex: number;
  total: number;
  setTotal: (n: number) => void;
  next: () => void;                 // old: advance + cycleColor (kept for other flows)
  advanceIndexOnly: () => void;     // new: advance WITHOUT color change

  /** detail panel */
  detailOpen: boolean;
  openDetail: () => void;
  closeDetail: () => void;

  /** palette */
  colorIndex: number;
  cycleColor: () => void;
  getCurrentColor: () => { bg: string; fg: string };
};

export const useUI = create<UIState>((set, get) => ({
  mode: "story",
  setMode: (m) => set({ mode: m }),

  activeIndex: 0,
  total: 0,
  setTotal: (n) => set({ total: n }),

  // Keeps existing behavior for places that still call `next()`
  next: () => {
    const { activeIndex, total } = get();
    const newActive = (activeIndex + 1) % Math.max(total || 1, 1);
    set({ activeIndex: newActive });
    get().cycleColor();
  },

  // NEW: just advance the index — no color cycle
  advanceIndexOnly: () => {
    const { activeIndex, total } = get();
    const newActive = (activeIndex + 1) % Math.max(total || 1, 1);
    set({ activeIndex: newActive });
  },

  /** detail state */
  detailOpen: false,
  openDetail: () => set({ detailOpen: true }),
  closeDetail: () => set({ detailOpen: false }),

  /** colors */
  colorIndex: 0,
  cycleColor: () => {
    const i = get().colorIndex;
    set({ colorIndex: (i + 1) % PALETTE.length });
  },
  getCurrentColor: () => {
    const i = get().colorIndex % PALETTE.length;
    return PALETTE[i];
  },
}));

