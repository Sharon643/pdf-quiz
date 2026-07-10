interface QuestionNavigatorProps {
  total: number;
  current: number;

  answered: Set<number>;
  review: Set<number>;

  onSelect: (question: number) => void;
}

export default function QuestionNavigator({
  total,
  current,
  answered,
  review,
  onSelect,
}: QuestionNavigatorProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Questions
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Jump to any question instantly.
      </p>

      <div className="mt-6 grid grid-cols-5 gap-3">

        {Array.from({ length: total }).map((_, index) => {

          const number = index + 1;

          let style =
            "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700";

          if (answered.has(number)) {
            style =
              "border-emerald-500 bg-emerald-500/20 text-emerald-300";
          }

          if (review.has(number)) {
            style =
              "border-amber-500 bg-amber-500/20 text-amber-300";
          }

          if (current === number) {
            style =
              "border-slate-500 bg-slate-600 text-white";
          }

          return (
            <button
              key={number}
              onClick={() => onSelect(number)}
              className={`
                aspect-square
                rounded-xl
                border
                text-sm
                font-semibold
                transition-all
                ${style}
              `}
            >
              {number}
            </button>
          );

        })}

      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-zinc-400">

        <span className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Answered
        </span>

        <span className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            Current
        </span>

        <span className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Review
        </span>

        <span className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            Unanswered
        </span>

        </div>

    </section>
  );
}