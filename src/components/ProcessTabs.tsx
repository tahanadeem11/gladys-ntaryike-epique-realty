"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site";

export default function ProcessTabs() {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const svc = services[tab];
  const cur = svc.process[step];

  return (
    <div>
      <div role="tablist" aria-label="Choose your journey" className="glass mx-auto flex w-fit gap-1 rounded-full p-1.5">
        {services.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={tab === i}
            onClick={() => {
              setTab(i);
              setStep(0);
            }}
            className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
              tab === i ? "bg-gradient-to-r from-plum-600 to-plum-800 text-white shadow-lg" : "text-plum-800 hover:bg-white/70"
            }`}
          >
            {i === 0 ? "I'm buying" : "I'm selling"}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ol className="relative space-y-2 pl-2">
          <span aria-hidden className="absolute bottom-6 left-[1.65rem] top-6 w-px bg-gradient-to-b from-plum-300 to-sun-300" />
          {svc.process.map((p, i) => (
            <li key={p.title}>
              <button
                onClick={() => setStep(i)}
                onMouseEnter={() => setStep(i)}
                aria-current={step === i}
                className={`group relative flex w-full items-center gap-5 rounded-2xl p-3 text-left transition-all duration-300 ${step === i ? "bg-white/80 shadow-lg" : "hover:bg-white/50"}`}
              >
                <span
                  className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold transition-all duration-300 ${
                    step === i ? "scale-110 bg-gradient-to-br from-sun-400 to-sun-600 text-white shadow-[0_8px_20px_-6px_rgb(247_144_26/0.8)]" : "bg-plum-100 text-plum-700"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`font-display text-xl font-semibold transition-colors ${step === i ? "text-plum-900" : "text-plum-700/80"}`}>{p.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div key={`${tab}-${step}`} className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12" style={{ animation: "page-in .6s var(--ease-out-expo) both" }}>
          <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[12rem] font-bold leading-none text-plum-100">
            {step + 1}
          </span>
          <div className="relative">
            <span className="eyebrow">{svc.kicker}</span>
            <h3 className="mt-5 text-3xl font-semibold text-plum-900 sm:text-4xl">{cur.title}</h3>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/70">{cur.body}</p>
            <div className="mt-8 flex items-center gap-1.5" aria-hidden>
              {svc.process.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-10 bg-gradient-to-r from-plum-500 to-sun-500" : "w-4 bg-plum-100"}`} />
              ))}
            </div>
            <Link href={`/services/${svc.slug}`} className="mt-8 inline-flex items-center gap-2 font-bold text-plum-700 hover:text-sun-600">
              See the full {svc.title.toLowerCase()} service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
