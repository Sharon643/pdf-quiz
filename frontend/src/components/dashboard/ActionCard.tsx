import type { ReactNode } from "react";
import Button from "../ui/Button"

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  buttonText: string;
  onClick: () => void;

  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
}
export default function ActionCard({
  title,
  description,
  icon,
  buttonText,
  onClick,
  secondaryButtonText,
  onSecondaryClick,
}: ActionCardProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition-colors
        hover:bg-zinc-800
      "
    >
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800">
          {icon}
        </div>

        <div>

          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {description}
          </p>

        </div>

      </div>

    <div className="flex gap-3">

    {secondaryButtonText && (
        <Button
        variant="secondary"
        onClick={onSecondaryClick}
        >
        {secondaryButtonText}
        </Button>
    )}

    <Button
        variant="secondary"
        onClick={onClick}
    >
        {buttonText}
    </Button>

    </div>
    </div>
  );
}