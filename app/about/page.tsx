import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us | SouthStar Charters",
  description:
    "Meet the captain and crew behind SouthStar Charters. Learn about our boats, our mission, and why we are Staten Island's premier charter service.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About SouthStar Charters"
        subtitle="Where fishing meets luxury — on the water since day one."
        backgroundImage="/images/about-hero.jpg"
      />

      {/* ── Our Story ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Our Story
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            SouthStar Charters was founded with a simple mission: to share the
            beauty of the New York Harbor and the thrill of New Jersey coastal
            fishing with everyone. Based in Staten Island, NY, we offer private,
            luxury charter experiences that combine world-class sightseeing with
            expert-guided fishing trips.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Whether you are a first-time visitor looking to see the Statue of
            Liberty from the water or a seasoned angler chasing stripers and
            tuna, our captains and crew are dedicated to making every trip
            unforgettable.
          </p>
        </div>
      </section>

      {/* ── Meet the Captain ─────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Meet Captain Eric
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {/* TODO: Replace with the captain's real bio once provided. */}
            Captain Eric brings decades of experience on the waters of New York
            and New Jersey. His deep knowledge of local waterways, tides, and
            fish behavior ensures that every charter — whether a sightseeing
            tour or a fishing expedition — is safe, professional, and
            productive. His passion for the water is contagious, and his
            dedication to customer service is what keeps guests coming back year
            after year.
          </p>
        </div>
      </section>

      {/* ── Our Boats ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Our Fleet
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">
                2017 Boston Whaler
              </h3>
              <p className="mt-1 text-sm font-medium text-sky-600">
                Harbor Tours &amp; Sightseeing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A spacious, fully-loaded luxury vessel with twin Mercury Verado
                motors, a full kitchen, dining room, climate-controlled cabin,
                and outdoor deck. Accommodates up to 13 passengers.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">
                2017 Defiance Admiral 220
              </h3>
              <p className="mt-1 text-sm font-medium text-sky-600">
                Fishing &amp; Dive Charters
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A 27.6-foot pilothouse vessel with a sealed, heated cabin, live
                wells, coolers, and fish boxes. Designed for year-round comfort
                on inshore and coastal waters. Seats up to 6 passengers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
