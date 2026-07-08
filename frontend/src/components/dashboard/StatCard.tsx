import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition-colors
        hover:border-zinc-700
      "
    >
      <div className="space-y-2">

        <h2 className="text-4xl font-semibold tracking-tight text-white">
          {value}
        </h2>

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          {title}
        </p>

      </div>
    </div>
  );
}