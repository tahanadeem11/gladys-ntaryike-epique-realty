import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, KeyRound, MapPinned, Phone, TrendingUp } from "lucide-react";
import TransactionsBrowser from "@/components/Transactions";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";
import { fmtCompactVolume, stats, transactions } from "@/lib/transactions";

export const metadata: Metadata = {
  title: "Listings & Recently Sold Homes — Gladys Ntaryike",
  description:
    "Browse recently closed home sales handled by Gladys Ntaryike of Epique Realty across Euless, Fort Worth, Dallas and the DFW Metroplex — buyer and seller side.",
  alternates: { canonical: "/listings" },
};

export default function ListingsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recently sold properties — Gladys Ntaryike, Epique Realty",
    numberOfItems: transactions.length,
  };
  const items = [
    { icon: KeyRound, n: stats.closings, s: "", l: "Closed transactions" },
    { icon: TrendingUp, n: null, s: fmtCompactVolume(stats.volume), l: "Total sales volume" },
    { icon: MapPinned, n: stats.cities, s: "", l: "Cities & communities" },
    { icon: Building2, n: stats.sellerSide, s: "", l: `Seller-side · ${stats.buyerSide} buyer-side` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Listings & sales"
        title={<>A track record you can <span className="text-gradient">browse.</span></>}
        body="Recently closed sales across Euless, Fort Worth, Dallas and the Metroplex — for buyers and sellers. See where Gladys has helped clients get the keys, or sell for the right price."
        image="/images/neighborhood.webp"
        imageAlt="Tree-lined street of family homes"
      >
        <Link href="/contact" data-magnetic className="btn btn-primary">Talk to Gladys <ArrowRight className="h-4 w-4" /></Link>
        <a href={site.phoneHref} className="btn btn-ghost"><Phone className="h-4 w-4" /> {site.phone}</a>
      </PageHero>

      <section className="pb-10">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((x, i) => (
            <div key={x.l} data-reveal data-delay={i * 0.08} className="glass rounded-3xl p-6">
              <x.icon className="h-6 w-6 text-sun-500" />
              <div className="mt-3 font-display text-4xl font-semibold text-plum-700 sm:text-5xl">
                {x.n !== null ? <span data-count={x.n}>{x.n}</span> : null}
                <span className={x.n !== null ? "text-sun-500" : ""}>{x.s}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink/65">{x.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y !pt-8">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
          <SectionHeading
            eyebrow="Current listings"
            title={<>Looking for what&apos;s <span className="text-gradient">available now?</span></>}
            body="Active listings change daily. Tell Gladys what you want — area, price range, home type — and she'll send matching homes (including ones that haven't hit the big sites yet)."
          />
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" data-magnetic className="btn btn-sun">Get matched with homes <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/services/buyers-agent" className="btn btn-ghost">How buyer service works</Link>
          </div>
          </div>
          <div data-reveal="right" className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div aria-hidden className="absolute -inset-3 rounded-[2.8rem] bg-gradient-to-br from-plum-400/30 to-sun-400/30 blur-2xl" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2.4rem] shadow-2xl">
              <Image src="/images/tablet-tour.webp" alt="Agent reviewing homes with a couple on a tablet" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-[60%_40%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/50 via-transparent to-transparent" />
            </div>
            <div className="glass absolute -bottom-5 left-5 right-5 rounded-3xl p-4 sm:left-auto sm:right-6 sm:max-w-[16rem]">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-widest text-sun-600">Personalized search</p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug text-plum-900">Area · budget · home type</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y !pt-8">
        <div className="container-x">
          <SectionHeading eyebrow="Recently sold" title={<>Closed sales, <span className="text-gradient">buyer &amp; seller side.</span></>} />
          <div className="mt-12">
            <TransactionsBrowser />
          </div>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink/50">
            Sales shown are transactions closed by Gladys Ntaryike through Epique Realty. “Represented the buyer / seller” indicates which side of the
            transaction Gladys represented. Past results do not guarantee future outcomes. Prices and dates are taken from closing records and may
            not reflect later changes.
          </p>
        </div>
      </section>

      <CtaBand title="Want to add your address to this list?" body="Whether you're buying your next home or selling your current one, Gladys will build a plan around your goals." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
