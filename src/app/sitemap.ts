import type { MetadataRoute } from "next";
import { areas, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/areas", "/about", "/contact", "/mortgage-calculator", "/faq"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.9 })),
    ...areas.map((a) => ({ url: `${site.url}/areas/${a.slug}`, priority: 0.7 })),
  ];
}
