import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator — Texas Home Buyers",
  description: "Estimate your monthly mortgage payment with principal, interest, Texas property taxes and homeowners insurance.",
  alternates: { canonical: "/mortgage-calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Mortgage calculator"
        title={<>Know your <span className="text-gradient">monthly number.</span></>}
        body="Adjust price, down payment, rate, taxes and insurance to see an estimated payment. Texas property taxes are higher than many states, so we include them."
      />
      <section className="pb-24">
        <div className="container-x" data-reveal>
          <Calculator />
        </div>
      </section>
      <CtaBand title="Want exact numbers for your situation?" body="Gladys can introduce you to trusted local lenders and help you build a budget that fits." />
    </>
  );
}
