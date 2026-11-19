import type { Metadata } from "next";
import { CtaBand, Faq, PageHero } from "@/components/ui";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate FAQ — Buying & Selling in DFW",
  description: "Answers to common questions about working with Gladys Ntaryike, buying, selling and service areas in Euless and Dallas–Fort Worth.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero eyebrow="FAQ" title={<>Good questions, <span className="text-gradient">clear answers.</span></>} body="Everything you need to know before you buy, sell or get in touch." />
      <section className="pb-24">
        <div className="container-x max-w-4xl" data-reveal>
          <Faq items={faqs} />
        </div>
      </section>
      <CtaBand title="Still have a question?" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
