import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** Server-side word splitting (masked words) so GSAP never has to mutate React-owned DOM. */
function splitWords(node: ReactNode, cls = ""): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .map((part, i) =>
          part === "" ? null : /^\s+$/.test(part) ? (
            " "
          ) : (
            <span key={i} className="word">
              <span className={`word-inner ${cls}`.trim()}>{part}</span>
            </span>
          ),
        );
    }
    if (isValidElement<{ children?: ReactNode; className?: string }>(child)) {
      const c = child.props.className ?? "";
      const m = c.match(/text-gradient(-light)?/);
      const grad = m ? m[0] : cls;
      return cloneElement(child, { className: c.replace(/text-gradient(-light)?/, "").trim() || undefined }, splitWords(child.props.children, grad));
    }
    return child;
  });
}

export function Split({
  as: Tag = "h2",
  className,
  delay,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-split data-delay={delay} className={className} aria-label={undefined}>
      {splitWords(children)}
    </Tag>
  );
}

/** Image inside an overflow-hidden frame with GSAP scroll parallax. */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  amount = 7,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  amount?: number;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div data-parallax={amount} className="absolute inset-x-0 -inset-y-[9%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <span className="eyebrow" data-reveal="fade">
        {eyebrow}
      </span>
      <Split className="mt-5 text-4xl font-semibold leading-[1.05] text-plum-950 sm:text-5xl lg:text-[3.4rem]">{title}</Split>
      {body && (
        <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/70">
          {body}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  children,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-sun-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-plum-300/30 blur-3xl" />
      <div className={`container-x relative grid items-center gap-12 ${image ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div className="max-w-3xl">
          <span className="eyebrow" data-reveal="fade">
            {eyebrow}
          </span>
          <Split as="h1" className="mt-6 text-5xl font-semibold leading-[1.02] text-plum-950 sm:text-6xl lg:text-7xl">{title}</Split>
          {body && (
            <p data-reveal data-delay="0.25" className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl">
              {body}
            </p>
          )}
          {children && (
            <div data-reveal data-delay="0.4" className="mt-9 flex flex-wrap gap-3">
              {children}
            </div>
          )}
        </div>
        {image && (
          <div data-reveal="scale" data-delay="0.2" className="relative">
            <div aria-hidden className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-plum-400/40 to-sun-400/40 blur-2xl" />
            <ParallaxImage
              src={image}
              alt={imageAlt ?? ""}
              priority
              className="glass relative aspect-[4/3.2] rounded-[2rem] p-0"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to make your move?",
  body = "Tell Gladys what you're looking for — buying, selling or both — and get a clear plan in a relaxed, no-pressure conversation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-3 pb-16 sm:px-6 sm:pb-24">
      <div className="glass-tint relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-white sm:px-14 sm:py-24">
        <div aria-hidden className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-sun-500/40 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-plum-300/40 blur-3xl animate-float" />
        <div className="relative">
          <span className="eyebrow !text-sun-300 before:!bg-sun-400">Let&apos;s talk</span>
          <Split className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">{title}</Split>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            {body}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" data-magnetic className="btn btn-sun">
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} name="faq" className="glass group rounded-3xl open:shadow-xl">
          <summary className="flex items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6">
            <span className="font-display text-lg font-semibold text-plum-900 sm:text-xl">{f.q}</span>
            <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum-100 text-xl font-light leading-none text-plum-700 transition-all duration-300">
              +
            </span>
          </summary>
          <div className="faq-body px-6 pb-6 pr-16 text-ink/70 sm:px-8 sm:pb-8">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-plum-100 bg-white/50 py-5 backdrop-blur [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-plum-800/80">
            {t}
            <span aria-hidden className="h-2 w-2 rotate-45 bg-sun-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
