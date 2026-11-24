import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Gladys Ntaryike — Free Consultation",
  description: `Call ${site.phone} or email ${site.email} to talk with Gladys Ntaryike of Epique Realty about buying or selling in Euless, TX and DFW.`,
  alternates: { canonical: "/contact" },
};

const items = [
  { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Based in", value: `${site.city}, ${site.state} ${site.zip}`, href: undefined },
  { icon: Clock, label: "Coverage", value: "Euless + 50 miles", href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk about <span className="text-gradient">your move.</span></>}
        body="Share a few details and Gladys will get back to you to plan your next step. Prefer to talk now? Call anytime."
      />
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {items.map((it, i) => {
              const body = (
                <>
                  <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-plum-500 to-plum-800 p-3.5 text-white shadow-lg">
                    <it.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-extrabold uppercase tracking-[0.2em] text-sun-600">{it.label}</span>
                    <span className="mt-1 block break-words font-display text-xl font-semibold text-plum-900">{it.value}</span>
                  </span>
                </>
              );
              return (
                <div key={it.label} data-reveal data-delay={i * 0.08}>
                  {it.href ? (
                    <a href={it.href} className="glass spot flex items-center gap-5 rounded-3xl p-5 transition-all hover:-translate-y-1">{body}</a>
                  ) : (
                    <div className="glass flex items-center gap-5 rounded-3xl p-5">{body}</div>
                  )}
                </div>
              );
            })}
            <div data-reveal data-delay="0.35" className="glass-tint rounded-3xl p-7 text-white">
              <h2 className="text-2xl font-semibold">Residential &amp; Commercial</h2>
              <p className="mt-2 text-white/75">Buyer&apos;s agent and listing agent services across Euless and the surrounding 50 miles.</p>
            </div>
          </div>
          <div data-reveal="right">
            <ContactForm />
            <p className="mt-4 px-2 text-center text-xs text-ink/55">
              Before working together, please review the <Link href="/iabs" className="font-bold text-plum-700 underline-offset-4 hover:underline">Texas Real Estate Commission Information About Brokerage Services</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
