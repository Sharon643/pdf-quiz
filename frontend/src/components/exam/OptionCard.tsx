import { CheckCircle2 } from "lucide-react";

interface OptionCardProps {
  optionKey: string;
  optionText: string;
  selected: boolean;
  onSelect: () => void;
}

export default function OptionCard({
  optionKey,
  optionText,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        group
        w-full
        rounded-2xl
        border
        p-6
        text-left
        transition-all
        duration-200

        ${
          selected
            ? "border-slate-600 bg-slate-700/20"
            : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900"
        }
      `}
    >
      <div className="flex gap-5">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            font-semibold

            ${
              selected
                ? "bg-slate-600 text-white"
                : "bg-zinc-800 text-zinc-300"
            }
          `}
        >
          {optionKey}
        </div>

        <div className="flex-1">

          <p className="leading-6 text-zinc-100">
            {optionText}
          </p>

        </div>

        {selected && (
          <CheckCircle2
            className="text-slate-300"
            size={22}
          />
        )}

      </div>

    </button>
  );
}