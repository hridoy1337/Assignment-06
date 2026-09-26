import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-3">
        <Dumbbell className="h-6 w-6 text-accent" />
      </div>
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-text-primary">
        Nothing Here Yet
      </h3>
      <p className="max-w-sm text-sm text-text-secondary">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition hover:bg-accent-dim"
      >
        Go to Workouts
      </Link>
    </div>
  );
}
