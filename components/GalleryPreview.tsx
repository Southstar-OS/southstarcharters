import Image from "next/image";
import Link from "next/link";
import galleryItems from "@/content/gallery.json";

interface GalleryPreviewProps {
  /** Number of images to show in the preview grid */
  limit?: number;
}

export default function GalleryPreview({ limit = 6 }: GalleryPreviewProps) {
  const items = galleryItems.slice(0, limit);

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          On the Water
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg text-slate-600">
          A glimpse of what awaits you aboard SouthStar Charters.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-2 left-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {img.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
