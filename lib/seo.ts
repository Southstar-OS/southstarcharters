import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Build a per-page OpenGraph block with shared site defaults.
 *
 * Next.js shallow-merges metadata, so a page that sets `openGraph` replaces the
 * root layout's openGraph entirely (it is not deep-merged). This helper keeps
 * the shared bits (site name, image, type, locale) consistent so every page can
 * declare its own url/title/description without dropping the image.
 *
 * `path` is relative (e.g. "/about") and resolves against `metadataBase`.
 */
export function pageOpenGraph(opts: {
  path: string;
  title: string;
  description: string;
}): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_US",
    url: opts.path,
    siteName: siteConfig.name,
    title: opts.title,
    description: opts.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  };
}
