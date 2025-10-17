// content/hero/contact-faq.tsx
import Image from "next/image";

export default function ContactFaqHero({
  chip,
  title = "Let’s talk about your next big move",
  figure = "/page/contact-hero.png", // <-- NO /public prefix
}: {
  chip?: string;
  title?: string;
  figure?: string;
}) {
  return (
    <div
      className="
        rounded-[28px] bg-white border border-black/5 paper-grain
        px-8 md:px-10 py-10 md:py-14
      "
      style={{ boxShadow: "none" }}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="max-w-[640px]">
          <span
            className="inline-block rounded-full px-4 py-2 text-xs font-semibold tracking-wide"
            style={{
              backgroundColor: "var(--stage-bg, #2E6CE6)",
              color: "var(--stage-fg, #ffffff)",
            }}
          >
            {chip}
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        <div className="relative w-[300px] h-[220px] md:w-[360px] md:h-[260px] shrink-0">
          <Image
            src={figure}
            alt=""
            fill
            className="object-contain select-none"
            sizes="(max-width: 768px) 300px, 360px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
