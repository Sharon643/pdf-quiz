import OptionCard from "./OptionCard";
import Button from "../ui/Button";

import type { ExamQuestion } from "../../types/exam";

interface QuestionPanelProps {
  question: ExamQuestion;
  selectedOption: string | null;
  isMarkedForReview: boolean;

  hasPrevious: boolean;
  hasNext: boolean;

  onSelectOption: (option: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onMarkReview: () => void;
}

export default function QuestionPanel({
  question,
  selectedOption,
  hasPrevious,
  hasNext,
  isMarkedForReview,
  onSelectOption,
  onPrevious,
  onNext,
  onMarkReview,
}: QuestionPanelProps) {
  return (
    <section
    className="
        flex
        h-[calc(100vh-120px)]
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
    "
    >

      {/* Header */}

      <div className="border-b border-zinc-800 px-6 py-4">

        <span className="text-sm text-zinc-500">
          Question {question.number}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {question.subject ?? "General"}
        </h2>

      </div>

      {/* Question */}

      <div
        className="
            flex-1
            overflow-y-auto
            px-6
            py-5
        "
        >

        <p className="mb-6 text-base leading-7 text-zinc-100">
          {question.question}
        </p>

        <div className="space-y-4">

          {Object.entries(question.options).map(([key, value]) => (
            <OptionCard
              key={key}
              optionKey={key}
              optionText={value}
              selected={selectedOption === key}
              onSelect={() => onSelectOption(key)}
            />
          ))}

        </div>

      </div>

      {/* Footer */}

    <div
    className="
        sticky
        bottom-0
        z-30
        border-t
        border-zinc-800
        bg-zinc-950/95
        px-6
        py-4
        backdrop-blur
    "
    >

    <div className="flex items-center justify-between">

        <Button
        variant="secondary"
        disabled={!hasPrevious}
        onClick={onPrevious}
        >
        ← Prev
        </Button>

        <Button
        variant="secondary"
        onClick={onMarkReview}
        className={
            isMarkedForReview
            ? "border-amber-500 text-amber-300"
            : ""
        }
        >
        {isMarkedForReview
            ? "Reviewed"
            : "Review"}
        </Button>

        <Button
        variant="secondary"
        disabled={!hasNext}
        onClick={onNext}
        >
        Next →
        </Button>

    </div>

    </div>

    </section>
  );
}