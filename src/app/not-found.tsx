import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] place-items-center pt-32 text-center">
      <div>
        <div className="font-display text-[8rem] font-semibold leading-none text-gradient sm:text-[12rem]">404</div>
        <h1 className="mt-2 text-4xl font-semibold text-plum-900">This page has moved out.</h1>
        <p className="mx-auto mt-4 max-w-md text-ink/65">We couldn&apos;t find what you were looking for — let&apos;s get you back to somewhere with a view.</p>
        <Link href="/" className="btn btn-primary mt-8">Back home <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
