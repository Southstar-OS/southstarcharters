/**
 * North Atlantic Fish Species & Seasons — OWNER-CONTROLLED DATA
 * ============================================================================
 *
 * ⚠️  EVERY season window, size limit, and bag limit in this file is an
 *     UNFILLED PLACEHOLDER. There is NO real regulatory data here.
 *
 *     Placeholder windows use the SENTINEL value "00-00" (an impossible date) so
 *     they are self-evidently fake at the data layer — not just behind a UI
 *     badge. The calendar special-cases the sentinel and renders "Season dates
 *     pending verification" instead of any in/out-of-season claim. This fails
 *     CLOSED at the source: nothing here can be mistaken for a verified value.
 *
 *     To publish, the owner replaces each "00-00" window with a real "MM-DD"
 *     range, fills minSizeInches / bagLimit, and clears `verify`, after checking
 *     the governing authority for EACH season (see sourcing map below).
 *
 * Sourcing map (which authority each jurisdiction resolves against)
 * ----------------------------------------------------------------------------
 *   "federal"     → NOAA Fisheries (NMFS). HMS species (tunas, billfish,
 *                   swordfish, sharks) also require a NOAA HMS Angling/Charter
 *                   permit and are federally managed — flagged `permitRequired`.
 *   "interstate"  → ASMFC fishery management plans, as implemented by NJ
 *                   (striped bass, summer flounder, bluefish, weakfish, …).
 *   "state"       → NJ DEP Division of Fish & Wildlife marine digest (0–3 nmi).
 *
 * Schema
 * ----------------------------------------------------------------------------
 *   Jurisdiction  "federal" | "interstate" | "state" — the authority for a given
 *                 window. The SAME species can be open in one jurisdiction and
 *                 closed in another (e.g. summer flounder state vs federal), so
 *                 `seasons` is an array keyed by jurisdiction, never a flat field.
 *
 *   Season
 *     jurisdiction    Jurisdiction (above)
 *     openDate        "MM-DD", or the sentinel "00-00" while unverified
 *     closeDate       "MM-DD", or the sentinel "00-00" while unverified.
 *                     For real data, if closeDate < openDate the window WRAPS the
 *                     year end (e.g. open 10-10, close 04-30).
 *     minSizeInches?  optional minimum legal size (omit while unverified)
 *     bagLimit?       optional per-angler daily bag limit (omit while unverified)
 *     notes?          short free text shown under the season
 *
 *   Species
 *     commonName      e.g. "Striped Bass"
 *     scientificName  e.g. "Morone saxatilis"
 *     slug            URL-safe id, also the React key
 *     waterType       "inshore" | "offshore" | "both"
 *     permitRequired  true for NOAA HMS species (tunas, billfish, swordfish,
 *                     sharks) that need a federal HMS permit
 *     seasons         Season[] — one entry per governing jurisdiction
 *     verify          ALWAYS true here; drives the "Unverified placeholder"
 *                     badge. Owner sets false only after confirming real data.
 *
 * Species list is grounded in content/rates.json (the charter's stated target
 * species), not model knowledge.
 */

export type Jurisdiction = "federal" | "interstate" | "state";

/** Sentinel window value meaning "not yet filled / pending verification". */
export const PLACEHOLDER_DATE = "00-00";

export interface Season {
  jurisdiction: Jurisdiction;
  openDate: string; // "MM-DD" or PLACEHOLDER_DATE
  closeDate: string; // "MM-DD" or PLACEHOLDER_DATE
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

/** Every season starts as an unfilled, sentinel placeholder. // VERIFY before publish. */
function pending(jurisdiction: Jurisdiction, notes: string): Season {
  // VERIFY: owner replaces 00-00 with a real MM-DD window + size/bag from the
  // governing authority (see sourcing map in the file header) before publish.
  return {
    jurisdiction,
    openDate: PLACEHOLDER_DATE,
    closeDate: PLACEHOLDER_DATE,
    notes,
  };
}

/**
 * Target species, grounded in content/rates.json. ALL seasons are unfilled
 * sentinel placeholders pending owner verification.
 */
export const species: Species[] = [
  // ── Inshore / nearshore (state + interstate jurisdictions matter here) ──
  {
    commonName: "Striped Bass",
    scientificName: "Morone saxatilis",
    slug: "striped-bass",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      pending("interstate", "PLACEHOLDER — ASMFC striped bass plan, pending verification"),
      pending("state", "PLACEHOLDER — NJ state waters, pending verification"),
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
      pending("federal", "PLACEHOLDER — federal window may differ from state, pending verification"),
      pending("state", "PLACEHOLDER — NJ state window, pending verification"),
    ],
    verify: true,
  },
  {
    commonName: "Bluefish",
    scientificName: "Pomatomus saltatrix",
    slug: "bluefish",
    waterType: "both",
    permitRequired: false,
    seasons: [pending("interstate", "PLACEHOLDER — ASMFC bluefish plan, pending verification")],
    verify: true,
  },
  {
    commonName: "Weakfish",
    scientificName: "Cynoscion regalis",
    slug: "weakfish",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      pending("interstate", "PLACEHOLDER — ASMFC weakfish plan, pending verification"),
      pending("state", "PLACEHOLDER — NJ state waters, pending verification"),
    ],
    verify: true,
  },
  {
    commonName: "False Albacore (Little Tunny)",
    scientificName: "Euthynnus alletteratus",
    slug: "false-albacore",
    waterType: "inshore",
    permitRequired: false,
    seasons: [pending("state", "PLACEHOLDER — confirm NJ status, pending verification")],
    verify: true,
  },
  {
    commonName: "Atlantic Bonito",
    scientificName: "Sarda sarda",
    slug: "atlantic-bonito",
    waterType: "inshore",
    permitRequired: false,
    seasons: [pending("state", "PLACEHOLDER — confirm NJ status, pending verification")],
    verify: true,
  },

  // ── Offshore canyons — HMS species are federally managed & permit-required ──
  {
    commonName: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    slug: "bluefin-tuna",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS, pending verification")],
    verify: true,
  },
  {
    commonName: "Yellowfin Tuna",
    scientificName: "Thunnus albacares",
    slug: "yellowfin-tuna",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS, pending verification")],
    verify: true,
  },
  {
    commonName: "Big-Eye Tuna",
    scientificName: "Thunnus obesus",
    slug: "big-eye-tuna",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS, pending verification")],
    verify: true,
  },
  {
    commonName: "Longfin Tuna (Albacore)",
    scientificName: "Thunnus alalunga",
    slug: "longfin-tuna-albacore",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS, pending verification")],
    verify: true,
  },
  {
    commonName: "Mahi (Dolphinfish)",
    scientificName: "Coryphaena hippurus",
    slug: "mahi-dolphinfish",
    waterType: "offshore",
    permitRequired: false, // federally managed (Mid-Atlantic) but NOT an HMS permit species
    seasons: [pending("federal", "PLACEHOLDER — Mid-Atlantic FMP, pending verification")],
    verify: true,
  },
  {
    commonName: "Wahoo",
    scientificName: "Acanthocybium solandri",
    slug: "wahoo",
    waterType: "offshore",
    permitRequired: false, // federally managed but NOT an HMS permit species
    seasons: [pending("federal", "PLACEHOLDER — federal management, pending verification")],
    verify: true,
  },
  {
    commonName: "Marlin (Billfish)",
    scientificName: "Istiophoridae spp.",
    slug: "marlin-billfish",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS billfish
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS billfish, pending verification")],
    verify: true,
  },
  {
    commonName: "Swordfish",
    scientificName: "Xiphias gladius",
    slug: "swordfish",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [pending("federal", "PLACEHOLDER — NOAA HMS, pending verification")],
    verify: true,
  },
];
