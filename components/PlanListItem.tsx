"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Workout } from "@/lib/types";
import StatsRow from "./StatsRow";

export default function PlanListItem({
  workout,
  done,
  onRemove,
  onMarkDone,
}: {
  workout: Workout;
  done?: boolean;
  onRemove: () => void;
  onMarkDone?: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border bg-surface p-4 transition sm:flex-row sm:items-center ${
        done ? "border-accent/40 opacity-70" : "border-border-subtle"
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-surface-3 sm:w-28">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-text-primary">
          {workout.name}
          {done && (
            <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
              Done
            </span>
          )}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{workout.equipment}</p>
        <div className="mt-2">
          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/exercise/${workout.id}`}
          className="rounded-full border border-border-strong px-4 py-2 text-xs font-bold uppercase tracking-wide text-text-primary transition hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {onMarkDone && (
          <button
            onClick={onMarkDone}
            aria-label="Mark as done"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
              done
                ? "border-accent bg-accent text-background"
                : "border-border-strong text-text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            <Check className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-secondary transition hover:border-red-500/60 hover:text-red-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
