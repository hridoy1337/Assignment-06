"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-[81px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/assets/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-xl font-bold uppercase tracking-wide text-text-primary">
            FitLog
          </span>
        </Link>

        {/* Center nav links - desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition ${
                  active
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right badges - desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/my-plan" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="text-sm font-bold uppercase tracking-wide text-text-primary">Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-background">
              {todaysPlan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="text-sm font-bold uppercase tracking-wide text-text-primary">Saved</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-border-strong px-1.5 text-xs font-bold text-text-primary">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center rounded-lg border border-border-subtle p-2 text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border-subtle bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    active ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-6">
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-text-primary">Plan</span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-background">
                  {todaysPlan.length}
                </span>
              </Link>
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-text-primary">Saved</span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-border-strong px-1.5 text-xs font-bold text-text-primary">
                  {saved.length}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
