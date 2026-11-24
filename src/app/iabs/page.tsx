import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, FileText, Scale, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Information About Brokerage Services (TREC IABS 1-2)",
  description:
    "Texas Real Estate Commission required notice: Information About Brokerage Services (IABS 1-2) for Gladys Ntaryike, Epique Realty.",
  alternates: { canonical: "/iabs" },
};

const PDF = "/docs/trec-iabs-1-2.pdf";

export default function IabsPage() {
  return (
    <>
      <PageHero
        eyebrow="Texas Real Estate Commission"
        title={<>Information About <span className="text-gradient">Brokerage Services.</span></>}
        body="Texas law requires real estate license holders to provide this notice (TREC form IABS 1-2) so consumers understand the different roles a broker or agent can play in a transaction."
      >
        <a href={PDF} download className="btn btn-primary"><Download className="h-4 w-4" /> Download the PDF</a>
        <a href={PDF} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><ExternalLink className="h-4 w-4" /> Open in new tab</a>
      </PageHero>

      <section className="pb-12">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: FileText, t: "What it is", d: "A standard notice from the Texas Real Estate Commission describing how brokers and agents may represent buyers, sellers and landlords." },
            { icon: Scale, t: "Why you're seeing it", d: "License holders must make this information available before working with a consumer on a real estate transaction." },
            { icon: ShieldCheck, t: "Your rights", d: "It explains duties a license holder owes, including honesty and fairness, and what to ask before you sign any agreement." },
          ].map((c, i) => (
            <div key={c.t} data-reveal data-delay={i * 0.08} className="glass rounded-3xl p-7">
              <c.icon className="h-7 w-7 text-sun-500" />
              <h2 className="mt-4 text-2xl font-semibold text-plum-900">{c.t}</h2>
              <p className="mt-2 text-ink/65">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div data-reveal className="glass overflow-hidden rounded-[2rem] p-2 sm:p-3">
            <object data={`${PDF}#view=FitH`} type="application/pdf" className="h-[80vh] min-h-[34rem] w-full rounded-[1.5rem] bg-white">
              <div className="grid min-h-[20rem] place-items-center p-10 text-center">
                <div>
                  <FileText className="mx-auto h-10 w-10 text-plum-400" />
                  <p className="mt-4 text-ink/70">Your browser can&apos;t display the PDF inline.</p>
                  <a href={PDF} download className="btn btn-primary mt-6"><Download className="h-4 w-4" /> Download IABS 1-2</a>
                </div>
              </div>
            </object>
          </div>

          <div data-reveal className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-[2rem] p-7">
              <h2 className="text-2xl font-semibold text-plum-900">TREC Consumer Protection Notice</h2>
              <p className="mt-3 text-ink/70">
                The Texas Real Estate Commission (TREC) regulates real estate brokers and sales agents, among other license holders. You can find
                more information and check the status of a license holder on the TREC website.
              </p>
              <a href="https://www.trec.texas.gov" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-plum-700 hover:text-sun-600">
                www.trec.texas.gov <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="glass-tint rounded-[2rem] p-7 text-white">
              <h2 className="text-2xl font-semibold">Questions about representation?</h2>
              <p className="mt-3 text-white/80">Gladys is happy to walk you through how buyer and seller representation works before you commit to anything.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-sun">Contact Gladys</Link>
                <a href={site.phoneHref} className="btn border border-white/30 bg-white/10 text-white">{site.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
