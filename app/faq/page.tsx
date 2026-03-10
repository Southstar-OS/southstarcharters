import type { Metadata } from "next";
import faqItems from "@/content/faq.json";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SouthStar Charters",
  description:
    "Find answers to common questions about SouthStar Charters, including what to bring, weather policies, fishing licenses, and booking information.",
};

export default function FAQPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-300">
          Everything you need to know before you step aboard.
        </p>
      </section>

      {/* ── FAQ List ─────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <dl className="mx-auto max-w-3xl space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <dt className="text-base font-semibold text-slate-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <CTASection
        title="Still Have Questions?"
        description="We are happy to help. Reach out and we will get back to you as soon as possible."
      />
    </>
  );
}
