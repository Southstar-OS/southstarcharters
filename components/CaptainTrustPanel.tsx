/**
 * Captain & vessel credentialing — TRUST content, NOT seasons data.
 *
 * The U.S. Coast Guard governs whether a charter trip is legal to operate
 * (captain licensing, vessel safety/inspection, passenger limits) — it does NOT
 * set fishing seasons. This panel is therefore kept architecturally separate
 * from the seasons engine (lib/seasons.ts / SeasonCalendar).
 *
 * All copy below is PLACEHOLDER and must be confirmed by the owner against the
 * vessel's actual credentials before publish.
 */

interface TrustItem {
  title: string;
  body: string;
  verify: true;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    title: "USCG-Licensed Captain",
    body: "PLACEHOLDER — confirm the captain's actual U.S. Coast Guard credential (e.g. OUPV “six-pack” or Master license) and license number before publishing.",
    verify: true,
  },
  {
    title: "Inspected, Equipped Vessel",
    body: "PLACEHOLDER — confirm safety equipment, documented vessel status, and any inspection details for the actual boat before publishing.",
    verify: true,
  },
  {
    title: "Passenger Limits",
    body: "PLACEHOLDER — confirm the legal maximum number of passengers for the vessel and license class before publishing.",
    verify: true,
  },
];

export default function CaptainTrustPanel() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Licensed, Legal &amp; Safe to Operate
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-slate-600">
          Fishing seasons are set by NOAA, ASMFC, and the states — but whether a
          charter is legal to run is governed by the U.S. Coast Guard. Here is how
          we keep your trip compliant and safe.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                {item.verify && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
                    Unverified
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
