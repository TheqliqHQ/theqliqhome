"use client";

import { useEffect, useState } from "react";

/**
 * Renders its children on the server (and for the first paint)
 * then removes them as soon as the client mounts.
 * Perfect for SSR placeholders that must disappear once interactive UI is ready.
 */
export default function DeckMountGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // after hydration, hide the SSR placeholder
    setMounted(true);
  }, []);

  if (mounted) return null;
  return <>{children}</>;
}
