"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { areas, site } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-plum-200/70 bg-white/70 px-5 py-4 text-[0.95rem] text-ink outline-none transition-all placeholder:text-ink/40 focus:border-plum-500 focus:bg-white focus:shadow-[0_0_0_4px_rgb(135_52_193/0.12)]";

export default function ContactForm({ presetInterest = "" }: { presetInterest?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `Real estate inquiry — ${d.get("interest")}`;
    const body = [
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone") || "—"}`,
      `Email: ${d.get("email")}`,
      `I'm interested in: ${d.get("interest")}`,
      `Area: ${d.get("area") || "—"}`,
      `Property type: ${d.get("type")}`,
      "",
      `${d.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass grid place-items-center rounded-[2rem] p-10 text-center sm:p-16" role="status">
        <CheckCircle2 className="h-14 w-14 text-sun-500" />
        <h3 className="mt-5 text-3xl font-semibold text-plum-900">Your email is ready to send</h3>
        <p className="mt-3 max-w-md text-ink/70">
          We opened your email app with your details filled in — just press send. Prefer to talk now? Call{" "}
          <a className="font-bold text-plum-700" href={site.phoneHref}>{site.phone}</a>.
        </p>
        <button onClick={() => setSent(false)} className="btn btn-ghost mt-8">Edit my message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-[2rem] p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">Full name *</span>
          <input name="name" required autoComplete="name" placeholder="Jane Smith" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-plum-900">Email *</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">I want to…</span>
          <select name="interest" defaultValue={presetInterest || "Buy a property"} className={field}>
            <option>Buy a property</option>
            <option>Sell a property</option>
            <option>Buy and sell</option>
            <option>Just have a question</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">Property type</span>
          <select name="type" className={field}>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-plum-900">Preferred area</span>
        <select name="area" defaultValue="" className={field}>
          <option value="">Anywhere in DFW (50 miles of Euless)</option>
          {areas.map((a) => (
            <option key={a.slug}>{a.name}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-plum-900">How can Gladys help?</span>
        <textarea name="message" rows={4} placeholder="Tell us about your timeline, budget or property…" className={`${field} resize-none`} />
      </label>
      <button type="submit" className="btn btn-primary w-full !py-4 text-base">
        <Send className="h-4 w-4" /> Send my message
      </button>
      <p className="text-center text-xs text-ink/50">Opens your email app with your message ready to send. We never share your details.</p>
    </form>
  );
}
