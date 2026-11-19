"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { areasWithDistance, nav, services, site } from "@/lib/site";

const groups = ["Mid-Cities", "Fort Worth & West", "Dallas & East", "North Metroplex"] as const;
const byGroup = groups.map((g) => ({
  name: g,
  items: areasWithDistance.filter((a) => a.group === g).sort((a, b) => a.miles - b.miles),
}));

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "areas" | null>(null);
  const [sub, setSub] = useState<"services" | "areas" | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 220 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y < 120) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onScroll = () => setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => {
    setOpen(false);
    setSub(null);
  };

  const linkCls = (href: string) =>
    `relative flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
      isActive(href) ? "text-plum-700" : "text-ink/75 hover:text-plum-700"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-3 pt-3 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:px-6 ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div
          className={`glass-solid mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2.5 transition-all duration-500 sm:pl-6 ${
            scrolled ? "shadow-[0_24px_60px_-24px_rgb(70_21_112/0.45)]" : ""
          }`}
        >
          <Link href="/" aria-label={`${site.name} — ${site.brokerage}, home`} onClick={close}>
            <Image src="/images/logo.png" alt={`${site.name} ${site.brokerage}`} width={612} height={408} priority className="h-12 w-auto sm:h-[58px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              if (item.href === "/services") {
                return (
                  <div key={item.href} className="group relative" data-open={menu === "services"} onMouseEnter={() => setMenu("services")} onMouseLeave={() => setMenu(null)}>
                    <Link href={item.href} onClick={() => setMenu(null)} className={linkCls(item.href)}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[open=true]:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-1/2 top-full w-[26rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-data-[open=true]:visible group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100">
                      <div className="glass-solid grid gap-2 rounded-3xl p-2">
                        {services.map((s) => (
                          <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMenu(null)} className="flex items-center gap-4 rounded-2xl p-2.5 transition-colors hover:bg-plum-50">
                            <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                              <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
                            </span>
                            <span>
                              <span className="block text-[0.65rem] font-extrabold uppercase tracking-widest text-sun-600">{s.kicker}</span>
                              <span className="font-display text-lg font-semibold text-plum-800">{s.title}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              if (item.href === "/areas") {
                return (
                  <div key={item.href} className="group static" data-open={menu === "areas"} onMouseEnter={() => setMenu("areas")} onMouseLeave={() => setMenu(null)}>
                    <Link href={item.href} onClick={() => setMenu(null)} className={linkCls(item.href)}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[open=true]:rotate-180" />
                    </Link>
                    <div className="invisible absolute inset-x-0 top-full translate-y-2 px-3 pt-3 opacity-0 transition-all duration-300 group-data-[open=true]:visible group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100 sm:px-6">
                      <div className="glass-solid mx-auto grid max-w-6xl grid-cols-4 gap-6 rounded-[2rem] p-7">
                        {byGroup.map((g) => (
                          <div key={g.name}>
                            <p className="mb-3 border-b border-plum-100 pb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-sun-600">{g.name}</p>
                            <ul className="space-y-0.5">
                              {g.items.map((a) => (
                                <li key={a.slug}>
                                  <Link href={`/areas/${a.slug}`} onClick={() => setMenu(null)} className="group/a flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold text-ink/80 transition-colors hover:bg-plum-50 hover:text-plum-700">
                                    {a.name}
                                    <span className="text-[0.65rem] font-bold text-ink/35 group-hover/a:text-sun-600">{a.miles === 0 ? "HQ" : `${a.miles} mi`}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href="/areas" onClick={() => setMenu(null)} className="col-span-4 -mb-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-plum-600 to-plum-800 py-3 text-sm font-bold text-white">
                          View all {areasWithDistance.length} areas &amp; the service map →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={linkCls(item.href)}>
                  {item.label}
                  {isActive(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-gradient-to-r from-plum-500 to-sun-500" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="btn btn-ghost hidden !px-4 !py-3 text-sm xl:inline-flex">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link href="/contact" data-magnetic className="btn btn-primary hidden !py-3 text-sm sm:inline-flex">
              Free Consultation
            </Link>
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full bg-plum-700 text-white lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-mist/95 px-6 pb-8 pt-28 backdrop-blur-2xl transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1">
          {nav.map((item, i) => {
            const style = { transitionDelay: open ? `${80 + i * 45}ms` : "0ms" };
            const base = `font-display transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;
            const expandable = item.href === "/services" ? "services" : item.href === "/areas" ? "areas" : null;
            if (!expandable) {
              return (
                <Link key={item.href} href={item.href} onClick={close} style={style} className={`${base} py-1.5 text-3xl font-semibold text-plum-900`}>
                  {item.label}
                </Link>
              );
            }
            const isOpen = sub === expandable;
            return (
              <div key={item.href} style={style} className={base}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={close} className="py-1.5 text-3xl font-semibold text-plum-900">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} menu`}
                    aria-expanded={isOpen}
                    onClick={() => setSub(isOpen ? null : expandable)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-plum-100 text-plum-700"
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    {expandable === "services" ? (
                      <ul className="space-y-1 pb-3 pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} onClick={close} className="block py-1.5 text-xl text-plum-600">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-4 pb-3 pl-3">
                        {byGroup.map((g) => (
                          <div key={g.name}>
                            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-sun-600">{g.name}</p>
                            <ul className="mt-1 grid grid-cols-2 gap-x-3">
                              {g.items.map((a) => (
                                <li key={a.slug}>
                                  <Link href={`/areas/${a.slug}`} onClick={close} className="block py-1 font-sans text-[0.95rem] font-semibold text-plum-700">
                                    {a.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="mt-6 space-y-3">
          <a href={site.phoneHref} className="btn btn-ghost w-full">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Link href="/contact" onClick={close} className="btn btn-sun w-full">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
