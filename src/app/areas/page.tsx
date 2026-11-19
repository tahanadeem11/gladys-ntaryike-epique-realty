import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import AreaMap from "@/components/AreaMap";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { alsoServing, areaImage, areasWithDistance } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Serve — Euless, TX & 50 Miles Around",
  description:
    "Real estate services in Euless, Fort Worth, Dallas, Arlington, Grapevine, Southlake, Irving, Plano, Frisco, Denton, McKinney and more — within 50 miles of Euless, TX.",
  alternates: { canonical: "/areas" },
};

const groups = ["Mid-Cities", "Fort Worth & West", "Dallas & East", "North Metroplex"] as const;

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        title={<>Euless, TX &amp; <span className="text-gradient">50 miles</span> around.</>}
        body={`Based in Euless and serving ${areasWithDistance.length}+ communities across the Dallas–Fort Worth Metroplex — wherever your next move takes you.`}
      />

      <section className="pb-16">
        <div className="container-x" data-reveal="scale">
          <AreaMap />
        </div>
      </section>

      <section className="section-y !pt-8">
        <div className="container-x space-y-20">
          {groups.map((g) => {
            const list = areasWithDistance.filter((a) => a.group === g).sort((a, b) => a.miles - b.miles);
            return (
              <div key={g}>
                <SectionHeading eyebrow={`${list.length} communities`} title={g} />
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((a, i) => (
                    <div key={a.slug} data-reveal data-delay={(i % 3) * 0.08}>
                      <Link href={`/areas/${a.slug}`} className="glass spot group flex h-full flex-col overflow-hidden rounded-[1.8rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgb(111_33_166/0.45)]">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image src={areaImage(a.slug)} alt={`Real estate in ${a.name}, TX`} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-sun-700 backdrop-blur">
                            <MapPin className="h-3.5 w-3.5" /> {a.miles === 0 ? "Home base" : `≈ ${a.miles} mi`}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-7">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-3xl font-semibold text-plum-900">{a.name}</h3>
                            <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-plum-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sun-600" />
                          </div>
                          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-plum-500">{a.county}</p>
                          <p className="mt-4 text-sm leading-relaxed text-ink/65">{a.blurb}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-y !pt-0">
        <div className="container-x">
          <div data-reveal className="glass rounded-[2rem] p-8 sm:p-12">
            <span className="eyebrow">Also serving</span>
            <p className="mt-5 text-lg leading-loose text-plum-900">
              {alsoServing.map((c, i) => (
                <span key={c}>
                  <span className="font-semibold">{c}</span>
                  {i < alsoServing.length - 1 && <span className="mx-3 text-sun-500">◆</span>}
                </span>
              ))}
            </p>
            <p className="mt-6 text-ink/60">Don&apos;t see your city? If it&apos;s within about 50 miles of Euless, just ask — Gladys is happy to help.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
