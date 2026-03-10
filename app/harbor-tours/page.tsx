import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import services from "@/content/services.json";

export const metadata: Metadata = {
  title: "NYC Harbor Sightseeing Tours | SouthStar Charters",
  description:
    "Experience the Statue of Liberty and the New York skyline on a private luxury yacht. VIP-style harbor tours for up to 13 guests from Staten Island, NY.",
};

const { harborTours } = services;

export default function HarborToursPage() {
  return (
    <>
      <Hero
        title="NYC Harbor Sightseeing Tours"
        subtitle="The Statue of Liberty, the Manhattan skyline, and the Brooklyn Bridge — all from the deck of your own private yacht."
        backgroundImage="/images/harbor-tours-hero.jpg"
        cta={{ label: "Book Your Tour", href: "/contact" }}
      />

      {/* ── Overview ─────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Relax in Our Private Yacht
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Experience the Statue of Liberty and tour the historical,
            breathtaking views of the New York Harbor on a comfortable, luxurious
            private yacht with all of the features and comforts of home. At one
            hour per trip, our tours are the most comfortable, efficient way to
            take in the sights of New York City&apos;s most popular landmarks.
          </p>
        </div>
      </section>

      {/* ── Captains ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Our Captains and Tour Guides
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            This tour is operated and fully narrated by our entertaining and
            highly-experienced captains and support crew members. Our friendly,
            knowledgeable tour guides will make you feel at home aboard our
            charter and are happy to answer your questions.
          </p>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Tour Highlights
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {harborTours.highlights.map((item) => (
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

      {/* ── Amenities ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Onboard Amenities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-slate-600">
            Enjoy your tour in our spacious, comfortable 2017 Boston Whaler.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {harborTours.amenities.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stay Connected ───────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Stay Connected
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Our charter is equipped with the latest features and amenities,
            including free Wi-Fi. Share your favorite photos and videos in real
            time when you book SouthStar Charters.
          </p>
        </div>
      </section>

      <CTASection
        title="Book Your Harbor Tour Today"
        description="Call (833) 464-8687 or send us a message to reserve your private NYC sightseeing experience."
      />
    </>
  );
}
