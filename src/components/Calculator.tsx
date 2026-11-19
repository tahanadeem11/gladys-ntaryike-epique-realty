"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Slider({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string;
}) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-bold text-plum-900">
        {label}
        <span className="font-display text-lg text-plum-700">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--p": `${p}%` } as React.CSSProperties}
        className="mt-3 w-full"
      />
    </label>
  );
}

export default function Calculator() {
  const [price, setPrice] = useState(450000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(2.0);
  const [insurance, setInsurance] = useState(2400);

  const r = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = price - down;
    const n = term * 12;
    const mr = rate / 100 / 12;
    const pi = mr === 0 ? loan / n : (loan * mr) / (1 - Math.pow(1 + mr, -n));
    const tax = (price * taxRate) / 100 / 12;
    const ins = insurance / 12;
    const total = pi + tax + ins;
    return { down, loan, pi, tax, ins, total };
  }, [price, downPct, rate, term, taxRate, insurance]);

  // Donut segments
  const R = 78;
  const CIRC = 2 * Math.PI * R;
  const segs = [
    { v: r.pi, c: "#6f21a6", l: "Principal & interest" },
    { v: r.tax, c: "#f7901a", l: "Property tax" },
    { v: r.ins, c: "#c498e7", l: "Insurance" },
  ];
  let offset = 0;

  return (
    <div className="glass grid gap-10 rounded-[2.5rem] p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
      <div className="space-y-7">
        <Slider label="Home price" value={price} min={100000} max={2000000} step={5000} onChange={setPrice} display={fmt(price)} />
        <Slider label="Down payment" value={downPct} min={0} max={50} step={1} onChange={setDownPct} display={`${downPct}% · ${fmt(r.down)}`} />
        <Slider label="Interest rate" value={rate} min={2} max={10} step={0.05} onChange={setRate} display={`${rate.toFixed(2)}%`} />
        <div>
          <span className="text-sm font-bold text-plum-900">Loan term</span>
          <div className="mt-3 flex gap-2">
            {[15, 20, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-bold transition-all ${term === t ? "border-transparent bg-gradient-to-r from-plum-600 to-plum-800 text-white shadow-lg" : "border-plum-200 bg-white/60 text-plum-800 hover:bg-white"}`}
              >
                {t} years
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <Slider label="Property tax rate" value={taxRate} min={0.5} max={3.5} step={0.05} onChange={setTaxRate} display={`${taxRate.toFixed(2)}%`} />
          <Slider label="Home insurance / yr" value={insurance} min={600} max={8000} step={100} onChange={setInsurance} display={fmt(insurance)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-br from-plum-700 to-plum-950 p-8 text-white">
        <div className="relative h-52 w-52">
          <svg viewBox="0 0 200 200" className="-rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="22" />
            {segs.map((s) => {
              const len = (s.v / r.total) * CIRC;
              const el = (
                <circle
                  key={s.l}
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  stroke={s.c}
                  strokeWidth="22"
                  strokeDasharray={`${Math.max(len - 3, 0)} ${CIRC}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                  style={{ transition: "all .5s var(--ease-out-expo)" }}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">Est. monthly</div>
              <div className="font-display text-4xl font-semibold" aria-live="polite">{fmt(r.total)}</div>
            </div>
          </div>
        </div>
        <ul className="mt-8 w-full space-y-3 text-sm">
          {segs.map((s) => (
            <li key={s.l} className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-white/80">
                <span className="h-3 w-3 rounded-full" style={{ background: s.c }} /> {s.l}
              </span>
              <span className="font-bold">{fmt(s.v)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between border-t border-white/15 pt-3 text-white/80">
            <span>Loan amount</span>
            <span className="font-bold text-white">{fmt(r.loan)}</span>
          </li>
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-white/50">
          Estimates only — not a loan offer. Taxes and insurance vary by property; MI/HOA not included. Ask Gladys for an introduction to a trusted local lender.
        </p>
      </div>
    </div>
  );
}
