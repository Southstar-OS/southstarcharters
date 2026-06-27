import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";

// The gallery page is a client component and cannot export `metadata`,
// so its canonical URL is declared here in a route-level layout.
const TITLE = "Photo Gallery | SouthStar Charters";
const DESCRIPTION =
  "Photos from SouthStar Charters — NYC harbor tours, New Jersey fishing charters, and life on the water from Staten Island, NY.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: pageOpenGraph({ path: "/gallery", title: TITLE, description: DESCRIPTION }),
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
