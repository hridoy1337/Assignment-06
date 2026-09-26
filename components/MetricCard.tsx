export default function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border-subtle bg-surface px-4 py-6 text-center sm:items-start sm:text-left">
      <span className="font-display text-3xl font-bold text-accent">{value}</span>
      <span className="text-xs font-bold uppercase tracking-wide text-text-tertiary">
        {label}
      </span>
    </div>
  );
}
