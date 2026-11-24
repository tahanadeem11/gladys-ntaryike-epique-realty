"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { areas } from "@/lib/site";
import { displayAddress, fmtDate, fmtPrice, photoFor, sideLabel, transactions, years, type Transaction } from "@/lib/transactions";

const cityToArea = new Map(areas.map((a) => [a.name.toLowerCase(), a.slug]));

export function TransactionCard({ t }: { t: Transaction }) {
  const slug = cityToArea.get(t.city.toLowerCase());
  const tone =
    t.side === "Seller" ? "from-sun-500 to-sun-300" : t.side === "Buyer" ? "from-plum-700 to-plum-400" : "from-plum-700 via-[#c2417a] to-sun-400";
  return (
    <article className="glass spot group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgb(111_33_166/0.45)]">
      <div className="relative h-48 overflow-hidden">
        <Image src={photoFor(t)} alt={`${displayAddress(t)}, ${t.city}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-t ${tone} opacity-60 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-md border-2 border-white/90 bg-plum-950/30 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-[0.25em] text-white backdrop-blur-sm [rotate:-4deg]">Sold</span>
        <span className="absolute bottom-3 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-plum-800 backdrop-blur">{t.side === "Buyer & Seller" ? "Both sides" : t.side + " side"}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-3xl font-semibold text-plum-900">{fmtPrice(t.price)}</p>
        <h3 className="mt-2 !font-sans text-base font-bold leading-snug tracking-normal text-ink">{displayAddress(t)}</h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-ink/60">
          <MapPin className="h-3.5 w-3.5 text-sun-500" />
          <span>
            {slug ? (
              <Link href={`/areas/${slug}`} className="hover:text-plum-700 hover:underline">
                {t.city}
              </Link>
            ) : (
              t.city
            )}
            {`, ${t.state} ${t.zip}`}
          </span>
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <span className="rounded-full bg-plum-50 px-3 py-1 text-xs font-bold text-plum-700">{sideLabel(t.side)}</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/55">
            <CalendarDays className="h-3.5 w-3.5" /> Closed {fmtDate(t.closed)}
          </span>
        </div>
      </div>
    </article>
  );
}

const sides = ["All", "Buyer", "Seller"] as const;

export default function TransactionsBrowser() {
  const [side, setSide] = useState<(typeof sides)[number]>("All");
  const [year, setYear] = useState("All");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(9);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return transactions.filter((t) => {
      if (side === "Buyer" && t.side === "Seller") return false;
      if (side === "Seller" && t.side === "Buyer") return false;
      if (year !== "All" && !t.closed.startsWith(year)) return false;
      if (s && !`${t.address} ${t.city} ${t.zip}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [side, year, q]);

  const chip = (on: boolean) =>
    `rounded-full px-4 py-2.5 text-sm font-bold transition-all ${on ? "bg-gradient-to-r from-plum-600 to-plum-800 text-white shadow-lg" : "text-plum-800 hover:bg-white/80"}`;

  return (
    <div>
      <div className="glass flex flex-col gap-4 rounded-[2rem] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by side">
          {sides.map((s) => (
            <button key={s} onClick={() => { setSide(s); setLimit(9); }} aria-pressed={side === s} className={chip(side === s)}>
              {s === "All" ? "All sales" : s === "Buyer" ? "Buyer side" : "Seller side"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by year">
          {["All", ...years].map((y) => (
            <button key={y} onClick={() => { setYear(y); setLimit(9); }} aria-pressed={year === y} className={chip(year === y)}>
              {y === "All" ? "All years" : y}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-64">
          <span className="sr-only">Search by city, street or zip</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-400" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(9); }}
            placeholder="Search city, street or zip"
            className="w-full rounded-full border border-plum-200/70 bg-white/80 py-3 pl-11 pr-4 text-sm outline-none focus:border-plum-500 focus:shadow-[0_0_0_4px_rgb(135_52_193/0.12)]"
          />
        </label>
      </div>

      <p className="mt-6 text-sm font-semibold text-ink/60" aria-live="polite">
        Showing {Math.min(limit, list.length)} of {list.length} closed {list.length === 1 ? "sale" : "sales"}
      </p>

      {list.length === 0 ? (
        <div className="glass mt-6 rounded-[2rem] p-12 text-center text-ink/65">No sales match those filters — try widening your search.</div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, limit).map((t) => (
            <TransactionCard key={t.id} t={t} />
          ))}
        </div>
      )}

      {limit < list.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setLimit((l) => l + 9)} className="btn btn-primary">
            Show more sales
          </button>
        </div>
      )}
    </div>
  );
}
