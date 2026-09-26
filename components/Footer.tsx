import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-background">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-text-primary">
            FitLog
          </span>
        </div>
        <p className="text-center text-sm text-text-tertiary sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
