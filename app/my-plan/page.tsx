"use client";

import { useMemo, useState } from "react";
import { usePlan, PlanEntry } from "@/context/PlanContext";
import { useWorkouts } from "@/context/WorkoutsContext";
import { SortKey, Workout } from "@/lib/types";
import MetricCard from "@/components/MetricCard";
import PlanListItem from "@/components/PlanListItem";
import EmptyState from "@/components/EmptyState";
import SortDropdown from "@/components/SortDropdown";
import Spinner from "@/components/Spinner";

type Tab = "today" | "saved";

function sortByKey<T extends { duration: number; caloriesBurned: number; rating: number }>(
  list: T[],
  key: SortKey
) {
  const copy = [...list];
  if (key === "calories") return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  if (key === "rating") return copy.sort((a, b) => b.rating - a.rating);
  return copy.sort((a, b) => a.duration - b.duration);
}

export default function MyPlanPage() {
  const { todaysPlan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const { status: workoutsStatus } = useWorkouts();
  const [tab, setTab] = useState<Tab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const stillLoading = !hydrated || workoutsStatus === "loading";

  const metrics = useMemo(() => {
    return todaysPlan.reduce(
      (acc, entry) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + entry.workout.duration,
        calories: acc.calories + entry.workout.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [todaysPlan]);

  const sortedPlan: PlanEntry[] = useMemo(() => {
    const byId = new Map(todaysPlan.map((e) => [e.workout.id, e]));
    return sortByKey(todaysPlan.map((e) => e.workout), sortKey).map(
      (w) => byId.get(w.id) as PlanEntry
    );
  }, [todaysPlan, sortKey]);

  const sortedSaved: Workout[] = useMemo(() => sortByKey(saved, sortKey), [saved, sortKey]);

  const activeCount = tab === "today" ? sortedPlan.length : sortedSaved.length;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-text-primary sm:text-4xl">
          My Plan
        </h1>
        <p className="mt-2 text-text-secondary">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <MetricCard label="Exercises" value={metrics.exercises} />
          <MetricCard label="Minutes" value={metrics.minutes} />
          <MetricCard label="Calories" value={metrics.calories} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab("today")}
              className={`relative px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
                tab === "today" ? "text-accent" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Today&apos;s Plan
              {tab === "today" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
            </button>
            <button
              onClick={() => setTab("saved")}
              className={`relative px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
                tab === "saved" ? "text-accent" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Saved
              {tab === "saved" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
            </button>
          </div>

          {!stillLoading && activeCount > 1 && (
            <div className="pb-3">
              <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>
          )}
        </div>

        <div className="mt-8">
          {stillLoading && <Spinner label="Loading workouts…" />}

          {!stillLoading && tab === "today" && (
            <>
              {sortedPlan.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-4">
                  {sortedPlan.map((entry) => (
                    <PlanListItem
                      key={entry.workout.id}
                      workout={entry.workout}
                      done={entry.done}
                      onRemove={() => removeFromPlan(entry.workout.id)}
                      onMarkDone={() => markDone(entry.workout.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {!stillLoading && tab === "saved" && (
            <>
              {sortedSaved.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-4">
                  {sortedSaved.map((workout) => (
                    <PlanListItem
                      key={workout.id}
                      workout={workout}
                      onRemove={() => removeFromSaved(workout.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
