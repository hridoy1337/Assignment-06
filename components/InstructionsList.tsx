export default function InstructionsList({ steps }: { steps: string[] }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text-primary">
        Instructions
      </h2>
      <ol className="mt-4 flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-background">
              {i + 1}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-text-secondary">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
