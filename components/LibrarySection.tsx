"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SortKey } from "@/lib/types";
import { useWorkouts } from "@/context/WorkoutsContext";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import Spinner from "./Spinner";

export default function LibrarySection() {
  const { workouts, status } = useWorkouts();
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    const list = [...workouts];
    if (sortKey === "calories") return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    if (sortKey === "rating") return list.sort((a, b) => b.rating - a.rating);
    return list.sort((a, b) => a.duration - b.duration);
  }, [workouts, sortKey]);

  return (
    <section id="library" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-text-primary">
              The Library
            </h2>
            <p className="mt-2 text-text-secondary">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {status === "ready" && workouts.length > 0 && (
            <SortDropdown value={sortKey} onChange={setSortKey} />
          )}
        </div>

        <div className="mt-10">
          {status === "loading" && <Spinner label="Loading workouts…" />}

          {status === "error" && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-surface py-16 text-center">
              <AlertTriangle className="h-8 w-8 text-accent" />
              <p className="font-display text-lg uppercase tracking-wide text-text-primary">
                Couldn&apos;t load the library
              </p>
              <p className="max-w-sm text-sm text-text-secondary">
                Something went wrong reaching the workout API. Check your connection and refresh the page.
              </p>
            </div>
          )}

          {status === "ready" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
