import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import CategoryTags from "./CategoryTags";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-accent bg-surface-2 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="relative h-44 w-full overflow-hidden bg-surface-3">
        <Image
          src={workout.image}
          alt={`${workout.name} demonstration`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <CategoryTags tags={workout.muscleGroups} />

        <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-text-primary">
          {workout.name}
        </h3>

        <p className="text-sm text-text-secondary">{workout.equipment}</p>

        <div className="mt-auto pt-2">
          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
