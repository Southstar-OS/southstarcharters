import type { Metadata } from "next";
import Link from "next/link";
import { pageOpenGraph } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

const TITLE = "Contact Us | SouthStar Charters";
const DESCRIPTION =
  "Get in touch with SouthStar Charters to book your private harbor tour, fishing charter, or dive trip. Call (833) 464-8687 or send us a message.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: pageOpenGraph({ path: "/contact", title: TITLE, description: DESCRIPTION }),
};

export default function ContactPage() {
  const { contact, social, locations } = siteConfig;

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-300">
          Ready to book or have a question? We are here to help.
        </p>
      </section>

      {/* ── Contact Content ──────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Left — Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>
            <p className="mt-4 text-slate-600">
              Whether you want to book a charter, ask about availability, or
              just learn more about what we offer, we would love to hear from
              you.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-900">
                  Main Office (NJ / NY)
                </dt>
                <dd className="text-slate-600">
                  {contact.address.street}, {contact.address.city},{" "}
                  {contact.address.state} {contact.address.zip}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Hours</dt>
                <dd className="text-slate-600">
                  Monday – Friday: 9:00 AM – 5:00 PM
                  <br />
                  Weekends: By appointment
                </dd>
              </div>
            </dl>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-sky-600"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-sky-600"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Where We Fish — Locations ─────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Where We Fish
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Our home base is in {locations.primary.address.city},{" "}
            {locations.primary.address.state}. Trips run from two marinas, each
            suited to a different fishery. Booking for every trip is the same
            toll-free line —{" "}
            <a
              href={`tel:${contact.phoneTel}`}
              className="font-medium text-sky-600 hover:text-sky-700"
            >
              {contact.phone}
            </a>
            . The marina numbers below reach the docks themselves and are not for
            booking.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Primary / office (sole NAP anchor) */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                {locations.primary.role}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                {locations.primary.name}
              </h3>
              <address className="mt-2 text-sm not-italic text-slate-600">
                {locations.primary.address.street}
                <br />
                {locations.primary.address.city},{" "}
                {locations.primary.address.state}{" "}
                {locations.primary.address.zip}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${locations.primary.address.street}, ${locations.primary.address.city}, ${locations.primary.address.state} ${locations.primary.address.zip}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                View on Google Maps &rarr;
              </a>
            </div>

            {/* Departure points (places operated from — not separate businesses) */}
            {locations.departurePoints.map((dp) => (
              <div
                key={dp.name}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {dp.role}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {dp.name}
                </h3>
                <address className="mt-2 text-sm not-italic text-slate-600">
                  {dp.address.street}
                  <br />
                  {dp.address.city}, {dp.address.state} {dp.address.zip}
                </address>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {dp.fishery}
                </p>
                <Link
                  href={dp.speciesHref}
                  className="mt-2 inline-block text-sm font-medium text-sky-600 hover:text-sky-700"
                >
                  View species &amp; seasons &rarr;
                </Link>
                <p className="mt-4 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">
                    Marina line:{" "}
                  </span>
                  <a
                    href={`tel:+1${dp.marinaPhone.replace(/\D/g, "")}`}
                    className="text-slate-600 underline"
                  >
                    {dp.marinaPhone}
                  </a>{" "}
                  <span className="text-slate-400">
                    (dock info — not for booking)
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${dp.geo.lat},${dp.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-sky-600 hover:text-sky-700"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── National Reach ───────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            National Reach
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            SouthStar Charters operates from our NJ/NY home waters and serves
            anglers across the country. Wherever you want to fish, we go where
            the fish are.
          </p>
          <a
            href={`tel:${contact.phoneTel}`}
            className="mt-8 inline-block rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            Call {contact.phone} to Book
          </a>
        </div>
      </section>
    </>
  );
}
