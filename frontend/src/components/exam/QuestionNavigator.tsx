import { useEffect, useRef } from "react";

interface QuestionNavigatorProps {
  total: number;
  current: number;
  visited: Set<number>;
  answered: Set<number>;
  review: Set<number>;
  onSelect: (question: number) => void;
}

export default function QuestionNavigator({
  total,
  current,
  answered,
  review,
  visited,
  onSelect,
}: QuestionNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const button = buttonRefs.current[current - 1];

    if (!button) return;

    button.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [current]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Questions
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Jump to any question instantly.
      </p>

      {/* Question Grid */}

     <div
        ref={containerRef}
        className="mt-6 h-[255px] overflow-y-auto pr-2 pt-2 pl-2"
      >
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: total }).map((_, index) => {
            const number = index + 1;

            const isCurrent = current === number;
            const isAnswered = answered.has(number);
            const isReview = review.has(number);
            const isVisited = visited.has(number);

            let style =
              "border-zinc-700 bg-zinc-950 text-zinc-500";

            if (isAnswered && isReview) {
              style =
                "border-violet-500 bg-violet-500/15 text-violet-300";
            } else if (isAnswered) {
              style =
                "border-emerald-500 bg-emerald-500/15 text-emerald-300";
            } else if (isReview) {
              style =
                "border-amber-500 bg-amber-500/15 text-amber-300";
            } else if (isVisited && !isCurrent) {
              style =
                "border-red-500 bg-red-500/10 text-red-300";
            }

            return (
              <button
                key={number}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                onClick={() => onSelect(number)}
                className={`
                  aspect-square
                  rounded-lg
                  border
                  text-sm
                  font-semibold
                  transition-all
                  duration-150

                  ${style}

                  ${
                    isCurrent
                      ? "scale-110 ring-2 ring-white/20 shadow-lg z-10"
                      : "hover:scale-105"
                  }
                `}
              >
                {number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}

      <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-zinc-400">
        <span className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Answered
        </span>

        <span className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          Review
        </span>

        <span className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
          Unanswered
        </span>

        <span className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          Answered + Review
        </span>
      </div>
    </section>
  );
}