/**
 * North Atlantic Fish Species & Seasons — OWNER-CONTROLLED DATA
 * ============================================================================
 *
 * ⚠️  MIXED STATE. The state/interstate species (striped bass, summer flounder,
 *     bluefish, weakfish, false albacore, Atlantic bonito) carry verified 2026
 *     New Jersey recreational rules, sourced from the NJ DEP "Attention Anglers"
 *     2026 summary (https://dep.nj.gov/njfw/fishing/marine/seasons-and-regulations/,
 *     dated March 2026) and confirmed by the owner — those entries have
 *     `verify: false`. The offshore species (bluefin, yellowfin, bigeye,
 *     albacore, marlin, swordfish from the NOAA HMS pages; mahi and wahoo from
 *     the SAFMC Dolphin & Wahoo FMP) carry sourced values but are still
 *     SOURCED-NOT-CONFIRMED (`verify: true`) pending the owner's check against
 *     the governing authority. No species remains an unfilled placeholder.
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
  /** Free-text limit when it is not a single per-person integer (e.g. "No limit", per-vessel caps, quotas). */
  limitNote?: string;
  notes?: string;
}

/**
 * Rights-gated image metadata for a species.
 * Imagery is OPTIONAL and decorative — the factual season/limit text is always
 * the primary, crawlable content. An image is only rendered when
 * `rightsVerified` is true, and only NOAA Fisheries / NOAA public-domain works
 * are eligible (see the gallery's rights rules). Credit must be shown visibly.
 */
export interface SpeciesImage {
  /** Local path under /public (e.g. "/images/species/striped-bass.jpg"). */
  src: string;
  /** Exact credit line as published by NOAA, e.g. "NOAA Fisheries". */
  credit: string;
  /** NOAA source page the image + credit came from. */
  sourceUrl: string;
  /** False until a maintainer confirms NOAA public-domain rights. Gates rendering. */
  rightsVerified: boolean;
}

export interface Species {
  commonName: string;
  scientificName: string;
  slug: string;
  waterType: "inshore" | "offshore" | "both";
  permitRequired: boolean;
  seasons: Season[];
  verify: boolean;
  /** Optional NOAA public-domain image; rendered only when rightsVerified. */
  image?: SpeciesImage;
  /**
   * Short "why the limit matters" note tying bag/size limits to stock health.
   * VERIFY: owner confirms vs the NOAA species page before publish — not invented.
   */
  conservationNote?: string;
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
 * Target species, grounded in content/rates.json. Inshore species carry verified
 * 2026 NJ rules (`verify: false`); offshore species carry sourced NOAA / SAFMC
 * values flagged `verify: true` pending owner confirmation. The "00-00" sentinel
 * + `isPlaceholderSeason` machinery remains available for any future unfilled
 * species (set openDate/closeDate to PLACEHOLDER_DATE).
 */
export const species: Species[] = [
  // ── Inshore / nearshore (state + interstate jurisdictions matter here) ──
  {
    commonName: "Striped Bass",
    scientificName: "Morone saxatilis",
    slug: "striped-bass",
    image: {
      src: "/images/species/striped-bass.png",
      credit: "NOAA Fisheries",
      sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-striped-bass",
      rightsVerified: true,
    },
    // VERIFY: NOAA atlantic-striped-bass — confirm current stock status before publish
    conservationNote:
      "The stock is overfished, but the fishing rate established under a rebuilding plan promotes population growth.",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "interstate",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 28,
        bagLimit: 1,
        notes:
          "Slot 28–31 in (1 fish), ASMFC rule as implemented by NJ. Harvest is prohibited in federal waters (>3 mi).",
      },
      {
        jurisdiction: "state",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 28,
        bagLimit: 1,
        notes:
          "Slot 28–31 in (1 fish), NJ ocean waters 0–3 mi, no closed season. See the NJ Marine Digest for the Bonus Program, circle-hook and gaff rules.",
      },
    ],
    verify: false,
  },
  {
    commonName: "Summer Flounder (Fluke)",
    scientificName: "Paralichthys dentatus",
    slug: "summer-flounder-fluke",
    image: {
      src: "/images/species/summer-flounder-fluke.jpg",
      credit: "NOAA Fisheries",
      sourceUrl: "https://www.fisheries.noaa.gov/species/summer-flounder",
      rightsVerified: true,
    },
    // VERIFY: NOAA summer-flounder — confirm current stock status before publish
    conservationNote:
      "The stock is not overfished and is not subject to overfishing.",
    waterType: "both",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "05-04",
        closeDate: "09-25",
        minSizeInches: 18,
        bagLimit: 3,
        notes: "Follows the NJ-implemented recreational measures in federal waters.",
      },
      {
        jurisdiction: "state",
        openDate: "05-04",
        closeDate: "09-25",
        minSizeInches: 18,
        bagLimit: 3,
        notes:
          "NJ ocean rule. Special areas differ: Delaware Bay 3 @ 17 in; Island Beach State Park 2 @ 16 in.",
      },
    ],
    verify: false,
  },
  {
    commonName: "Bluefish",
    scientificName: "Pomatomus saltatrix",
    slug: "bluefish",
    image: {
      src: "/images/species/bluefish.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/bluefish",
      rightsVerified: true,
    },
    // VERIFY: NOAA bluefish — confirm current stock status before publish
    conservationNote:
      "The stock is not overfished and is not subject to overfishing.",
    waterType: "both",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "interstate",
        openDate: "01-01",
        closeDate: "12-31",
        bagLimit: 7,
        notes:
          "7 fish on a for-hire vessel; 5 for private/shore anglers. No minimum size.",
      },
    ],
    verify: false,
  },
  {
    commonName: "Weakfish",
    scientificName: "Cynoscion regalis",
    slug: "weakfish",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "interstate",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 13,
        bagLimit: 1,
        notes: "ASMFC rule as implemented by NJ.",
      },
      {
        jurisdiction: "state",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 13,
        bagLimit: 1,
      },
    ],
    verify: false,
  },
  {
    commonName: "False Albacore (Little Tunny)",
    scientificName: "Euthynnus alletteratus",
    slug: "false-albacore",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "state",
        openDate: "01-01",
        closeDate: "12-31",
        notes: "No NJ size or possession limit (not listed in the NJ recreational summary).",
      },
    ],
    verify: false,
  },
  {
    commonName: "Atlantic Bonito",
    scientificName: "Sarda sarda",
    slug: "atlantic-bonito",
    waterType: "inshore",
    permitRequired: false,
    seasons: [
      {
        jurisdiction: "state",
        openDate: "01-01",
        closeDate: "12-31",
        notes: "No NJ size or possession limit (not listed in the NJ recreational summary).",
      },
    ],
    verify: false,
  },

  // ── Offshore canyons — HMS species are federally managed & permit-required ──
  {
    commonName: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    slug: "bluefin-tuna",
    image: {
      src: "/images/species/bluefin-tuna.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/western-atlantic-bluefin-tuna",
      rightsVerified: true,
    },
    // VERIFY: NOAA western-atlantic-bluefin-tuna — confirm current stock status before publish
    conservationNote:
      "Western Atlantic bluefin tuna is not subject to overfishing; its overfished status is unknown. It is managed under a rebuilding plan.",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 27,
        limitNote:
          "Category system: 2/vessel/day (27–<73 in); trophy 73 in+ is 1/vessel/year with area closures. Limits change in-season — confirm with NOAA.",
        notes: "NOAA HMS Angling permit required.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Yellowfin Tuna",
    scientificName: "Thunnus albacares",
    slug: "yellowfin-tuna",
    image: {
      src: "/images/species/yellowfin-tuna.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-yellowfin-tuna",
      rightsVerified: true,
    },
    // VERIFY: NOAA atlantic-yellowfin-tuna — confirm current stock status before publish
    conservationNote:
      "The stock is not overfished and is not subject to overfishing.",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 27,
        bagLimit: 3,
        notes: "27 in curved fork length. NOAA HMS Angling permit required.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Big-Eye Tuna",
    scientificName: "Thunnus obesus",
    slug: "big-eye-tuna",
    image: {
      src: "/images/species/big-eye-tuna.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-bigeye-tuna",
      rightsVerified: true,
    },
    // VERIFY: NOAA atlantic-bigeye-tuna — confirm current stock status before publish
    conservationNote:
      "The stock is overfished, but the fishing rate established under a conservation and management plan promotes population growth.",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 27,
        limitNote: "No federal retention limit",
        notes: "27 in curved fork length. NOAA HMS Angling permit required.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Longfin Tuna (Albacore)",
    scientificName: "Thunnus alalunga",
    slug: "longfin-tuna-albacore",
    image: {
      src: "/images/species/longfin-tuna-albacore.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/north-atlantic-albacore-tuna",
      rightsVerified: true,
    },
    // VERIFY: NOAA north-atlantic-albacore-tuna — confirm current stock status before publish
    conservationNote:
      "North Atlantic albacore is not overfished and not subject to overfishing.",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        limitNote: "No minimum size or federal retention limit",
        notes: "NOAA HMS Angling permit required.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Mahi (Dolphinfish)",
    scientificName: "Coryphaena hippurus",
    slug: "mahi-dolphinfish",
    image: {
      src: "/images/species/mahi-dolphinfish.jpg",
      credit: "NOAA Fisheries",
      sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-mahi-mahi",
      rightsVerified: true,
    },
    // VERIFY: NOAA atlantic-mahi-mahi — confirm current stock status before publish
    conservationNote:
      "The population level is unknown, but management measures are in place.",
    waterType: "offshore",
    permitRequired: false, // federally managed (Mid-Atlantic) but NOT an HMS permit species
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        bagLimit: 10,
        limitNote:
          "60/vessel max; no Mid-Atlantic minimum size (20 in fork length applies only off GA/FL).",
        notes: "U.S. Atlantic Dolphin & Wahoo FMP (SAFMC). Not an HMS permit species.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Wahoo",
    scientificName: "Acanthocybium solandri",
    slug: "wahoo",
    image: {
      src: "/images/species/wahoo.jpg",
      credit: "NOAA Fisheries",
      sourceUrl: "https://www.fisheries.noaa.gov/species/atlantic-wahoo",
      rightsVerified: true,
    },
    // VERIFY: NOAA atlantic-wahoo — confirm current stock status before publish
    conservationNote:
      "The stock has not been assessed; population levels are unknown, but management measures are in place.",
    waterType: "offshore",
    permitRequired: false, // federally managed but NOT an HMS permit species
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        bagLimit: 2,
        limitNote: "No minimum size; must be landed with head and fins intact.",
        notes: "U.S. Atlantic Dolphin & Wahoo FMP (SAFMC). Not an HMS permit species.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Marlin (Billfish)",
    scientificName: "Istiophoridae spp.",
    slug: "marlin-billfish",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS billfish
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 99,
        limitNote:
          "No individual limit; 250/year U.S. national landings quota (blue + white marlin + roundscale spearfish combined).",
        notes:
          "Blue marlin 99 in / white marlin 66 in lower-jaw fork length. NOAA HMS permit; catch-and-release encouraged.",
      },
    ],
    verify: true,
  },
  {
    commonName: "Swordfish",
    scientificName: "Xiphias gladius",
    slug: "swordfish",
    image: {
      src: "/images/species/swordfish.png",
      credit: "NOAA Fisheries/Jack Hornady",
      sourceUrl: "https://www.fisheries.noaa.gov/species/north-atlantic-swordfish",
      rightsVerified: true,
    },
    // VERIFY: NOAA north-atlantic-swordfish — confirm current stock status before publish
    conservationNote:
      "The stock is not overfished and is not subject to overfishing.",
    waterType: "offshore",
    permitRequired: true, // NOAA HMS
    seasons: [
      {
        jurisdiction: "federal",
        openDate: "01-01",
        closeDate: "12-31",
        minSizeInches: 47,
        bagLimit: 1,
        limitNote: "up to 4/vessel/trip",
        notes:
          "47 in lower-jaw fork length (or 25 in cleithrum to keel). NOAA HMS permit required.",
      },
    ],
    verify: true,
  },
];
