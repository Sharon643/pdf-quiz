import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { QuestionSummary } from "../../services/questionBank";

interface QuestionDetailsModalProps {
  question: QuestionSummary | null;
  open: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose: () => void;
}

export default function QuestionDetailsModal({
  question,
  open,
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext,
  onClose,
}: QuestionDetailsModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!open) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case "ArrowRight":
          if (hasNext && onNext) {
            onNext();
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, hasPrevious, hasNext, onPrevious, onNext, onClose]);

  if (!open || !question) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
          <div>
            <span className="text-sm text-zinc-500">
              Question #{question.number}
            </span>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {question.subject ?? "General"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-8 p-8">
          <p className="text-[17px] leading-7 text-zinc-100">
            {question.question}
          </p>

          <div className="space-y-4">
            {Object.entries(question.options).map(([key, value]) => (
              <div
                key={key}
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-5
                  transition-colors
                  hover:border-zinc-700
                "
              >
                <span className="font-semibold text-zinc-300">
                  {key}.
                </span>

                <span className="ml-3 text-zinc-200">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-zinc-800 px-8 py-5">
          <button
            disabled={!hasPrevious}
            onClick={onPrevious}
            className="
              flex items-center gap-2 rounded-lg border border-zinc-700
              px-4 py-2 text-zinc-300 transition
              hover:bg-zinc-800
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            disabled={!hasNext}
            onClick={onNext}
            className="
              flex items-center gap-2 rounded-lg border border-zinc-700
              px-4 py-2 text-zinc-300 transition
              hover:bg-zinc-800
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}