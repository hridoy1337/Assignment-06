"use client";

import { Bookmark, BookmarkCheck, ListPlus, ListChecks } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, todaysPlan, planCap } = usePlan();

  const inPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planIsFull = todaysPlan.length >= planCap && !inPlan;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan || planIsFull}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-accent-dim disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-text-tertiary"
      >
        {inPlan ? <ListChecks className="h-4 w-4" /> : <ListPlus className="h-4 w-4" />}
        {inPlan ? "Already in today's plan" : planIsFull ? "Today's plan is full" : "Add to today's plan"}
      </button>

      <button
        onClick={() => addToSaved(workout)}
        disabled={alreadySaved}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-text-primary transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:border-border-subtle disabled:text-text-tertiary"
      >
        {alreadySaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {alreadySaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
