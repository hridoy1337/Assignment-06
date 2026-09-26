import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-surface-2 p-8 sm:p-12 md:grid-cols-2 md:p-16">
          <div className="flex flex-col items-start gap-6">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
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
              className="mt-2 inline-flex items-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-accent-dim"
            >
              Browse Workouts
            </a>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image
              src="/assets/banner.png"
              alt="Anatomical illustration performing a resistance machine exercise"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
