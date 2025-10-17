"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, LayoutGroup, PanInfo, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import cards from "@/content/cards.json";
import { useUI } from "@/lib/store";
import Card from "./Card";
import CardDetail from "./CardDetail";

export default function CardDeck() {
  const {
    mode,
    activeIndex,
    setTotal,
    openDetail,
    cycleColor,
    advanceIndexOnly,
  } = useUI() as any;

  const router = useRouter();

  useEffect(() => setTotal(cards.length), [setTotal]);

  const BASE_BACK_POSE = useMemo(
    () => ({ scale: 0.985, y: 10, rotateZ: -5, opacity: 0.98, x: 0 }),
    []
  );

  const [isFlinging, setIsFlinging] = useState(false);
  const [flyingIndex, setFlyingIndex] = useState<number | null>(null);
  const [suppressActiveDuringFling, setSuppressActiveDuringFling] =
    useState(false);

  const TAP_SLOP_PX = 8;
  const TAP_MAX_MS = 300;
  const DRAG_MUTE_MS = 180;

  const downXY = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragMuteUntil = useRef<number>(0);

  function pointerDown(e: React.PointerEvent) {
    downXY.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  }
  function pointerMove(e: React.PointerEvent) {
    if (!downXY.current) return;
    (window as any).lastMoveX = e.clientX - downXY.current.x;
    (window as any).lastMoveY = e.clientY - downXY.current.y;
  }
  function pointerUp() {
    const now = performance.now();
    if (!downXY.current) return;
    const dt = now - downXY.current.t;
    const dx = Math.abs((window as any).lastMoveX ?? 0);
    const dy = Math.abs((window as any).lastMoveY ?? 0);
    const moved = Math.hypot(dx, dy);
    const muted = now < dragMuteUntil.current;
    const isTap = dt <= TAP_MAX_MS && moved <= TAP_SLOP_PX;

    if (!muted && isTap && !isFlinging) {
      const slug = (cards[activeIndex] as any).slug;
      if (slug) {
        openDetail();
        router.push(`/?card=${slug}`, { scroll: false });
      }
    }
    downXY.current = null;
    (window as any).lastMoveX = 0;
    (window as any).lastMoveY = 0;
  }

  const stackVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      rotateZ: 0,
      x: 0,
      transition: { duration: 0.18 },
    },
    impact: {
      scale: [1, 1.036, 1.0, 1.006, 1.002, 1],
      y: [0, -4, 0, -1.6, 0.8, 0],
      x: [0, 0, 0, 0.8, -0.6, 0],
      rotateZ: [0, -0.22, 0, -0.1, 0.06, 0],
      filter: ["none", "brightness(1.02)", "none", "none", "none", "none"] as any,
      transition: {
        duration: 0.86,
        ease: ["easeOut", "easeInOut", "easeInOut", "easeInOut", "easeOut"],
        times: [0, 0.32, 0.4, 0.66, 0.84, 1],
      },
    },
  };

  const backerVariants = {
    rest: BASE_BACK_POSE,
    hold: { ...BASE_BACK_POSE, transition: { duration: 0.001 } },
  } as const;

  const current = activeIndex;
  const nextIdx = (activeIndex + 1) % cards.length;

  function setBodyDragging(on: boolean) {
    try {
      if (on) document.body.setAttribute("data-dragging", "1");
      else document.body.removeAttribute("data-dragging");
    } catch {}
  }

  function startFling({ fromDrag }: { fromDrag: boolean }) {
    if (isFlinging) return;
    setIsFlinging(true);
    setFlyingIndex(current);
    setSuppressActiveDuringFling(fromDrag);
    cycleColor();
    advanceIndexOnly();
    if (fromDrag) {
      dragMuteUntil.current = performance.now() + DRAG_MUTE_MS;
    }
  }

  function flingNextByClick() {
    startFling({ fromDrag: false });
  }

  function onDragStart() {
    setBodyDragging(true);
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const { offset, velocity } = info;
    const vx = velocity.x || 0;
    const dx = offset.x || 0;

    const goNext = dx < -80 || vx < -600;
    const open = dx > 80 || vx > 600;

    if (goNext) {
      startFling({ fromDrag: true });
      setBodyDragging(false);
      return;
    }
    if (open) {
      const slug = (cards[current] as any).slug;
      if (slug) {
        openDetail();
        router.push(`/?card=${slug}`, { scroll: false });
      }
      setBodyDragging(false);
      return;
    }
    dragMuteUntil.current = performance.now() + DRAG_MUTE_MS;
    setBodyDragging(false);
  }

  if (mode === "story") {
    return (
      <section className="relative w-full grid place-items-center py-24">
        <button
          onClick={flingNextByClick}
          disabled={isFlinging}
          className="cta-text absolute left-60 md:left-70 top-1/2 -translate-y-1/2 hover:opacity-90 disabled:opacity-50"
        >
          Next card
          <div className="h-[3px] w-[160px] mt-3 bg-white/70 ml-16" />
        </button>

        <button
          onClick={() => {
            const slug = (cards[current] as any).slug;
            if (slug) {
              openDetail();
              router.push(`/?card=${slug}`, { scroll: false });
            }
          }}
          disabled={isFlinging}
          className="cta-text absolute right-60 md:right-70 top-1/2 -translate-y-1/2 hover:opacity-90 text-right disabled:opacity-50"
        >
          Show me!
          <div className="h-[3px] w-[160px] mt-3 ml-auto bg-white/70 mr-[40px]" />
        </button>

        <LayoutGroup id="story">
          <div className="relative">
            <motion.div
              className="relative w-[220px] h-[308px] md:w-[240px] md:h-[336px] lg:w-[250px] lg:h-[360px] [perspective:1200px]"
              variants={stackVariants}
              animate={isFlinging ? "impact" : "rest"}
            >
              <motion.div
                key={"backer-" + nextIdx}
                className="absolute inset-0 will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
                variants={backerVariants}
                initial="rest"
                animate="hold"
              >
                <div className="rounded-card paper-back paper-grain w-full h-full overflow-hidden">
                  <Card index={nextIdx} active={false} data={cards[nextIdx] as any} />
                </div>
              </motion.div>

              {!(
                isFlinging && suppressActiveDuringFling && flyingIndex !== null
              ) && (
                <motion.div
                  key={"active-" + current}
                  className="absolute inset-0 will-change-transform cursor-pointer"
                  style={{ touchAction: "pan-x", cursor: "grab" }}
                  drag="x"
                  dragElastic={0.15}
                  dragMomentum={false}
                  dragSnapToOrigin
                  whileDrag={{ scale: 1.01, cursor: "grabbing" }}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onPointerDown={pointerDown}
                  onPointerMove={pointerMove}
                  onPointerUp={() => {
                    pointerUp();
                    setBodyDragging(false);
                  }}
                >
                  <Card index={current} active data={cards[current] as any} />
                </motion.div>
              )}
            </motion.div>

            {flyingIndex !== null && (
              <motion.div
                key={"flying-" + flyingIndex}
                className="absolute inset-0 pointer-events-none will-change-transform"
                style={{
                  transformOrigin: "50% 50%",
                  transformStyle: "preserve-3d",
                }}
                variants={{
                  start: {
                    x: 0,
                    y: 0,
                    rotateZ: 0,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                  },
                  fly: {
                    x: ["0vw", "-22vw", "-58vw", "-105vw", "-150vw"],
                    y: ["0px", "-8px", "-12px", "-9px", "-6px"],
                    rotateZ: [0, -3, -9, -12, -16],
                    rotateY: [0, 40, 140, 210, 280],
                    scale: [1, 1.012, 1.02, 1.02, 1.02],
                    opacity: [1, 0.96, 0.82, 0.72, 0.6],
                    transition: {
                      duration: 1.2,
                      ease: [0.18, 0.55, 0.22, 0.96],
                    },
                  },
                }}
                initial="start"
                animate="fly"
                onAnimationComplete={() => {
                  setFlyingIndex(null);
                  setIsFlinging(false);
                  setSuppressActiveDuringFling(false);
                  setBodyDragging(false);
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Card index={flyingIndex} active data={cards[flyingIndex] as any} />
                </div>
                <div
                  className="absolute inset-0 rounded-card paper-surface paper-grain"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* 🔧 FIX: CardDetail only receives { index } */}
          <CardDetail index={activeIndex} />
        </LayoutGroup>
      </section>
    );
  }

  // GRID MODE
  return (
    <section className="w-full py-4">
      <div className="mx-auto w-full max-w-[960px] px-3 sm:px-4 md:px-6">
        <LayoutGroup id="grid">
          <motion.div className="grid grid-cols-3 gap-x-4 gap-y-6 justify-items-center">
            {cards.map((c, i) => {
              const slug = (c as any).slug;
              return (
                <motion.div
                  key={"grid-" + i}
                  className="w-[176px] h-[246px] md:w-[186px] md:h-[260px] lg:w-[250px] lg:h-[360px] cursor-pointer"
                  onClick={() => {
                    if (!slug) return;
                    openDetail();
                    router.push(`/?card=${slug}`, { scroll: false });
                  }}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 0.7, 0.23, 0.95],
                    delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.04,
                  }}
                >
                  <Card index={i} active={false} data={c as any} />
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
