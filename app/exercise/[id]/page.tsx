import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import CategoryTags from "@/components/CategoryTags";
import KeySpecsPanel from "@/components/KeySpecsPanel";
import InstructionsList from "@/components/InstructionsList";
import DetailActions from "@/components/DetailActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-secondary transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left column - visual media */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border-subtle bg-surface lg:sticky lg:top-24 lg:self-start">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.10),transparent_70%)]" />
            <Image
              src={workout.image}
              alt={`${workout.name} demonstration`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right column - info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-text-primary sm:text-4xl">
                {workout.name}
              </h1>
              <p className="text-base leading-relaxed text-text-secondary">
                {workout.description}
              </p>
              <CategoryTags tags={workout.muscleGroups} />
            </div>

            <KeySpecsPanel workout={workout} />

            <InstructionsList steps={workout.instructions} />

            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}
