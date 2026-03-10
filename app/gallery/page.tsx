"use client";

import { useState } from "react";
import Image from "next/image";
import galleryItems from "@/content/gallery.json";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(galleryItems.map((i) => i.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === active);

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Photo Gallery
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-300">
          A look at life on the water with SouthStar Charters.
        </p>
      </section>

      {/* ── Filter Tabs ──────────────────────────────────────────────── */}
      <section className="px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active === cat
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Gallery Grid ─────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-2 left-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {img.category}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
