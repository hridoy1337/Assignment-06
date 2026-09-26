import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </span>

          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-text-primary sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-text-secondary">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-background transition hover:bg-accent-dim"
          >
            Browse Workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-border-subtle bg-surface">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.12),transparent_70%)]" />
          <Image
            src="/assets/banner.png"
            alt="Anatomical illustration performing a resistance machine exercise"
            fill
            priority
            className="object-contain p-6"
          />
        </div>
      </div>
    </section>
  );
}
