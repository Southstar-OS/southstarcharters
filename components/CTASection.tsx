import Link from "next/link";
import { siteConfig } from "@/lib/site";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Ready to Plan Your Adventure?",
  description = `Call us at ${siteConfig.contact.phone} or send us a message to book your private charter today.`,
  buttonLabel = "Contact Us",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-sky-700 px-4 py-16 text-center text-white sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-sky-100">{description}</p>
        <div className="mt-8">
          <Link
            href={buttonHref}
            className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-sky-700 shadow-md transition-colors hover:bg-sky-50"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
