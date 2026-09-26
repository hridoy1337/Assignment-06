"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Workout } from "@/lib/types";
import { useToast } from "./ToastContext";
import { useWorkouts } from "./WorkoutsContext";

export interface PlanEntry {
  workout: Workout;
  done: boolean;
}

interface StoredPlanItem {
  id: number;
  done: boolean;
}

interface PlanContextValue {
  todaysPlan: PlanEntry[];
  saved: Workout[];
  hydrated: boolean;
  planCap: number;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const PLAN_KEY = "fitlog:todays-plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const { workouts } = useWorkouts();

  // we only persist ids + done flag, not the whole workout object -
  // the real data always comes from the API via WorkoutsContext
  const [planIds, setPlanIds] = useState<StoredPlanItem[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlanIds(readJSON<StoredPlanItem[]>(PLAN_KEY, []));
    setSavedIds(readJSON<number[]>(SAVED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));
  }, [planIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds, hydrated]);

  const isInPlan = useCallback((id: number) => planIds.some((p) => p.id === id), [planIds]);
  const isSaved = useCallback((id: number) => savedIds.includes(id), [savedIds]);

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (isInPlan(workout.id)) {
        showToast(`${workout.name} is already in today's plan`, "info");
        return;
      }
      if (planIds.length >= PLAN_CAP) {
        showToast("Today's plan is full — finish a lift before adding more", "info");
        return;
      }
      setPlanIds((prev) => [...prev, { id: workout.id, done: false }]);
      showToast("Added to today's plan");
    },
    [isInPlan, planIds.length, showToast]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (isSaved(workout.id)) {
        showToast(`${workout.name} is already saved`, "info");
        return;
      }
      setSavedIds((prev) => [...prev, workout.id]);
      showToast("Saved for later");
    },
    [isSaved, showToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlanIds((prev) => prev.filter((p) => p.id !== id));
      showToast("Removed from today's plan", "info");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSavedIds((prev) => prev.filter((savedId) => savedId !== id));
      showToast("Removed from saved", "info");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id: number) => {
      let willBeDone = false;
      setPlanIds((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          willBeDone = !p.done;
          return { ...p, done: willBeDone };
        })
      );
      showToast(willBeDone ? "Marked as done" : "Marked as not done");
    },
    [showToast]
  );

  // join the stored ids against the live workout list to get full objects.
  // if the API list hasn't loaded yet this is just empty - the pages show
  // their own loading state for that.
  const todaysPlan: PlanEntry[] = planIds
    .map((item) => {
      const workout = workouts.find((w) => w.id === item.id);
      return workout ? { workout, done: item.done } : null;
    })
    .filter((entry): entry is PlanEntry => entry !== null);

  const saved: Workout[] = savedIds
    .map((id) => workouts.find((w) => w.id === id))
    .filter((w): w is Workout => Boolean(w));

  const value: PlanContextValue = {
    todaysPlan,
    saved,
    hydrated,
    planCap: PLAN_CAP,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
