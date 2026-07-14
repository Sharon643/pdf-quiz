import {
  CheckCircle2,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

interface OptionCardProps {
  optionKey: string;
  optionText: string;

  selected: boolean;

  correct?: boolean;
  incorrect?: boolean;

  disabled?: boolean;

  onSelect: () => void;
}

export default function OptionCard({
  optionKey,
  optionText,
  selected,
  correct = false,
  incorrect = false,
  disabled = false,
  onSelect,
}: OptionCardProps) {
  let container =
    "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900";

  let badge =
    "bg-zinc-800 text-zinc-300";

  let icon = null;

  if (correct) {
    container =
        "border-emerald-500 bg-emerald-500/15 scale-[1.02] shadow-lg shadow-emerald-500/20";

    badge =
      "bg-emerald-500 text-white";

    icon = (
      <CircleCheckBig
        size={22}
        className="text-emerald-400"
      />
    );
  } else if (incorrect) {
    container =
      "border-red-500 bg-red-500/15 animate-[shake_0.35s_ease-in-out]";

    badge =
      "bg-red-500 text-white";

    icon = (
      <CircleX
        size={22}
        className="text-red-400"
      />
    );
  } else if (selected) {
    container =
      "border-slate-600 bg-slate-700/20";

    badge =
      "bg-slate-600 text-white";

    icon = (
      <CheckCircle2
        size={22}
        className="text-slate-300"
      />
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onSelect}
      className={`
        group
        w-full
        rounded-2xl
        border
        p-6
        text-left
        transition-all
        duration-300
        ease-out

        ${container}

        ${
          disabled
            ? "cursor-default"
            : "hover:scale-[1.01]"
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

            ${badge}
          `}
        >
          {optionKey}
        </div>

        <div className="flex-1">

          <p className="leading-6 text-zinc-100">
            {optionText}
          </p>

        </div>

        {icon}

      </div>

    </button>
  );
}