import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overlay?: boolean;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = "/images/gallery/southstar_gallery_9.webp",
  cta,
  secondaryCta,
  overlay = true,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-900 px-4 text-center text-white",
        className
      )}
    >
      {/* Optimized background image. Decorative (the heading carries meaning),
          so alt is empty; `priority` because the hero is the LCP element. */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay for text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-200 sm:text-xl">
            {subtitle}
          </p>
        )}

        {(cta || secondaryCta) && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {cta && (
              <Link
                href={cta.href}
                className="rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-sky-700"
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
