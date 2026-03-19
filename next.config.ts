import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Security Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────
  // Preserve SEO equity from old WordPress URLs.
  async redirects() {
    return [
      // Old /charters path → new /fishing-charters
      {
        source: "/charters",
        destination: "/fishing-charters",
        permanent: true, // 308 (permanent redirect)
      },
      {
        source: "/charters/",
        destination: "/fishing-charters",
        permanent: true,
      },
      // Old hidden rates page
      {
        source: "/1588-2",
        destination: "/rates",
        permanent: true,
      },
      {
        source: "/1588-2/",
        destination: "/rates",
        permanent: true,
      },
    ];
  },

  // ── Images ────────────────────────────────────────────────────────
  images: {
    // Allow images from these domains if needed in the future (e.g., CDN).
    remotePatterns: [],
  },
};

export default nextConfig;
