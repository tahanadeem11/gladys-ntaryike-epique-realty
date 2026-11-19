import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, PageHero, ParallaxImage, SectionHeading, Split } from "@/components/ui";
import ProcessTabs from "@/components/ProcessTabs";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate Services — Buyer's Agent & Listing Agent",
  description: "Buyer's agent and listing agent services for residential and commercial property in Euless, TX and the Dallas–Fort Worth area.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Expert guidance for <span className="text-gradient">every side</span> of the deal.</>}
        body="Buying or selling, residential or commercial — Gladys brings strategy, local insight and genuine care to every transaction."
      >
        <Link href="/contact" data-magnetic className="btn btn-primary">Get started <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="pb-8">
        <div className="container-x space-y-24">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-12 lg:grid-cols-2">
              <div data-reveal={i % 2 ? "right" : "left"} className={i % 2 ? "lg:order-2" : ""}>
                <ParallaxImage src={s.image} alt={s.imageAlt} className="aspect-[4/3.4] rounded-[2.4rem] shadow-2xl" />
              </div>
              <div>
                <span className="eyebrow">{s.kicker}</span>
                <Split className="mt-5 text-4xl font-semibold text-plum-950 sm:text-5xl">{s.title}</Split>
                <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/70">{s.intro}</p>
                <ul data-reveal className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.includes.slice(0, 4).map((x) => (
                    <li key={x} className="flex items-start gap-3 text-sm font-semibold text-plum-900">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun-500 text-white"><Check className="h-3 w-3" /></span>
                      {x}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} data-magnetic className="btn btn-primary mt-9">
                  Learn about {s.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="The process" title={<>What working together <span className="text-gradient">looks like.</span></>} align="center" />
          <div className="mt-14"><ProcessTabs /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
