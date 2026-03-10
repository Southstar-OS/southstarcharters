import type { Metadata } from "next";
import Link from "next/link";
import ratesData from "@/content/rates.json";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Charter Rates & Pricing | SouthStar Charters",
  description:
    "View our full list of charter rates for offshore, midshore, and inshore fishing, beach trips, and spearfishing. Transparent pricing from SouthStar Charters.",
};

export default function RatesPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Charter Rates
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-300">
          Transparent pricing for every type of adventure on the water.
        </p>
      </section>

      {/* ── Rate Categories ──────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-16">
          {ratesData.categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-2xl font-bold text-slate-900">{cat.title}</h2>
              <p className="mt-2 text-slate-600">{cat.description}</p>

              {cat.species.length > 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Species: </span>
                  {cat.species.join(", ")}
                </p>
              )}

              {/* Pricing Table */}
              <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900">
                        Trip Type
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-900">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cat.trips.map((trip) => (
                      <tr key={trip.name}>
                        <td className="px-4 py-3 text-slate-700">
                          {trip.name}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          ${trip.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional Info */}
              {cat.maxAnglers && (
                <p className="mt-3 text-xs text-slate-500">
                  Prices for up to {cat.maxAnglers} anglers.
                  {cat.extraAnglerFee &&
                    ` Additional angler: +$${cat.extraAnglerFee}.`}
                </p>
              )}
            </div>
          ))}

          {/* Policies */}
          <div className="rounded-lg bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Policies &amp; Notes
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Tips for mates are customary. 15–20% of the total trip cost is standard.</li>
              <li>Additional fuel surcharges may apply for certain trips.</li>
              <li>Prices are subject to change. Contact us for the most current rates.</li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              Last updated: {ratesData.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Book?"
        description="Contact us to reserve your charter or ask about custom trip options."
      />
    </>
  );
}
