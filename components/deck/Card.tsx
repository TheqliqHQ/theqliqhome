"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type CardProps = {
  index: number;
  active: boolean;
  data: {
    id: number;
    chip?: string;
    title?: string;
    illustration: string;
  };
};

export default function Card({ index, active, data }: CardProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-100, 100], [4, -4]);
  const ry = useTransform(mx, [-120, 120], [-6, 6]);
  const tx = useSpring(useTransform(mx, [-120, 120], [-28, 28]), { stiffness: 120, damping: 16 });
  const ty = useSpring(useTransform(my, [-100, 100], [-6, 6]), { stiffness: 120, damping: 16 });

  function onMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  }
  function onLeave() { mx.set(0); my.set(0); }

  const isGif = (data.illustration || "").toLowerCase().endsWith(".gif");

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="
        relative h-full overflow-hidden
        rounded-card paper-surface paper-grain
        flex flex-col select-none
      "
      style={{
        rotateX: active ? (rx as any) : 0,
        rotateY: active ? (ry as any) : 0,
        x: active ? (tx as any) : 0,
        y: active ? (ty as any) : 0,
      }}
    >
      {/* Pill + title */}
      <div className="px-6 pt-6 pb-2">
        <span
          className="inline-block rounded-full px-3 py-1 text-[12px] font-medium tracking-wide"
          style={{
            backgroundColor: "var(--stage-bg, #2E6CE6)",
            color: "var(--stage-fg, #ffffff)",
          }}
        >
          {data.chip || "Card"}
        </span>

        {data.title ? (
          <h3 className="text-2xl md:text-l font-bold tracking-tight mt-3 text-slate-700">
            {data.title}
          </h3>
        ) : null}
      </div>

      {/* Image fills remaining area without changing card size */}
      <div className="flex-1 px-6 pb-6 pt-2 flex items-center justify-center">
        <div className="relative w-[95%] h-[200%] mt-[60px]">
          <Image
            src={data.illustration}
            alt={data.title || "card illustration"}
            fill
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 260px"
            unoptimized={isGif}
            priority={index === 0}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain bg-transparent select-none pointer-events-none"
          />
        </div>
      </div>
    </motion.article>
  );
}
