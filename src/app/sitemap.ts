import type { MetadataRoute } from "next";
import { site, links } from "@/lib/site";
import { packages } from "@/lib/data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...links.map((l) => ({ url: new URL(l.href, site.url).toString() })),
    ...packages.map((p) => ({
      url: new URL(`/packages/${p.slug}/`, site.url).toString(),
    })),
  ];
}
