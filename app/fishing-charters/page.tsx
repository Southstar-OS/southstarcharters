import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import services from "@/content/services.json";

export const metadata: Metadata = {
  title: "Fishing Charters — Inshore & Offshore | SouthStar Charters",
  description:
    "Inshore, midshore, and offshore fishing charters along the New Jersey coast. Striped Bass, Tuna, Bluefish, and more. Year-round trips from Belmar and Barnegat Light, NJ.",
};

const { fishingCharters } = services;

export default function FishingChartersPage() {
  return (
    <>
      <Hero
        title="Inshore & Offshore Fishing Charters"
        subtitle="Navigate the creeks, canals, inlets, and coastal waters of the New Jersey coast with expert local captains."
        backgroundImage="/images/fishing-charters-hero.jpg"
        cta={{ label: "View Rates", href: "/rates" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      {/* ── Overview ─────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Fish the Jersey Shore
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {fishingCharters.shortDescription}
          </p>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Charter Highlights
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fishingCharters.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fishing Locations ────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Shallow Water Fishing Expeditions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our boat&apos;s small profile makes it possible to reach areas of the
            inlets and rivers that larger vessels cannot. We fish:
          </p>
          <ul className="mt-6 space-y-2">
            {fishingCharters.fishingLocations.map((loc) => (
              <li key={loc} className="flex items-center gap-2 text-slate-700">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                {loc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The Boat ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            The {fishingCharters.boat.name}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            At {fishingCharters.boat.length}, our pilothouse vessel comfortably
            seats a party of up to {fishingCharters.boat.capacity} people. Its
            climate-controlled design keeps you comfortable during your trip at
            any time of the year.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {fishingCharters.boat.features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm text-slate-700">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing Link ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Rates &amp; Pricing
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
          View our full list of charter options, trip durations, and pricing.
        </p>
        <Link
          href="/rates"
          className="mt-6 inline-block rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
        >
          View All Rates
        </Link>
      </section>

      <CTASection
        title="Book Your Fishing Charter Today"
        description="Call (833) 464-8687 or send us a message to book your next trip on the water."
      />
    </>
  );
}
