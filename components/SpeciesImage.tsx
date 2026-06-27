import Image from "next/image";
import type { SpeciesImage as SpeciesImageData } from "@/lib/data/speciesSeasons";

interface SpeciesImageProps {
  image: SpeciesImageData;
  commonName: string;
  scientificName: string;
}

/**
 * Rights-gated, decorative species image.
 *
 * Renders ONLY when the image's NOAA public-domain rights are verified
 * (`rightsVerified`). The credit is always shown visibly and links to the NOAA
 * source page. Static image, lazy-loaded, with a subtle hover elevation only —
 * the hover transition is disabled under `prefers-reduced-motion`. The factual
 * text in the card stays primary; this image never replaces it.
 */
export default function SpeciesImage({
  image,
  commonName,
  scientificName,
}: SpeciesImageProps) {
  if (!image.rightsVerified) return null;

  return (
    <figure className="mt-4">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-50 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <Image
          src={image.src}
          alt={`${commonName} (${scientificName}) — species illustration courtesy of NOAA Fisheries`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
      <figcaption className="mt-1.5 text-xs text-slate-500">
        Courtesy:{" "}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded underline decoration-slate-300 underline-offset-2 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
        >
          {image.credit}
        </a>
      </figcaption>
    </figure>
  );
}
