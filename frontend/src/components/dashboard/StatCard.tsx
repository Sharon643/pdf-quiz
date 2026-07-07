import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-5
        transition-colors
        hover:bg-zinc-800
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          {title}
        </span>

        <div className="text-zinc-500">
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}