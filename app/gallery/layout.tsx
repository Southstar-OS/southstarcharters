import type { Metadata } from "next";

// The gallery page is a client component and cannot export `metadata`,
// so its canonical URL is declared here in a route-level layout.
export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
