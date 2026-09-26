import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-background px-4 py-24">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 border border-border-strong">
          <Dumbbell className="h-7 w-7 text-accent" />
        </div>
        <span className="font-display text-6xl font-bold tracking-wide text-accent">404</span>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
          Rep not found
        </h1>
        <p className="max-w-sm text-sm text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist, or the lift got moved to a
          different rack. Let&apos;s get you back to the library.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition hover:bg-accent-dim"
        >
          Go to Workouts
        </Link>
      </div>
    </section>
  );
}
