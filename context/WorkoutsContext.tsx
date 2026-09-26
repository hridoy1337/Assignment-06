"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import { getWorkouts } from "@/lib/api";

type Status = "loading" | "error" | "ready";

interface WorkoutsContextValue {
  workouts: Workout[];
  status: Status;
}

const WorkoutsContext = createContext<WorkoutsContextValue>({
  workouts: [],
  status: "loading",
});

// fetches the exercise list once at the root and hands it down - avoids
// re-fetching the same 12 workouts on both the home page and My Plan
export function WorkoutsProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    getWorkouts()
      .then((data) => {
        if (cancelled) return;
        setWorkouts(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <WorkoutsContext.Provider value={{ workouts, status }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  return useContext(WorkoutsContext);
}
