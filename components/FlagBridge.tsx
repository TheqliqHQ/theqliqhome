// components/FlagBridge.tsx
"use client";

import { useEffect } from "react";

/**
 * Small client-only bridge that keeps <body> data-attributes in sync
 * with the current URL (and optional custom events) so CSS can react.
 *
 * - Sets body[data-detail="open"] when ?card=... is in the URL
 * - Listens to custom events deck:detail-open / deck:detail-close
 * - (Optional) sets stage colors if you ever emit deck:stage-colors
 */
export default function FlagBridge() {
  useEffect(() => {
    const setDetailFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const isOpen = params.has("card");
      if (isOpen) {
        document.body.dataset.detail = "open";
      } else {
        delete (document.body.dataset as any).detail;
      }
    };

    // Initial sync and on navigation changes (Next 13/14 client navs)
    setDetailFromUrl();
    const onPop = () => setDetailFromUrl();
    window.addEventListener("popstate", onPop);
    window.addEventListener("pushstate", setDetailFromUrl as any);
    window.addEventListener("replacestate", setDetailFromUrl as any);

    // Optional: allow imperative open/close via custom events
    const onOpen = () => (document.body.dataset.detail = "open");
    const onClose = () => delete (document.body.dataset as any).detail;

    window.addEventListener("deck:detail-open", onOpen as any);
    window.addEventListener("deck:detail-close", onClose as any);

    // Optional: stage color updates
    const onStageColors = (e: Event) => {
      const detail = (e as CustomEvent<{ bg?: string; fg?: string }>).detail || {};
      if (detail.bg) document.documentElement.style.setProperty("--stage-bg", detail.bg);
      if (detail.fg) document.documentElement.style.setProperty("--stage-fg", detail.fg);
    };
    window.addEventListener("deck:stage-colors", onStageColors as any);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pushstate", setDetailFromUrl as any);
      window.removeEventListener("replacestate", setDetailFromUrl as any);

      window.removeEventListener("deck:detail-open", onOpen as any);
      window.removeEventListener("deck:detail-close", onClose as any);
      window.removeEventListener("deck:stage-colors", onStageColors as any);
    };
  }, []);

  return null;
}
