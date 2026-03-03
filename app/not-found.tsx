// app/not-found.tsx — Custom 404 page, on-brand
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16">
      <h1 className="mb-2 text-4xl font-semibold text-text-primary">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-center text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
