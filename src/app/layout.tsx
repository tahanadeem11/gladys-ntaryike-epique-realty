import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { site } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gladys Ntaryike · Epique Realty | Euless, TX Real Estate Agent",
    template: "%s | Gladys Ntaryike · Epique Realty",
  },
  description:
    "Residential & commercial real estate agent in Euless, TX. Buyer's agent and listing agent serving Euless and the Dallas–Fort Worth area within 50 miles.",
  keywords: [
    "Euless real estate agent",
    "Euless TX realtor",
    "buyer's agent DFW",
    "listing agent Euless",
    "Dallas Fort Worth real estate",
    "commercial real estate Texas",
  ],
  openGraph: {
    type: "website",
    siteName: "Gladys Ntaryike · Epique Realty",
    locale: "en_US",
    images: [{ url: "/images/logo-white-bg.png", width: 1536, height: 1024, alt: "Gladys Ntaryike Epique Realty" }],
  },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#fbf9fe",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Gladys Ntaryike - Epique Realty",
  url: site.url,
  telephone: "+1-682-318-1994",
  email: site.email,
  image: `${site.url}/images/logo-white-bg.png`,
  address: { "@type": "PostalAddress", addressLocality: "Euless", addressRegion: "TX", postalCode: "76040", addressCountry: "US" },
  areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 32.837, longitude: -97.082 }, geoRadius: 80467 },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buyer's Agent" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Listing Agent" } },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Preloader />
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Experience />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
