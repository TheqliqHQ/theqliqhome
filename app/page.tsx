"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Stage from "@/components/Stage";
import ToggleDock from "@/components/deck/ToggleDock";
import cards from "@/content/cards.json";
import Card from "@/components/deck/Card";
import DeckMountGate from "@/components/deck/DeckMountGate";

const CardDeck = dynamic(() => import("@/components/deck/CardDeck"), { ssr: false });

export default function Page() {
  const params = useSearchParams();
  const firstCard = cards[0];

  // Keep <body data-detail="open"> synced with URL
  useEffect(() => {
    const isOpen = params.has("card");
    if (isOpen) document.body.setAttribute("data-detail", "open");
    else document.body.removeAttribute("data-detail");
  }, [params]);

  return (
    <>
      {/* Fixed header */}
      <div className="app-header fixed inset-x-0 top-0 z-[100] fixed-escape">
        <SiteHeader />
      </div>

      {/* Stage wrapper */}
      <Stage>
        <DeckMountGate>
          <section className="flex items-center justify-center py-6 h-screen">
            <div className="relative w-[240px] h-[336px] md:w-[280px] md:h-[392px] lg:w-[260px] lg:h-[380px]">
              <Card index={0} active data={firstCard as any} />
            </div>
          </section>
        </DeckMountGate>

        {/* Interactive deck layer */}
        <div className="deck-layer absolute inset-0 z-20">
          <CardDeck />
        </div>

        {/* Toggle dock (hidden when data-detail="open") */}
        <div className="toggle-dock fixed bottom-6 left-1/2 -translate-x-1/2 -ml-[40px] z-[200] fixed-escape pointer-events-auto">
          <ToggleDock />
        </div>
      </Stage>

      {/* Fixed footer */}
      <div className="app-footer fixed inset-x-0 bottom-0 z-[100] fixed-escape">
        <SiteFooter />
      </div>
    </>
  );
}
