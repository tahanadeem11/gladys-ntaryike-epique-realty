import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { areasWithDistance, footerLinks, nav, services, site } from "@/lib/site";

async function getYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getYear();
  const featured = areasWithDistance.filter((a) => a.miles <= 20).slice(0, 8);

  return (
    <footer className="relative mt-auto border-t border-plum-100 bg-white/60 backdrop-blur-xl">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/images/logo.png" alt={`${site.name} ${site.brokerage}`} width={612} height={408} className="-ml-3 h-32 w-auto" />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/70">
            Residential &amp; commercial real estate for buyers and sellers in Euless, TX and the surrounding 50 miles.
          </p>
          <ul className="mt-6 space-y-3 text-sm font-medium">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-plum-600">
                <Phone className="h-4 w-4 text-sun-500" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-plum-600">
                <Mail className="h-4 w-4 shrink-0 text-sun-500" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-sun-500" /> {site.city}, {site.state} {site.zip}
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-plum-700">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink/70 transition-colors hover:text-plum-600">
                  {n.label}
                </Link>
              </li>
            ))}
            {footerLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink/70 transition-colors hover:text-plum-600">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-plum-700">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ink/70 transition-colors hover:text-plum-600">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-plum-700">Focus</h2>
          <p className="mt-3 text-sm text-ink/70">Residential · Commercial · Buyers · Sellers</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-plum-700">Areas We Serve</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {featured.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="text-ink/70 transition-colors hover:text-plum-600">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/areas" className="mt-4 inline-block text-sm font-bold text-sun-600 hover:text-plum-600">
            View all areas →
          </Link>
        </div>
      </div>

      <div className="border-t border-plum-100">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink/60 sm:flex-row">
          <p>
            © {year} {site.name} · {site.brokerage}. All rights reserved.
          </p>
          <p>Equal Housing Opportunity. Serving Euless, TX &amp; the Dallas–Fort Worth Metroplex.</p>
        </div>
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pb-6 text-xs font-semibold text-plum-700">
          <Link href="/iabs" className="underline-offset-4 hover:underline">Texas Real Estate Commission: Information About Brokerage Services</Link>
          <a href="https://www.trec.texas.gov" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">TREC Consumer Protection Notice</a>
        </div>
        <div className="border-t border-plum-100 bg-plum-50/60">
          <p className="container-x py-4 text-center text-xs font-semibold text-ink/60">
            © Copyright {year}{" "}
            <a href="http://nextlevelrankers.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-plum-700 underline-offset-4 hover:text-sun-600 hover:underline">
              Powered By Next Level Rankers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
