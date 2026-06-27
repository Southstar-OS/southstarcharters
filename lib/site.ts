/** Global site configuration — single source of truth for brand, contact, and SEO defaults. */

export const siteConfig = {
  name: "SouthStar Charters",
  tagline: "No Bad Bite",
  description:
    "Explore the best tourist spots of New York Harbor and fish the Jersey Shore with SouthStar Charters. Private harbor tours, inshore and offshore fishing charters, and spearfishing from Staten Island, NY.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://southstarchartersnj.com",
  ogImage: "/images/gallery/southstar_gallery_1.webp",

  contact: {
    phone: "(833) 464-8687", // national toll-free booking line
    phoneTel: "+18334648687",
    email: "info@southstarchartersnj.com",
    // Primary NAP anchor = the verified Wyckoff Business Profile.
    address: {
      street: "431 Lafayette Ave",
      city: "Wyckoff",
      state: "NJ",
      zip: "07481",
    },
  },

  /**
   * Locations. Wyckoff is the canonical NAP / sole LocalBusiness anchor; the
   * marinas are DEPARTURE POINTS we operate from (not separate businesses).
   * Marina phones are departure-point info only — booking is the toll-free line
   * above. Coordinates come from the owner's verified Google Business profiles.
   * (No Wyckoff coordinate is published, so the anchor carries no geo.)
   */
  locations: {
    primary: {
      name: "SouthStar Charters NJ / NY",
      role: "Main office",
      address: {
        street: "431 Lafayette Ave",
        city: "Wyckoff",
        state: "NJ",
        zip: "07481",
      },
    },
    departurePoints: [
      {
        name: "Bayview Harbor",
        role: "Departure point",
        address: {
          street: "1301 Bayview Ave",
          city: "Barnegat Light",
          state: "NJ",
          zip: "08006",
        },
        geo: { lat: 39.7543491, lng: -74.1119982 },
        marinaPhone: "(609) 494-7450",
        speciesHref: "/species",
        fishery:
          "Our primary offshore canyon and HMS grounds — bluefin, yellowfin, bigeye, albacore, mahi, wahoo, and swordfish — plus seasonal striped bass.",
      },
      {
        name: "Atlantis Marina",
        role: "Departure point",
        address: {
          street: "183 Mansion Ave",
          city: "Staten Island",
          state: "NY",
          zip: "10308",
        },
        geo: { lat: 40.5435574, lng: -74.1414529 },
        marinaPhone: "(718) 966-9700",
        speciesHref: "/species#striped-bass",
        fishery: "Seasonal striped bass.",
      },
    ],
  },

  social: {
    facebook: "https://www.facebook.com/southstarchartersnjny/",
    instagram: "https://www.instagram.com/southstarfishingcharters/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Harbor Tours", href: "/harbor-tours" },
    { label: "Fishing Charters", href: "/fishing-charters" },
    { label: "Species & Seasons", href: "/species" },
    { label: "Rates", href: "/rates" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
