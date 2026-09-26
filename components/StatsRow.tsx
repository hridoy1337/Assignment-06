import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
  size = "sm",
}: {
  duration: number;
  calories: number;
  rating: number;
  size?: "sm" | "md";
}) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={`flex items-center gap-4 ${textSize} font-semibold text-text-primary`}>
      <span className="flex items-center gap-1.5">
        <Clock className={`${iconSize} text-accent`} />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className={`${iconSize} fill-accent text-accent`} />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className={`${iconSize} text-accent`} />
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
