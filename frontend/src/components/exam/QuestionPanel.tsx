import OptionCard from "./OptionCard";
import Button from "../ui/Button";

import type { ExamQuestion } from "../../types/exam";

interface QuestionPanelProps {
  question: ExamQuestion;
  currentQuestion: number;

  selectedOption: string | null;

  hasPrevious: boolean;
  hasNext: boolean;

  isMarkedForReview: boolean;

  practiceMode?: boolean;

  showFeedback?: boolean;

  correctAnswer?: string;

  explanation?: string;

  answerCorrect?: boolean;

  onSelectOption: (option: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onMarkReview: () => void;
}

export default function QuestionPanel({
  question,
  currentQuestion,
  selectedOption,
  hasPrevious,
  hasNext,
  isMarkedForReview,
  practiceMode = false,
  showFeedback = false,
  correctAnswer,
  explanation,
  answerCorrect,
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
          Question {currentQuestion}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {question.subject ?? "General"}
        </h2>
      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-6 py-5">

        <p className="mb-8 text-base leading-7 text-zinc-100">
          {question.question}
        </p>

        <div className="space-y-4">

          {Object.entries(question.options).map(([key, value]) => {

            const selected = selectedOption === key;

            const isCorrect =
              key === correctAnswer;

            return (
              <OptionCard
                key={key}
                optionKey={key}
                optionText={value}

                selected={selected}

                correct={
                  practiceMode &&
                  showFeedback &&
                  isCorrect
                }

                incorrect={
                  practiceMode &&
                  showFeedback &&
                  selected &&
                  !isCorrect
                }

                disabled={
                  practiceMode &&
                  showFeedback
                }

                onSelect={() => {
                  if (
                    practiceMode &&
                    showFeedback
                  ) {
                    return;
                  }

                  onSelectOption(key);
                }}
              />
            );

          })}

        </div>

        {practiceMode &&
          showFeedback && (

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6">

            <h3
              className={`text-xl font-semibold ${
                answerCorrect
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {answerCorrect
                ? " Correct!"
                : " Incorrect"}
            </h3>

            <p className="mt-5 text-zinc-300">
              Correct Answer

              <span className="ml-2 font-semibold text-emerald-400">
                {correctAnswer}
              </span>
            </p>

            {explanation && (
              <>

                <h4 className="mt-6 font-semibold text-white">
                  Explanation
                </h4>

                <p className="mt-2 leading-7 text-zinc-400">
                  {explanation}
                </p>

              </>
            )}

          </div>

        )}

      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-zinc-800
          bg-zinc-950/95
          px-6
          py-4
          backdrop-blur
        "
      >

        {practiceMode ? (

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
              disabled={!hasNext}
              onClick={onNext}
            >
              Next →
            </Button>

          </div>

        ) : (

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

        )}

      </div>

    </section>
  );
}