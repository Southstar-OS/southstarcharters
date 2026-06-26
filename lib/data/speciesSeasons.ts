/**
 * North Atlantic Fish Species & Seasons — OWNER-CONTROLLED DATA
 * ============================================================================
 *
 * ⚠️  EVERY season date, size limit, and bag limit in this file is a PLACEHOLDER.
 *     Nothing here is real regulatory data. The page renders an "Unverified"
 *     badge on every entry (driven by `verify: true`) so nothing false can ship.
 *
 *     The site owner MUST replace these with current, confirmed values and clear
 *     the `verify` flag, after checking the governing authority for EACH season:
 *       - federal     → NOAA Fisheries (NMFS), 3–200 nmi
 *       - interstate  → ASMFC (Atlantic States Marine Fisheries Commission)
 *       - state       → NJ Division of Fish & Wildlife (NJDEP), 0–3 nmi
 *
 * Schema
 * ----------------------------------------------------------------------------
 *   Jurisdiction  "federal" | "interstate" | "state"
 *                 The authority that governs a given season window. The SAME
 *                 species can be open in one jurisdiction and closed in another
 *                 (e.g. summer flounder in state vs federal waters) — this is why
 *                 `seasons` is an array keyed by jurisdiction, never a flat field.
 *
 *   Season
 *     jurisdiction    Jurisdiction (above)
 *     openDate        "MM-DD" — first day of the open window
 *     closeDate       "MM-DD" — last day of the open window. If closeDate is
 *                     earlier than openDate, the window WRAPS the year end
 *                     (e.g. open 10-10, close 04-30 = mid-Oct through end of Apr).
 *     minSizeInches?  optional minimum legal size
 *     bagLimit?       optional per-angler daily bag limit
 *     notes?          free text (kept short; shown under the season)
 *
 *   Species
 *     commonName      e.g. "Striped Bass"
 *     scientificName  e.g. "Morone saxatilis"
 *     slug            URL-safe id, also used as React key
 *     waterType       "inshore" | "offshore" | "both"
 *     permitRequired  true for Highly Migratory Species (HMS) that need a NOAA
 *                     HMS permit — tuna, sharks, billfish, swordfish
 *     seasons         Season[] — one entry per governing jurisdiction
 *     verify          ALWAYS true here. Drives the "Unverified placeholder"
 *                     badge in the UI. Owner sets to false only after confirming.
 *
 * Dates are intentionally rounded/synthetic placeholders, not real-looking
 * regulatory dates, to make it obvious they are demo values pending verification.
 */

export type Jurisdiction = "federal" | "interstate" | "state";

export interface Season {
  jurisdiction: Jurisdiction;
  openDate: string; // "MM-DD"
  closeDate: string; // "MM-DD"
  minSizeInches?: number;
  bagLimit?: number;
  notes?: string;
}

export interface Species {
  commonName: string;
  scientificName: string;
  slug: string;
  waterType: "inshore" | "offshore" | "both";
  permitRequired: boolean;
  seasons: Season[];
  verify: true;
}

/** Human-readable label + short authority note for each jurisdiction. */
export const JURISDICTION_LABELS: Record<
  Jurisdiction,
  { label: string; authority: string }
> = {
  federal: { label: "Federal", authority: "NOAA Fisheries (3–200 nmi)" },
  interstate: { label: "Interstate", authority: "ASMFC (migratory)" },
  state: { label: "State", authority: "NJ Fish & Wildlife (0–3 nmi)" },
};

/**
 * PLACEHOLDER DATA — replace before publish. See header.
 * Each season carries a // VERIFY marker as a standing reminder.
 */
export const species: Species[] = [
  {
    commonName: "Striped Bass",
    scientificName: "Morone saxatilis",
    slug: "striped-bass",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs ASMFC before publish
      { jurisdiction: "interstate", openDate: "05-01", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — not real regulatory data" },
      // VERIFY: owner confirms vs NJ Fish & Wildlife before publish
      { jurisdiction: "state", openDate: "03-01", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — not real regulatory data" },
    ],
    verify: true,
  },
  {
    commonName: "Summer Flounder (Fluke)",
    scientificName: "Paralichthys dentatus",
    slug: "summer-flounder-fluke",
    waterType: "both",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs NOAA Fisheries before publish — state and federal windows DIFFER for this species
      { jurisdiction: "federal", openDate: "06-01", closeDate: "09-30", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — federal window differs from state" },
      // VERIFY: owner confirms vs NJ Fish & Wildlife before publish
      { jurisdiction: "state", openDate: "05-01", closeDate: "09-30", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — state window differs from federal" },
    ],
    verify: true,
  },
  {
    commonName: "Black Sea Bass",
    scientificName: "Centropristis striata",
    slug: "black-sea-bass",
    waterType: "both",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs ASMFC before publish
      { jurisdiction: "interstate", openDate: "05-15", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — not real regulatory data" },
    ],
    verify: true,
  },
  {
    commonName: "Scup (Porgy)",
    scientificName: "Stenotomus chrysops",
    slug: "scup-porgy",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs ASMFC before publish
      { jurisdiction: "interstate", openDate: "01-01", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — not real regulatory data" },
    ],
    verify: true,
  },
  {
    commonName: "Bluefish",
    scientificName: "Pomatomus saltatrix",
    slug: "bluefish",
    waterType: "both",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs ASMFC before publish
      { jurisdiction: "interstate", openDate: "01-01", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — not real regulatory data" },
    ],
    verify: true,
  },
  {
    commonName: "Tautog (Blackfish)",
    scientificName: "Tautoga onitis",
    slug: "tautog-blackfish",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs NJ Fish & Wildlife before publish — this window WRAPS the year end
      { jurisdiction: "state", openDate: "10-10", closeDate: "04-30", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — wraps year end (autumn through spring)" },
    ],
    verify: true,
  },
  {
    commonName: "Atlantic Cod",
    scientificName: "Gadus morhua",
    slug: "atlantic-cod",
    waterType: "offshore",
    permitRequired: false,
    seasons: [
      // VERIFY: owner confirms vs NOAA Fisheries before publish
      { jurisdiction: "federal", openDate: "09-01", closeDate: "04-30", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — wraps year end" },
    ],
    verify: true,
  },
  {
    commonName: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    slug: "bluefin-tuna",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS permit required
    seasons: [
      // VERIFY: owner confirms vs NOAA Fisheries (HMS) before publish
      { jurisdiction: "federal", openDate: "06-01", closeDate: "11-30", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — requires NOAA HMS permit" },
    ],
    verify: true,
  },
  {
    commonName: "Shortfin Mako Shark",
    scientificName: "Isurus oxyrinchus",
    slug: "shortfin-mako-shark",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS permit required
    seasons: [
      // VERIFY: owner confirms vs NOAA Fisheries (HMS) before publish — retention rules change frequently
      { jurisdiction: "federal", openDate: "01-01", closeDate: "12-31", minSizeInches: 0, bagLimit: 0, notes: "PLACEHOLDER — requires NOAA HMS permit; confirm retention status" },
    ],
    verify: true,
  },
];
