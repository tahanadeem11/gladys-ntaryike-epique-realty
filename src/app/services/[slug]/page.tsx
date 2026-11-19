import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { CtaBand, Faq, PageHero, ParallaxImage, SectionHeading } from "@/components/ui";
import { getService, services, site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} in Euless, TX`,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const other = services.find((x) => x.slug !== s.slug)!;

  return (
    <>
      <PageHero eyebrow={s.kicker} title={s.headline} body={s.intro} image={s.image} imageAlt={s.imageAlt}>
        <Link href="/contact" data-magnetic className="btn btn-primary">
          Book a Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={site.phoneHref} className="btn btn-ghost"><Phone className="h-4 w-4" /> {site.phone}</a>
      </PageHero>

      <section className="section-y !pt-8">
        <div className="container-x">
          <div data-reveal className="glass rounded-[2rem] p-7 sm:p-9">
            <span className="eyebrow">Who it&apos;s for</span>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-plum-900 sm:text-3xl">{s.forWho}</p>
          </div>
        </div>
      </section>

      <section className="section-y !pt-8">
        <div className="container-x">
          <SectionHeading eyebrow="Why it matters" title={<>What you get with a <span className="text-gradient">{s.title.toLowerCase()}.</span></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.benefits.map((b, i) => (
              <div key={b.title} data-reveal data-delay={(i % 3) * 0.08}>
                <div className="glass spot h-full rounded-[1.8rem] p-7 transition-all duration-500 hover:-translate-y-1.5">
                  <span className="font-display text-5xl font-semibold text-gradient">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-plum-900">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Step by step" title={<>The {s.title.toLowerCase()} <span className="text-gradient">process.</span></>} />
            <ol className="relative mt-12 space-y-8">
              <span aria-hidden className="absolute bottom-3 left-[1.4rem] top-3 w-px bg-gradient-to-b from-plum-300 via-plum-200 to-sun-300" />
              {s.process.map((p, i) => (
                <li key={p.title} data-reveal className="relative flex gap-6">
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-sun-600 font-display text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgb(247_144_26/0.8)]">
                    {i + 1}
                  </span>
                  <div className="pb-2">
                    <h3 className="text-2xl font-semibold text-plum-900">{p.title}</h3>
                    <p className="mt-1.5 max-w-lg leading-relaxed text-ink/65">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6 lg:sticky lg:top-32">
            <div data-reveal="scale" className="glass-tint rounded-[2rem] p-8 text-white">
              <span className="eyebrow !text-sun-300 before:!bg-sun-400">What&apos;s included</span>
              <ul className="mt-6 space-y-4">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                    <span className="text-white/90">{x}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-sun mt-8 w-full">Request a consultation</Link>
            </div>
            <ParallaxImage src={s.secondImage} alt={s.secondImageAlt} className="aspect-[4/3] rounded-[2rem] shadow-xl" />
          </div>
        </div>
      </section>

      <section className="section-y !pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="In action" title={<>Hands-on help, <span className="text-gradient">every step.</span></>} />
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {s.gallery.map((g, i) => (
              <div key={g.src} data-reveal="scale" data-delay={i * 0.08} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className={`group relative overflow-hidden rounded-[2rem] shadow-xl ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[28rem]" : "aspect-[4/3]"}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={`${s.title}: common questions`} />
          <div data-reveal><Faq items={s.faqs} /></div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-x">
          <Link href={`/services/${other.slug}`} className="glass group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="relative z-10">
              <span className="eyebrow">Also offering</span>
              <h3 className="mt-3 text-3xl font-semibold text-plum-900">{other.title}</h3>
              <p className="mt-2 max-w-xl text-ink/65">{other.short}</p>
            </div>
            <div className="relative hidden h-28 w-44 shrink-0 overflow-hidden rounded-2xl sm:block">
              <Image src={other.image} alt="" fill sizes="176px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <span className="btn btn-primary relative z-10">View service <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
