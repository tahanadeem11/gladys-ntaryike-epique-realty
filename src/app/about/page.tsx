import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, Lightbulb, MapPin, ShieldCheck } from "lucide-react";
import { CtaBand, PageHero, ParallaxImage, SectionHeading, Split } from "@/components/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Gladys Ntaryike — Epique Realty",
  description: "Meet Gladys Ntaryike of Epique Realty — a Euless, TX real estate agent serving residential and commercial buyers and sellers across Dallas–Fort Worth.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: HeartHandshake, title: "Client-first, always", body: "Your goals set the agenda. Every recommendation is made with your best interests in mind." },
  { icon: Eye, title: "Radical transparency", body: "Clear numbers, honest opinions and no surprises — even when the news isn't what you hoped for." },
  { icon: Lightbulb, title: "Smart strategy", body: "Local data and thoughtful planning guide pricing, offers and negotiation." },
  { icon: ShieldCheck, title: "Integrity & care", body: "Real estate is personal. Every client is treated with respect, patience and professionalism." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Meet <span className="text-gradient">Gladys.</span></>}
        body="A Euless-based real estate professional with Epique Realty, helping buyers and sellers across Dallas–Fort Worth make confident moves in residential and commercial property."
        image="/images/keys-handshake.webp"
        imageAlt="Agent shaking hands with new homeowners holding keys"
      >
        <Link href="/contact" data-magnetic className="btn btn-primary">Work with Gladys <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="My approach" title={<>Real estate is about <span className="text-gradient">people</span> first.</>} />
            <div data-reveal className="mt-7 space-y-5 text-lg leading-relaxed text-ink/70">
              <p>
                Behind every address is a life decision — a growing family, a new career, a retirement, a business expanding. Gladys approaches each
                transaction with that in mind: listening first, then building a plan that fits your goals, timeline and budget.
              </p>
              <p>
                As a local agent rooted in Euless, she knows the Mid-Cities and the wider Metroplex street by street — and brings that knowledge, along with
                firm negotiation and attentive communication, to both buyers and sellers.
              </p>
              <p>
                Whether you&apos;re touring your first home, listing a family property or exploring commercial space, you&apos;ll have a trusted guide beside you
                from the first call to closing day.
              </p>
            </div>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              {["Residential", "Commercial", "Buyer representation", "Seller representation"].map((t) => (
                <span key={t} className="glass rounded-full px-4 py-2 text-sm font-bold text-plum-800">{t}</span>
              ))}
            </div>
          </div>
          <div data-reveal="right" className="relative">
            <ParallaxImage src="/images/walkthrough.webp" alt="Agent walking a couple through a bright home" className="aspect-[4/4.6] rounded-[2.4rem] shadow-2xl" />
            <div className="glass absolute -bottom-6 left-4 flex items-center gap-3 rounded-3xl p-4 pr-6 animate-float-slow sm:left-[-1.5rem]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sun-400 to-sun-600 text-white"><MapPin className="h-6 w-6" /></span>
              <div><b className="block text-plum-900">Based in Euless, TX</b><span className="text-sm text-ink/60">Serving 50 miles around</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="What guides the work" title={<>Values that <span className="text-gradient">shape every deal.</span></>} align="center" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} data-reveal data-delay={i * 0.08}>
                <div className="glass spot group h-full rounded-[1.8rem] p-7 transition-all duration-500 hover:-translate-y-1.5">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-plum-500 to-plum-800 p-3.5 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-plum-900">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y !pt-0">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {[
            { src: "/images/neighborhood.webp", t: "Residential", d: "Homes for every stage of life." },
            { src: "/images/commercial-model.webp", t: "Commercial", d: "Space for business and investment." },
            { src: "/images/investment-growth.webp", t: "Investment", d: "Guidance for building long-term value." },
          ].map((c, i) => (
            <div key={c.t} data-reveal data-delay={i * 0.1}>
              <div className="group relative aspect-[4/4.4] overflow-hidden rounded-[2rem] shadow-xl">
                <Image src={c.src} alt={c.t} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-3xl font-semibold">{c.t}</h3>
                  <p className="mt-1 text-white/80">{c.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div data-reveal="scale" className="mx-auto w-full max-w-sm">
                <Image src="/images/logo.png" alt="Gladys Ntaryike Epique Realty logo" width={612} height={408} className="h-auto w-full" />
              </div>
              <div>
                <span className="eyebrow">Epique Realty</span>
                <Split className="mt-5 text-4xl font-semibold text-plum-950 sm:text-5xl">Backed by a brokerage built for modern real estate.</Split>
                <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/70">
                  Gladys works under the Epique Realty brokerage, combining personal, one-on-one service with the tools and support needed for smooth
                  residential and commercial transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
