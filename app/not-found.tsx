import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
      >
        Back to Home
      </Link>
    </section>
  );
}
