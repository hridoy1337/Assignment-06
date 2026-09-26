"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = OPTIONS.find((o) => o.key === value)?.label ?? "Duration";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-text-primary transition hover:border-accent/60"
      >
        <span className="text-text-tertiary">Sort By</span>
        <span>{current}</span>
        <ChevronDown className={`h-4 w-4 text-text-secondary transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-border-strong bg-surface-2 shadow-xl shadow-black/40">
          {OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                onChange(opt.key);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition hover:bg-surface-3 ${
                opt.key === value ? "text-accent" : "text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
