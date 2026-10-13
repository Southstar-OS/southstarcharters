import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://southstarchartersnj.com";

const routes = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/fishing-charters",
  "/gallery",
  "/harbor-tours",
  "/rates",
  "/reviews",
  "/species",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
}
