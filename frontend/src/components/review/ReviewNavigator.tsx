import { useEffect, useRef } from "react";

import type { ReviewQuestion } from "../../types/review";

interface ReviewNavigatorProps {
  questions: ReviewQuestion[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function ReviewNavigator({
  questions,
  currentIndex,
  onSelect,
}: ReviewNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const button = buttonRefs.current[currentIndex];

    if (!button) return;

    button.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentIndex]);

  function getButtonColour(question: ReviewQuestion) {
    if (question.marked) {
      return "bg-yellow-500 hover:bg-yellow-400";
    }

    if (question.isSkipped) {
      return "bg-zinc-600 hover:bg-zinc-500";
    }

    if (question.isCorrect) {
      return "bg-green-600 hover:bg-green-500";
    }

    return "bg-red-600 hover:bg-red-500";
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-lg font-semibold text-white">
          Question Navigator
        </h3>

        <span className="text-sm text-zinc-400">
          {currentIndex + 1} / {questions.length}
        </span>

      </div>

      <div className="relative">

        {/* Left fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-zinc-900 to-transparent" />

        {/* Right fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-zinc-900 to-transparent" />

        <div
          ref={containerRef}
          className="
            flex
            items-center
            gap-2
            overflow-x-auto
            px-8
            py-2
            scroll-smooth
            scrollbar-none
          "
        >
          {questions.map((question, index) => {
            const active = index === currentIndex;

            return (
              <button
                key={question.id}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                onClick={() => onSelect(index)}
                className={`
                  h-10
                  w-10
                  flex-shrink-0
                  rounded-lg
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  ${getButtonColour(question)}
                  ${
                    active
                      ? "scale-110 ring-2 ring-white shadow-lg"
                      : "opacity-80 hover:scale-105 hover:opacity-100"
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

      </div>

        <div className="mt-5 flex items-center justify-between gap-6">

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs">

            <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-600" />
            <span className="text-zinc-400">Correct</span>
            </div>

            <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-600" />
            <span className="text-zinc-400">Wrong</span>
            </div>

            <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-zinc-600" />
            <span className="text-zinc-400">Skipped</span>
            </div>

            <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="text-zinc-400">Marked</span>
            </div>

        </div>

        {/* Tip */}
        <p className="ml-auto flex-shrink-0 text-xs text-zinc-500">
            💡 Tip:  Use{" "}
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
            ← →
            </kbd>{" "}
            or{" "}
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
            Shift
            </kbd>{" "}
            + mouse wheel to navigate.
        </p>

        </div>


    </div>
  );
}