"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ContactModal from "@/components/contact/ContactModal";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // (Optional) ensure text contrast follows your stage colors; not changed here
  useEffect(() => {
    // When modal is open, the footer toggle will auto-hide via CSS
  }, [open]);

  return (
    <>
      <header className="w-full flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center" aria-label="Go home">
          <Image
            src="/icon.png"
            alt="Theqliq"
            width={70}
            height={36}
            priority
            className="object-contain"
          />
        </Link>

        {/* Center: Tagline */}
        <h1
          className="font-medium"
          style={{
            fontFamily: "Google Sans, sans-serif",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "28px",
            color: "var(--stage-fg, #ffffff)",
            textAlign: "center",
          }}
        >
          Your Brand Can Do Better.
        </h1>

        {/* Right: Let’s talk */}
        <button
          className="font-semibold hover:opacity-80"
          style={{ fontSize: "16px", color: "var(--stage-fg, #ffffff)" }}
          onClick={() => setOpen(true)}
        >
          Let’s talk
        </button>
      </header>

      {/* Contact modal */}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
