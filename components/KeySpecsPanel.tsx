import { Workout } from "@/lib/types";

export default function KeySpecsPanel({ workout }: { workout: Workout }) {
  const rows: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between px-5 py-3.5 ${
            i !== rows.length - 1 ? "border-b border-border-subtle" : ""
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wide text-text-tertiary">
            {row.label}
          </span>
          <span className="text-sm font-semibold text-text-primary">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
