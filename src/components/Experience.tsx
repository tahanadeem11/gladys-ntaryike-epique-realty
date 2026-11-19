"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let firstRun = true;

/**
 * Global motion layer. Server-rendered markup opts in through data attributes:
 *   data-split · data-reveal[=left|right|scale|fade] · data-delay · data-parallax · data-count
 *   data-magnetic · data-tilt · .spot (pointer spotlight)
 */
export default function Experience() {
  const pathname = usePathname();

  // Smooth scrolling (Lenis) driven by the GSAP ticker
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Pointer effects: spotlight + tilt (delegated, cheap)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const spot = target?.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const tilt = target?.closest<HTMLElement>("[data-tilt]");
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
      }
    };
    const onLeave = (e: PointerEvent) => {
      const tilt = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tilt]");
      if (tilt && !tilt.contains(e.relatedTarget as Node)) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  // Per-route scroll choreography
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const early = firstRun;
    firstRun = false;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.scrollTo(0, { immediate: true });

    let ctx: gsap.Context | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    let timer = 0;
    const animated: Element[] = [];

    // Wait until React has hydrated the page's last DOM node before touching server-rendered markup.
    const hydrated = () => {
      const nodes = document.querySelectorAll("main *");
      const last = nodes[nodes.length - 1];
      return !!last && Object.keys(last).some((k) => k.startsWith("__reactFiber"));
    };

    const begin = (tries = 0) => {
      if (cancelled) return;
      if (!hydrated() && tries < 120) {
        timer = window.setTimeout(() => begin(tries + 1), 80);
        return;
      }
      const beganAt = performance.now();
      // On the very first load, hold the hero reveals until the preloader has faded.
      const earlyDelay = early ? Math.max(0.05, 1.7 - beganAt / 1000) : 0.05;
      const isEarly = () => early && performance.now() - beganAt < 2500;

      ctx = gsap.context(() => {
        gsap.set("[data-split] .word-inner", { y: (_i, t: HTMLElement) => t.offsetHeight * 1.25, rotate: 4, opacity: 1 });

        // Reveal / split / count-up via IntersectionObserver (fires immediately for in-view nodes)
        let batchIndex = 0;
        io = new IntersectionObserver(
          (entries) => {
            batchIndex = 0;
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const el = en.target as HTMLElement;
              io?.unobserve(el);
              animated.push(el);
              const base = (isEarly() ? earlyDelay : 0) + parseFloat(el.dataset.delay ?? "0");

              if (el.hasAttribute("data-split")) {
                gsap.to(el.querySelectorAll(".word-inner"), { y: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: 0.055, delay: base });
              } else if (el.hasAttribute("data-count")) {
                const end = parseFloat(el.dataset.count ?? "0");
                const obj = { v: 0 };
                el.textContent = "0";
                gsap.to(obj, { v: end, duration: 2.2, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(obj.v).toString()) });
              } else {
                gsap.to(el, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: base + batchIndex++ * 0.06 });
              }
            });
          },
          { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
        );
        document.querySelectorAll("[data-split], [data-reveal], [data-count]").forEach((el) => io!.observe(el));

        // Parallax images
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "8");
          gsap.fromTo(
            el,
            { yPercent: -amt },
            { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Magnetic buttons
        if (window.matchMedia("(pointer: fine)").matches) {
          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
            el.addEventListener("pointermove", (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
            });
            el.addEventListener("pointerleave", () => {
              xTo(0);
              yTo(0);
            });
          });
        }
      });
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    };
    begin();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      io?.disconnect();
      animated.forEach((el) => gsap.killTweensOf(el.querySelectorAll?.(".word-inner") ?? el));
      animated.forEach((el) => gsap.killTweensOf(el));
      ctx?.revert();
      // Leave no inline residue behind (React StrictMode re-runs effects in dev).
      gsap.set(".word-inner, [data-reveal], [data-count]", { clearProps: "all" });
    };
  }, [pathname]);

  return null;
}
