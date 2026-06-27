import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import SeasonCalendar from "@/components/SeasonCalendar";
import CaptainTrustPanel from "@/components/CaptainTrustPanel";
import CTASection from "@/components/CTASection";
import { species } from "@/lib/data/speciesSeasons";

const TITLE = "North Atlantic Fish Species & Seasons | SouthStar Charters";
const DESCRIPTION =
  "Target species in North Atlantic federal, interstate, and state waters, with a month-by-month season calendar. Seasons differ by jurisdiction — always confirm current regulations before fishing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/species" },
  openGraph: pageOpenGraph({ path: "/species", title: TITLE, description: DESCRIPTION }),
};

// Re-render hourly so the "in season now" status stays current as dates pass,
// while remaining server-rendered (and therefore crawlable).
export const revalidate = 3600;

export default function SpeciesPage() {
  const today = new Date();

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          North Atlantic Fish Species &amp; Seasons
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300">
          The fish we target off the New York and New Jersey coast — and a
          month-by-month look at when each is in season across federal,
          interstate, and state waters.
        </p>
      </section>

      {/* ── Data disclaimer (required) ───────────────────────────────── */}
      <section className="px-4 pt-10">
        <div className="mx-auto max-w-5xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Important — verify before you fish.</p>
          <p className="mt-1 leading-relaxed">
            Fishing seasons, size limits, and bag limits vary by species and by
            federal, interstate, and state jurisdiction, change frequently, and
            are subject to NOAA Fisheries, ASMFC, and NJ Division of Fish &amp;
            Wildlife regulation. Always confirm current regulations with the
            governing authority before fishing.
          </p>
          <p className="mt-2 text-xs text-amber-800">
            Inshore species show 2026 New Jersey recreational rules (NJ Division
            of Fish &amp; Wildlife). Offshore species show NOAA / SAFMC values
            marked &ldquo;Unverified — confirm with NOAA&rdquo; pending owner
            confirmation. Always confirm with the governing authority before
            fishing.
          </p>
        </div>
      </section>

      {/* ── How to read this ─────────────────────────────────────────── */}
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl text-sm text-slate-600">
          <p>
            The same fish can be open in one jurisdiction and closed in another,
            so each species lists its season separately by authority:{" "}
            <span className="font-medium text-slate-800">Federal</span> (NOAA
            Fisheries, 3–200 nmi),{" "}
            <span className="font-medium text-slate-800">Interstate</span>{" "}
            (ASMFC migratory species), and{" "}
            <span className="font-medium text-slate-800">State</span> (NJ Fish
            &amp; Wildlife, 0–3 nmi). Highly Migratory Species such as tuna and
            sharks also require a NOAA HMS permit.
          </p>
        </div>
      </section>

      {/* ── Species & season calendar ────────────────────────────────── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <SeasonCalendar speciesList={species} referenceDate={today} />
        </div>
      </section>

      {/* ── Captain / vessel trust (separate from seasons) ───────────── */}
      <CaptainTrustPanel />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get on the Fish?"
        description="Book a North Atlantic fishing charter with SouthStar Charters and let our licensed captain put you on the bite."
        buttonLabel="Book a Charter"
      />
    </>
  );
}
