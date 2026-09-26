import { Loader2 } from "lucide-react";

export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-text-secondary">
      <Loader2 className="h-8 w-8 animate-spin-slow text-accent" />
      {label && <p className="text-sm font-medium uppercase tracking-wide">{label}</p>}
    </div>
  );
}
