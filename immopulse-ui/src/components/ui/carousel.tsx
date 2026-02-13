"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button";

export function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
      <div className={`relative group ${className}`}>
        {/* Container de défilement */}
        <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        {/* Boutons de navigation - On les affiche au survol ou s'il y a du contenu */}
        <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("left")}
        >
          <ArrowLeft className="size-4" />
        </Button>

        <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll("right")}
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
  );
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
      <div className={`min-w-0 shrink-0 grow-0 basis-full snap-center ${className}`}>
        {children}
      </div>
  );
}