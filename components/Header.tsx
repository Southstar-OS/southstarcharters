"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with <Image> once logo asset is ready */}
          <span className="text-xl font-bold tracking-tight text-slate-900">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            Book Your Charter
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "border-t border-slate-200 bg-white md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="space-y-1 px-4 py-3">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 block rounded-md bg-sky-600 px-4 py-2 text-center text-base font-semibold text-white hover:bg-sky-700"
            onClick={() => setMobileOpen(false)}
          >
            Book Your Charter
          </Link>
        </nav>
      </div>
    </header>
  );
}
