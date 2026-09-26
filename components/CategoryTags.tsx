export default function CategoryTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border-strong bg-surface-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-text-secondary"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
