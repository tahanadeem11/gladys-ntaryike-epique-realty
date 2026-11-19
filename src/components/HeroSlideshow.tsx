"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/modern-skyline.webp", alt: "Modern home with a city skyline behind it", label: "Residential & Commercial", pos: "70% 50%" },
  { src: "/images/neighborhood.webp", alt: "Tree-lined suburban street of family homes", label: "Euless & 50 miles around", pos: "50% 60%" },
  { src: "/images/tablet-tour.webp", alt: "Agent walking a smiling couple through a home", label: "Buyer's Agent", pos: "60% 40%" },
  { src: "/images/move-in-handshake.webp", alt: "Agent shaking hands with new homeowners", label: "Closing with confidence", pos: "50% 45%" },
  { src: "/images/sell-prep.webp", alt: "Model home presented to a client", label: "Listing Agent", pos: "55% 55%" },
];

export default function HeroSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(t);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden bg-plum-950" aria-hidden>
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${idx === i ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              style={{ objectPosition: s.pos }}
              className={`object-cover ${idx === i ? "animate-[kenburns_9s_ease-out_forwards]" : ""}`}
            />
          </div>
        ))}
        {/* Readability overlays tinted with the brand palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-plum-950/85 via-plum-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-plum-950/30" />
        <div className="absolute inset-0 mix-blend-soft-light [background:radial-gradient(60rem_30rem_at_90%_100%,rgb(247_144_26/0.45),transparent_60%)]" />
      </div>

      {/* Slide indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 sm:bottom-9">
        <div className="container-x flex items-center justify-between gap-6">
          <div className="glass !border-white/25 !bg-white/15 !from-white/20 !to-white/5 flex items-center gap-3 rounded-full px-4 py-2.5 !shadow-none" aria-live="polite">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sun-400" />
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">{slides[i].label}</span>
          </div>
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, idx) => (
              <button
                key={s.src}
                role="tab"
                aria-selected={idx === i}
                aria-label={`Show slide ${idx + 1}: ${s.label}`}
                onClick={() => setI(idx)}
                className="group relative h-6 w-9"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded bg-white/30">
                  <span
                    key={idx === i ? `on-${i}` : `off-${idx}`}
                    className={`block h-full origin-left rounded bg-sun-400 ${idx === i ? "animate-[bar_6.5s_linear_forwards]" : "scale-x-0"}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
