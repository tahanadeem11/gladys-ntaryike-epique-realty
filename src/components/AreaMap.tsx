"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { areasWithDistance, offsetMiles } from "@/lib/site";

const C = 300;
const PX = 5.45; // px per mile (50 mi ≈ 272 px)
const ALWAYS_LABEL = new Set([
  "euless", "fort-worth", "dallas", "arlington", "denton", "frisco", "mckinney", "weatherford", "southlake", "irving", "mansfield", "plano", "burleson",
]);

const points = areasWithDistance.map((a) => {
  const o = offsetMiles(a.lat, a.lng);
  return { ...a, x: C + o.x * PX, y: C - o.y * PX };
});

export default function AreaMap({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string>("euless");
  const current = points.find((p) => p.slug === active) ?? points[0];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="glass relative aspect-square w-full overflow-hidden rounded-[2.5rem] p-2 sm:p-4">
        <svg viewBox="0 0 600 600" role="img" aria-label="Map of service area: 50 miles around Euless, TX" className="h-full w-full">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f7901a" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#8734c1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8734c1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#f7901a" stopOpacity="0" />
              <stop offset="1" stopColor="#f7901a" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <circle cx={C} cy={C} r={PX * 50} fill="url(#mapGlow)" />
          {[10, 25, 50].map((m) => (
            <g key={m}>
              <circle cx={C} cy={C} r={PX * m} fill="none" stroke="#6f21a6" strokeOpacity={m === 50 ? 0.5 : 0.22} strokeDasharray={m === 50 ? "2 7" : "4 6"} strokeWidth={m === 50 ? 2 : 1} strokeLinecap="round" />
              <text x={C + PX * m * 0.7071 + 4} y={C - PX * m * 0.7071 - 4} fontSize="11" fontWeight="700" fill="#6f21a6" opacity="0.7">
                {m} mi
              </text>
            </g>
          ))}
          {/* radar sweep */}
          <g className="origin-center animate-spin-slow" style={{ transformOrigin: `${C}px ${C}px` }}>
            <path d={`M ${C} ${C} L ${C + PX * 50} ${C} A ${PX * 50} ${PX * 50} 0 0 0 ${C + PX * 50 * Math.cos(-0.5)} ${C + PX * 50 * Math.sin(-0.5)} Z`} fill="url(#sweep)" opacity="0.5" />
          </g>

          {points.map((p) => {
            const isHQ = p.slug === "euless";
            const on = p.slug === active;
            const showLabel = ALWAYS_LABEL.has(p.slug) || on;
            return (
              <g key={p.slug} className="cursor-pointer" onMouseEnter={() => setActive(p.slug)} onFocus={() => setActive(p.slug)}>
                <Link href={`/areas/${p.slug}`} aria-label={`${p.name}, about ${p.miles} miles from Euless`}>
                  <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
                  {(isHQ || on) && <circle cx={p.x} cy={p.y} r={on ? 14 : 12} fill="#f7901a" opacity="0.25" className="animate-ping" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />}
                  <circle cx={p.x} cy={p.y} r={isHQ ? 8 : on ? 7 : 4.5} fill={isHQ ? "#f7901a" : on ? "#f7901a" : "#6f21a6"} stroke="#fff" strokeWidth="2" style={{ transition: "all .3s" }} />
                  {showLabel && (
                    <text x={p.x + (p.x > 460 ? -12 : 12)} y={p.y + 4} textAnchor={p.x > 460 ? "end" : "start"} fontSize={isHQ ? 14 : 11.5} fontWeight={isHQ || on ? 800 : 600} fill={on || isHQ ? "#461570" : "#300e4e"} paintOrder="stroke" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round">
                      {p.name}
                    </text>
                  )}
                </Link>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-5">
        <div className="glass rounded-3xl p-7">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-sun-600">
            <MapPin className="h-4 w-4" /> {current.slug === "euless" ? "Home base" : `≈ ${current.miles} miles from Euless`}
          </div>
          <h3 className="mt-3 text-3xl font-semibold text-plum-900">{current.name}, TX</h3>
          <p className="mt-1 text-sm font-semibold text-plum-600">{current.county}</p>
          <p className="mt-4 text-ink/70">{current.blurb}</p>
          <Link href={`/areas/${current.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-plum-700 hover:text-sun-600">
            Explore {current.name} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        {!compact && (
          <p className="px-2 text-sm text-ink/60">
            Hover or tap a pin to preview a community. Distances are approximate straight-line miles from Euless, TX.
          </p>
        )}
      </div>
    </div>
  );
}
