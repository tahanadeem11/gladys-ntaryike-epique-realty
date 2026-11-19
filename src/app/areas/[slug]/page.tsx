import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, Check, Home, MapPin, Phone, Star } from "lucide-react";
import { CtaBand, Faq, PageHero, ParallaxImage, SectionHeading } from "@/components/ui";
import { areaFaqs, areaImage, areaSecondImage, areasWithDistance, getArea, services, site } from "@/lib/site";

export function generateStaticParams() {
  return areasWithDistance.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return {
    title: `${a.name}, TX Real Estate Agent — Buyers & Sellers`,
    description: `Buy or sell in ${a.name}, TX with Gladys Ntaryike of Epique Realty. ${a.blurb}`,
    alternates: { canonical: `/areas/${a.slug}` },
    openGraph: { images: [{ url: areaImage(a.slug) }] },
  };
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();

  const nearby = areasWithDistance
    .filter((x) => x.slug !== a.slug)
    .map((x) => ({ ...x, d: Math.hypot(x.lat - a.lat, (x.lng - a.lng) * 0.84) }))
    .sort((p, q) => p.d - q.d)
    .slice(0, 6);
  const faqs = areaFaqs(a.name);
  const ld = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `Gladys Ntaryike - Epique Realty — ${a.name}, TX`,
    telephone: "+1-682-318-1994",
    areaServed: { "@type": "City", name: `${a.name}, TX` },
    url: `${site.url}/areas/${a.slug}`,
  };

  return (
    <>
      <PageHero
        eyebrow={a.miles === 0 ? "Home base · Tarrant County" : `${a.county} · ≈ ${a.miles} miles from Euless`}
        title={<>Real estate in <span className="text-gradient">{a.name}, TX.</span></>}
        body={a.blurb}
        image={areaImage(a.slug)}
        imageAlt={`Real estate in ${a.name}, TX`}
      >
        <Link href="/contact" data-magnetic className="btn btn-primary">Talk to Gladys <ArrowRight className="h-4 w-4" /></Link>
        <a href={site.phoneHref} className="btn btn-ghost"><Phone className="h-4 w-4" /> {site.phone}</a>
      </PageHero>

      {/* Highlights */}
      <section className="section-y !pt-4">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div data-reveal className="glass rounded-[2rem] p-8 lg:col-span-2">
            <span className="eyebrow">Why {a.name}</span>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {a.highlights.map((h) => (
                <li key={h} className="rounded-2xl bg-white/70 p-5 shadow-sm">
                  <Star className="h-5 w-5 text-sun-500" />
                  <p className="mt-3 font-display text-xl font-semibold leading-snug text-plum-900">{h}</p>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-lg leading-relaxed text-ink/70">
              <b className="text-plum-800">Great for:</b> {a.lifestyle}
            </p>
          </div>
          <div data-reveal data-delay="0.1" className="glass-tint flex flex-col justify-between rounded-[2rem] p-8 text-white">
            <div>
              <MapPin className="h-8 w-8 text-sun-300" />
              <div className="mt-4 font-display text-6xl font-semibold">{a.miles === 0 ? "Local" : `${a.miles} mi`}</div>
              <p className="mt-2 text-white/75">{a.miles === 0 ? "Gladys lives and works in Euless" : "approx. from Euless, TX"}</p>
            </div>
            <p className="mt-8 text-sm text-white/60">{a.county}</p>
          </div>
        </div>
      </section>

      {/* Buy + sell split with imagery */}
      <section className="section-y">
        <div className="container-x space-y-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div data-reveal="left">
              <ParallaxImage src={services[0].image} alt={`Buying a home in ${a.name}`} className="aspect-[4/3.4] rounded-[2.4rem] shadow-2xl" />
            </div>
            <div>
              <span className="eyebrow">Buying in {a.name}</span>
              <h2 data-reveal className="mt-5 text-4xl font-semibold text-plum-950 sm:text-5xl">Find your place in {a.name}.</h2>
              <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/70">
                As your buyer&apos;s agent, Gladys searches the {a.name} market for properties that fit your lifestyle and budget, arranges tours, writes strong offers and negotiates on your behalf.
              </p>
              <ul data-reveal className="mt-6 space-y-3">
                {["Personalized search and new-listing alerts", "Private and virtual tours", "Offer strategy backed by comparable sales", "Inspection, appraisal and closing coordination"].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-semibold text-plum-900">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/services/buyers-agent" className="btn btn-primary mt-8">Buyer&apos;s agent services <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-2" data-reveal="right">
              <ParallaxImage src={areaSecondImage(a.slug)} alt={`Selling a property in ${a.name}`} className="aspect-[4/3.4] rounded-[2.4rem] shadow-2xl" />
            </div>
            <div>
              <span className="eyebrow">Selling in {a.name}</span>
              <h2 data-reveal className="mt-5 text-4xl font-semibold text-plum-950 sm:text-5xl">Sell your {a.name} property with a plan.</h2>
              <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/70">
                As your listing agent, Gladys prices your property using local comparable sales, prepares it for market, promotes it widely and manages showings, offers and closing.
              </p>
              <ul data-reveal className="mt-6 space-y-3">
                {["Comparative market analysis and pricing strategy", "Prep and staging guidance", "Professional marketing and online exposure", "Offer review, negotiation and closing management"].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-semibold text-plum-900">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/services/listing-agent" className="btn btn-primary mt-8">Listing agent services <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Residential + commercial */}
      <section className="section-y !pt-0">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Home, t: "Residential", d: `Single-family homes, townhomes, condos and land in and around ${a.name}.`, img: "/images/neighborhood.webp" },
            { icon: Building2, t: "Commercial", d: `Commercial space and investment property for owners, tenants and investors near ${a.name}.`, img: "/images/commercial-development.webp" },
          ].map((c, i) => (
            <div key={c.t} data-reveal data-delay={i * 0.1}>
              <div className="group relative min-h-[18rem] overflow-hidden rounded-[2.2rem] shadow-xl">
                <Image src={c.img} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <c.icon className="h-7 w-7 text-sun-300" />
                  <h3 className="mt-3 text-3xl font-semibold">{c.t} in {a.name}</h3>
                  <p className="mt-2 max-w-sm text-white/80">{c.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={`${a.name} questions`} />
          <div data-reveal><Faq items={faqs} /></div>
        </div>
      </section>

      {/* Nearby */}
      <section className="section-y !pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Nearby" title="Also explore" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((n, i) => (
              <div key={n.slug} data-reveal data-delay={(i % 3) * 0.08}>
                <Link href={`/areas/${n.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-[1.8rem] shadow-lg">
                  <Image src={areaImage(n.slug)} alt={`Real estate in ${n.name}`} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                    <div>
                      <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-sun-300">≈ {n.miles} mi</span>
                      <h3 className="text-2xl font-semibold">{n.name}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/areas" className="btn btn-ghost">All areas</Link></div>
        </div>
      </section>
      <CtaBand title={`Ready to make a move in ${a.name}?`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
