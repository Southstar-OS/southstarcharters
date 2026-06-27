import { cn } from "@/lib/utils";
import {
  JURISDICTION_LABELS,
  type Species,
} from "@/lib/data/speciesSeasons";
import {
  getSeasonStatus,
  monthsInWindow,
  MONTH_ABBREVIATIONS,
} from "@/lib/seasons";

interface SeasonCalendarProps {
  speciesList: Species[];
  /** Reference date used to compute in/out-of-season. Defaults to now. */
  referenceDate?: Date;
}

/** Small amber badge flagging that the underlying data is an unverified placeholder. */
function UnverifiedBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
      Unverified placeholder
    </span>
  );
}

function fmtRange(openDate: string, closeDate: string) {
  return `${openDate} → ${closeDate}`;
}

/**
 * Server-rendered species listing + month-by-month calendar.
 *
 * For each species it renders, per governing jurisdiction, whether the season is
 * currently IN or OUT (computed from `referenceDate`) plus a 12-month open-window
 * strip. Same-species jurisdiction differences (e.g. state vs federal) are shown
 * as separate rows so they are never collapsed into one (legally wrong) status.
 * Everything is plain server-rendered text/markup, so it is fully crawlable.
 */
export default function SeasonCalendar({
  speciesList,
  referenceDate = new Date(),
}: SeasonCalendarProps) {
  return (
    <div className="space-y-8">
      {speciesList.map((sp) => (
        <article
          key={sp.slug}
          id={sp.slug}
          className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          {/* Species header */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-bold text-slate-900">{sp.commonName}</h3>
            <p className="text-sm italic text-slate-500">{sp.scientificName}</p>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium capitalize text-slate-600">
              {sp.waterType} waters
            </span>
            {sp.permitRequired && (
              <span className="rounded-full bg-sky-100 px-2 py-0.5 font-medium text-sky-800 ring-1 ring-sky-200">
                NOAA HMS permit required
              </span>
            )}
            {sp.verify && <UnverifiedBadge />}
          </div>

          {/* Per-jurisdiction seasons */}
          <div className="mt-5 space-y-5">
            {sp.seasons.map((season, i) => {
              const status = getSeasonStatus(season, referenceDate);
              const months = monthsInWindow(season);
              const jur = JURISDICTION_LABELS[season.jurisdiction];
              const isPending = status === "pending";
              const inSeason = status === "in";
              return (
                <div
                  key={`${sp.slug}-${season.jurisdiction}-${i}`}
                  className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-sm font-semibold text-slate-900">
                        {jur.label}
                      </span>{" "}
                      <span className="text-xs text-slate-500">
                        ({jur.authority})
                      </span>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1",
                        isPending
                          ? "bg-amber-100 text-amber-800 ring-amber-200"
                          : inSeason
                            ? "bg-green-100 text-green-800 ring-green-200"
                            : "bg-slate-100 text-slate-600 ring-slate-200"
                      )}
                    >
                      {isPending
                        ? "Dates pending verification"
                        : inSeason
                          ? "In season now"
                          : "Out of season"}
                    </span>
                  </div>

                  {isPending ? (
                    /* No verified data yet — make no in/out claim. */
                    <p className="mt-2 text-sm text-slate-600">
                      Season dates and limits are pending owner verification
                      against {jur.authority}.
                      {season.notes ? ` (${season.notes})` : ""}
                    </p>
                  ) : (
                    <>
                      {/* Text summary (crawlable) */}
                      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
                        <div>
                          <dt className="text-xs font-medium text-slate-500">
                            Open window
                          </dt>
                          <dd className="text-slate-800">
                            {fmtRange(season.openDate, season.closeDate)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-slate-500">
                            Min. size
                          </dt>
                          <dd className="text-slate-800">
                            {season.minSizeInches != null
                              ? `${season.minSizeInches} in`
                              : "—"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-slate-500">
                            Bag limit
                          </dt>
                          <dd className="text-slate-800">
                            {season.bagLimit != null ? `${season.bagLimit}` : "—"}
                          </dd>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <dt className="text-xs font-medium text-slate-500">
                            Notes
                          </dt>
                          <dd className="text-slate-600">{season.notes ?? "—"}</dd>
                        </div>
                      </dl>

                      {/* Month-by-month visual strip */}
                      <div
                        className="mt-3 grid grid-cols-12 gap-0.5"
                        aria-label={`${sp.commonName} ${jur.label} open months`}
                      >
                        {months.map((openThisMonth, m) => (
                          <div
                            key={m}
                            className={cn(
                              "flex h-7 items-center justify-center rounded text-[10px] font-medium",
                              openThisMonth
                                ? "bg-green-500/80 text-white"
                                : "bg-slate-100 text-slate-400"
                            )}
                            title={openThisMonth ? "Open" : "Closed"}
                          >
                            {MONTH_ABBREVIATIONS[m]}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
