/** Global site configuration — single source of truth for brand, contact, and SEO defaults. */

export const siteConfig = {
  name: "SouthStar Charters",
  tagline: "No Bad Bite",
  description:
    "Explore the best tourist spots of New York Harbor and fish the Jersey Shore with SouthStar Charters. Private harbor tours, inshore and offshore fishing charters, and spearfishing from Staten Island, NY.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://southstarchartersnj.com",
  ogImage: "/images/og-default.jpg",

  contact: {
    phone: "(833) 464-8687",
    phoneTel: "+18334648687",
    email: "info@southstarchartersnj.com",
    address: {
      street: "180 Madison Ave",
      city: "Staten Island",
      state: "NY",
      zip: "10308",
    },
  },

  social: {
    facebook: "https://www.facebook.com/southstarchartersnjny/",
    instagram: "https://www.instagram.com/southstarfishingcharters/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Harbor Tours", href: "/harbor-tours" },
    { label: "Fishing Charters", href: "/fishing-charters" },
    { label: "Rates", href: "/rates" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
