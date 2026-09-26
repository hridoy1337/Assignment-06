export default function CategoryTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-background"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
