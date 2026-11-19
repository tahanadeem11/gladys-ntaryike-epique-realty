import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, Check, Compass, Handshake, KeyRound, MessageCircleHeart, Phone, ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";
import AreaMap from "@/components/AreaMap";
import ProcessTabs from "@/components/ProcessTabs";
import Calculator from "@/components/Calculator";
import { CtaBand, Faq, Marquee, ParallaxImage, SectionHeading, Split } from "@/components/ui";
import { areaImage, areasWithDistance, faqs, services, site } from "@/lib/site";

const why = [
  { icon: Compass, title: "Local expertise", body: "Deep knowledge of Euless and every community within 50 miles — pricing, trends and hidden gems.", span: "lg:col-span-2" },
  { icon: Handshake, title: "Fierce negotiation", body: "Your goals drive every offer, counter and concession.", span: "" },
  { icon: MessageCircleHeart, title: "Honest communication", body: "Straight answers, fast replies, zero jargon.", span: "" },
  { icon: Building2, title: "Residential & commercial", body: "Homes, condos, land and commercial space — one trusted agent for every kind of deal, on both sides of the table.", span: "lg:col-span-2" },
  { icon: ShieldCheck, title: "Protected every step", body: "Contracts, deadlines and due diligence handled with care.", span: "" },
  { icon: TrendingUp, title: "Strategy first", body: "Data-backed pricing and planning, not guesswork.", span: "" },
];

const featuredAreas = ["euless", "southlake", "grapevine", "fort-worth", "dallas", "frisco"] as const;

export default function HomePage() {
  const cityNames = areasWithDistance.map((a) => a.name);
  const featured = featuredAreas.map((s) => areasWithDistance.find((a) => a.slug === s)!);

  return (
    <>
      {/* ───────── HERO (image slideshow) ───────── */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-28 pt-36 text-white">
        <HeroSlideshow />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="glass !border-white/25 !bg-white/15 !from-white/20 !to-white/5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white !shadow-none" data-reveal="fade" data-delay="0.1">
              <Sparkles className="h-3.5 w-3.5 text-sun-400" /> Residential &amp; Commercial · Euless, TX
            </span>
            <Split as="h1" delay="0.15" className="mt-7 text-[2.9rem] font-semibold leading-[0.98] sm:text-7xl xl:text-[5.6rem]">
              Your next chapter starts with the <span className="text-gradient-light">right key.</span>
            </Split>
            <p data-reveal data-delay="0.4" className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Gladys Ntaryike of Epique Realty guides buyers and sellers across Euless and the Dallas–Fort Worth Metroplex — with local insight, sharp
              negotiation and a calm, personal touch.
            </p>
            <div data-reveal data-delay="0.55" className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/contact" data-magnetic className="btn btn-sun !px-7 !py-4">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} data-magnetic className="btn border border-white/35 bg-white/10 !px-7 !py-4 text-white backdrop-blur hover:bg-white/20">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </div>
            <ul data-reveal data-delay="0.7" className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-white/90">
              {["Buyers & Sellers", "Residential & Commercial", "50-mile coverage"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-sun-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Marquee items={cityNames} />

      {/* ───────── ABOUT ───────── */}
      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative" data-reveal="left">
            <ParallaxImage src="/images/agent-presents-home.webp" alt="Real estate agent presenting a home" className="aspect-[4/4.6] rounded-[2.4rem] shadow-2xl" amount={8} />
            <div className="absolute -bottom-8 -right-3 hidden w-[55%] overflow-hidden rounded-[1.8rem] border-[6px] border-white shadow-2xl sm:block">
              <div className="relative aspect-[4/3]">
                <Image src="/images/keys-handshake.webp" alt="New homeowners receiving their keys" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
            <div className="glass absolute -left-3 top-8 rounded-3xl p-5 animate-float-slow">
              <KeyRound className="h-7 w-7 text-sun-500" />
              <div className="mt-2 font-display text-xl font-semibold text-plum-900">Keys in hand</div>
              <div className="text-sm font-semibold text-ink/60">Start to finish</div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="About Gladys"
              title={<>A trusted partner, <span className="text-gradient">not just a transaction.</span></>}
            />
            <div data-reveal className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
              <p>
                Gladys Ntaryike is a Euless-based real estate professional with Epique Realty, helping buyers and sellers make confident moves across
                residential and commercial property in the Dallas–Fort Worth Metroplex.
              </p>
              <p>
                Every client gets a plan built around their goals, timeline and budget — plus honest advice, firm negotiation and attentive
                communication from the first call to closing day.
              </p>
            </div>
            <ul data-reveal className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Buyer & seller representation", "Residential & commercial", "Local to Euless, TX", "Clear, jargon-free guidance"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[0.95rem] font-bold text-plum-900">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <Link href="/about" data-magnetic className="btn btn-primary">Meet Gladys <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn btn-ghost">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title={<>Two ways to win. <span className="text-gradient">One dedicated agent.</span></>}
            body="Whether you're finding a place to call home or selling one for the best price, you get a true advocate from first conversation to final signature."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {services.map((s, i) => (
              <div key={s.slug} data-reveal data-delay={i * 0.12}>
                <Link href={`/services/${s.slug}`} data-tilt className="group relative block overflow-hidden rounded-[2.2rem] shadow-[0_30px_70px_-30px_rgb(70_21_112/0.5)]">
                  <div className="relative aspect-[4/4.4] sm:aspect-[4/3.4]">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <div className="glass !border-white/20 !bg-white/12 !from-white/20 !to-white/5 rounded-3xl p-6 text-white !shadow-none">
                        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sun-300">{s.kicker}</span>
                        <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">{s.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{s.short}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sun-300">
                          Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ───────── */}
      <section className="section-y relative">
        <div className="container-x">
          <SectionHeading eyebrow="The Epique difference" title={<>Real estate, <span className="text-gradient">elevated.</span></>} body="A personal, high-touch experience backed by local knowledge and smart strategy." align="center" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <div key={w.title} data-reveal data-delay={(i % 4) * 0.08} className={w.span}>
                <div className="glass spot group h-full rounded-[1.8rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgb(111_33_166/0.45)]">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-plum-500 to-plum-800 p-3.5 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-plum-900">{w.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── RESIDENTIAL & COMMERCIAL ───────── */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div data-reveal="left" className="group relative min-h-[26rem] overflow-hidden rounded-[2.4rem] shadow-2xl">
              <Image src="/images/neighborhood.webp" alt="Family homes on a quiet residential street" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <span className="eyebrow !text-sun-300 before:!bg-sun-400">Residential</span>
                <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">Homes for every chapter</h3>
                <p className="mt-3 max-w-md text-white/80">Starter homes, move-up properties, condos, townhomes and land — find the right fit or sell for the right price.</p>
              </div>
            </div>
            <div className="grid gap-5">
              <div data-reveal="right" className="group relative min-h-[16rem] overflow-hidden rounded-[2.4rem] shadow-2xl">
                <Image src="/images/commercial-development.webp" alt="Model of a commercial development" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="eyebrow !text-sun-300 before:!bg-sun-400">Commercial</span>
                  <h3 className="mt-2 text-2xl font-semibold">Space for business &amp; investment</h3>
                </div>
              </div>
              <div data-reveal="right" data-delay="0.1" className="glass flex items-center gap-5 rounded-[2.4rem] p-5">
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
                  <Image src="/images/investment-growth.webp" alt="Coins stacked beside a model house" fill sizes="112px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-plum-900">Investors welcome</h3>
                  <p className="mt-1 text-sm text-ink/65">Thoughtful guidance for buying, holding and selling investment property.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={<>A clear path from <span className="text-gradient">hello to keys.</span></>} body="Pick your journey to see exactly what to expect at each stage." align="center" />
          <div className="mt-14">
            <ProcessTabs />
          </div>
        </div>
      </section>

      {/* ───────── STATS BAND ───────── */}
      <section className="px-3 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
          <Image src="/images/model-homes-handshake.webp" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-plum-950/92 via-plum-900/85 to-plum-800/75" />
          <dl className="relative grid grid-cols-2 gap-8 px-6 py-14 text-center text-white sm:px-14 lg:grid-cols-4">
            {[
              { n: 50, s: "mi", l: "Service radius from Euless" },
              { n: areasWithDistance.length, s: "+", l: "Communities served" },
              { n: 2, s: "", l: "Sides of the deal: buying & selling" },
              { n: 1, s: "", l: "Dedicated agent, start to finish" },
            ].map((x) => (
              <div key={x.l}>
                <dt className="font-display text-5xl font-semibold sm:text-6xl">
                  <span data-count={x.n}>{x.n}</span>
                  <span className="text-sun-400">{x.s}</span>
                </dt>
                <dd className="mt-2 text-sm font-semibold text-white/75">{x.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── AREAS ───────── */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Areas we serve" title={<>Rooted in Euless. <span className="text-gradient">Reaching 50 miles.</span></>} body="From the Mid-Cities to downtown Dallas and Fort Worth, north to McKinney and Denton, west to Weatherford — explore the communities Gladys serves." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a, i) => (
              <div key={a.slug} data-reveal data-delay={(i % 3) * 0.08}>
                <Link href={`/areas/${a.slug}`} className="group relative block aspect-[4/3.3] overflow-hidden rounded-[2rem] shadow-xl">
                  <Image src={areaImage(a.slug)} alt={`Real estate in ${a.name}, TX`} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                    <div>
                      <span className="text-[0.68rem] font-extrabold uppercase tracking-widest text-sun-300">{a.miles === 0 ? "Home base" : `≈ ${a.miles} mi from Euless`}</span>
                      <h3 className="text-3xl font-semibold">{a.name}</h3>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 backdrop-blur transition-all group-hover:bg-sun-500">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16" data-reveal="scale">
            <AreaMap compact />
          </div>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-2.5">
            {areasWithDistance.slice(0, 14).map((a) => (
              <Link key={a.slug} href={`/areas/${a.slug}`} className="glass rounded-full px-4 py-2 text-sm font-bold text-plum-800 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-sun-600">
                {a.name}
              </Link>
            ))}
            <Link href="/areas" className="btn btn-sun !px-5 !py-2.5 text-sm">
              All {areasWithDistance.length} areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── CALCULATOR ───────── */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Plan your budget" title={<>What will your <span className="text-gradient">monthly payment</span> look like?</>} body="Play with the numbers to see an estimate including principal, interest, taxes and insurance." />
          <div className="mt-12" data-reveal>
            <Calculator />
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="FAQ" title="Questions? Answered." body="The essentials on working with Gladys. Need more? Just reach out." />
            <div data-reveal className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl lg:block">
              <Image src="/images/hallway-tour.webp" alt="Agent answering questions during a home tour" fill sizes="30vw" className="object-cover" />
            </div>
            <Link href="/faq" className="mt-8 inline-flex items-center gap-2 font-bold text-plum-700 hover:text-sun-600">
              More questions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal>
            <Faq items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
