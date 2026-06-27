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

/**
 * LocalBusiness structured data — the single business anchor, sourced from
 * siteConfig (Wyckoff primary NAP). LocalBusiness is a subtype of Organization,
 * so this one object also carries the Organization signals (name, url, image,
 * sameAs).
 *
 * `geo` is intentionally OMITTED: the verified Business Profile data provides no
 * coordinate for the Wyckoff anchor, and a coordinate must not be invented (a
 * wrong one misplaces the business in maps). The marinas have coordinates, but
 * they are departure points, not this LocalBusiness.
 *
 * `openingHours` is omitted for the same reason — no verified hours were provided.
 */
export function localBusinessJsonLd() {
  const { contact, social } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: contact.phoneTel,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "US",
    },
    sameAs: [social.facebook, social.instagram],
  };
}

/**
 * Service structured data — captures the verified national service area without
 * inventing fake per-location LocalBusinesses. areaServed is United States /
 * North America only (the verified profile shows a North America boundary — NOT
 * global / international).
 */
export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fishing Charters & Harbor Tours",
    serviceType: "Fishing charter",
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "North America" },
    ],
    url: `${siteConfig.url}/fishing-charters`,
  };
}
