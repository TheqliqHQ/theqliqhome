// components/DetailFlag.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Keeps body[data-detail="open"] in sync with ?card=... in the URL.
 * Place this once in your tree (page or layout).
 */
export default function DetailFlag() {
  const params = useSearchParams();

  useEffect(() => {
    const isOpen = params.has("card");
    if (isOpen) {
      document.body.dataset.detail = "open";
    } else {
      delete (document.body.dataset as any).detail;
    }
  }, [params]);

  return null;
}
