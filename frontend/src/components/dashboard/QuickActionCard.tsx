import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function QuickActionCard({
  title,
  description,
  icon,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        flex-col
        items-start
        justify-between
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        text-left
        transition-all
        duration-200
        hover:border-blue-600
        hover:bg-zinc-800
      "
    >
      <div className="mb-6 text-zinc-400">
        {icon}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          {description}
        </p>
      </div>
    </button>
  );
}