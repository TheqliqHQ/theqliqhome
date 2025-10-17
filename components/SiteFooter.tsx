"use client";

import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      className="
        w-full px-6 md:px-10 py-4
        grid grid-cols-3 items-center
        bg-transparent border-0 shadow-none outline-none
        [color:var(--stage-fg,#ffffff)]
      "
    >
      {/* Left: logo */}
      <div className="justify-self-start flex items-center gap-3">
        <Link href="/" aria-label="Go home">
          <Image
            src="/logo.png"
            alt="Theqliq"
            width={240}
            height={80}
            priority
            className="h-12 w-auto md:h-14 lg:h-16"
          />
        </Link>
      </div>

      {/* Center: (empty — dock is pinned globally) */}
      <div className="justify-self-center" />

      {/* Right: link */}
      <a href="#" className="justify-self-end text-base md:text-lg hover:underline">
        Privacy
      </a>
    </footer>
  );
}
