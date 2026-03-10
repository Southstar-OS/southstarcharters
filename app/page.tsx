import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import TestimonialPreview from "@/components/TestimonialPreview";
import GalleryPreview from "@/components/GalleryPreview";
import CTASection from "@/components/CTASection";
import faqItems from "@/content/faq.json";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Hero
        title="Your Private Adventure on the Water"
        subtitle="NYC Harbor Tours and New Jersey Fishing Charters from Staten Island, NY"
        backgroundImage="/images/hero-home.jpg"
        cta={{ label: "Explore Harbor Tours", href: "/harbor-tours" }}
        secondaryCta={{ label: "View Fishing Charters", href: "/fishing-charters" }}
      />

      {/* ── Services Overview ────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* Harbor Tours Card */}
          <div className="group relative overflow-hidden rounded-xl bg-slate-100">
            <div className="relative aspect-[4/3] w-full bg-slate-200">
              <Image
                src="/images/service-harbor-tours.jpg"
                alt="NYC Harbor sightseeing tour aboard a private yacht"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                NYC Harbor Sightseeing Tours
              </h2>
              <p className="mt-2 text-slate-600">
                Experience the Statue of Liberty and the Manhattan skyline from
                the deck of a private luxury yacht. Comfortable, narrated tours
                for up to 13 guests.
              </p>
              <Link
                href="/harbor-tours"
                className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>

          {/* Fishing Charters Card */}
          <div className="group relative overflow-hidden rounded-xl bg-slate-100">
            <div className="relative aspect-[4/3] w-full bg-slate-200">
              <Image
                src="/images/service-fishing-charters.jpg"
                alt="Inshore fishing charter on the New Jersey coast"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Fishing Charters
              </h2>
              <p className="mt-2 text-slate-600">
                Inshore, midshore, and offshore charters along the New Jersey
                coast. Year-round trips in a climate-controlled pilothouse
                vessel.
              </p>
              <Link
                href="/fishing-charters"
                className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why SouthStar ────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Where Fishing Meets Luxury
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            SouthStar Charters delivers a premium, private experience on the
            water — whether you are sightseeing the New York skyline or chasing
            stripers off the Jersey Shore.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Private Luxury Yacht",
                desc: "No crowds. Your group, your boat, your schedule.",
              },
              {
                title: "Expert Local Captains",
                desc: "Decades of experience on these waters.",
              },
              {
                title: "Year-Round Comfort",
                desc: "Climate-controlled cabins for every season.",
              },
              {
                title: "Customizable Trips",
                desc: "Tailored experiences for families, groups, and corporate events.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialPreview limit={3} />

      {/* ── Gallery Preview ──────────────────────────────────────────── */}
      <GalleryPreview limit={6} />

      {/* ── FAQ Preview ──────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6">
            {faqItems.slice(0, 4).map((item) => (
              <div key={item.question} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <dt className="text-base font-semibold text-slate-900">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              View All FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <CTASection />
    </>
  );
}
