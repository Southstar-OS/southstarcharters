/**
 * Pure season-window logic for the species calendar.
 *
 * Seasons are stored as "MM-DD" windows that recur every year (see
 * lib/data/speciesSeasons.ts). A window WRAPS the year end when its closeDate is
 * earlier than its openDate (e.g. open 10-10, close 04-30). All functions here
 * are pure and take an explicit reference date so they can be unit-tested
 * deterministically — the UI passes `new Date()` for the live view.
 */

import type { Season } from "@/lib/data/speciesSeasons";

export type SeasonStatus = "in" | "out";

/** Convert "MM-DD" to a comparable ordinal (month * 100 + day). */
function toOrdinal(mmdd: string): number {
  const [month, day] = mmdd.split("-").map((part) => Number(part));
  return month * 100 + day;
}

/** Convert a Date to the same month*100+day ordinal, in local time. */
function dateToOrdinal(date: Date): number {
  return (date.getMonth() + 1) * 100 + date.getDate();
}

/** True if the given ordinal falls inside the (possibly year-wrapping) window. */
function ordinalInWindow(ordinal: number, open: number, close: number): boolean {
  return open <= close
    ? ordinal >= open && ordinal <= close
    : ordinal >= open || ordinal <= close;
}

/** Is the species' season open on `reference`? */
export function getSeasonStatus(season: Season, reference: Date): SeasonStatus {
  const open = toOrdinal(season.openDate);
  const close = toOrdinal(season.closeDate);
  return ordinalInWindow(dateToOrdinal(reference), open, close) ? "in" : "out";
}

/**
 * Which of the 12 months the window covers, as a boolean[12] (index 0 = January).
 * A month is marked open if any day within it falls in the window.
 */
export function monthsInWindow(season: Season): boolean[] {
  const open = toOrdinal(season.openDate);
  const close = toOrdinal(season.closeDate);
  const months: boolean[] = [];
  for (let month = 1; month <= 12; month++) {
    let anyDayOpen = false;
    for (let day = 1; day <= 28; day++) {
      if (ordinalInWindow(month * 100 + day, open, close)) {
        anyDayOpen = true;
        break;
      }
    }
    months.push(anyDayOpen);
  }
  return months;
}

export const MONTH_ABBREVIATIONS = [
  "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D",
] as const;
