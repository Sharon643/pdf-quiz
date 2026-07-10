import { Eye, FileText, Hash } from "lucide-react";

import type { QuestionSummary } from "../../services/questionBank";

interface QuestionCardProps {
  question: QuestionSummary;
  onView: (question: QuestionSummary) => void;
}

export default function QuestionCard({
  question,
  onView,
}: QuestionCardProps) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        transition-all
        duration-200
        hover:border-zinc-700
        hover:bg-zinc-900/90
      "
    >
      <div className="p-6">

        {/* Metadata */}

        <div className="flex flex-wrap items-center gap-3">

          <span className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            <Hash size={12} />
            {question.number}
          </span>

          <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
            {question.subject ?? "General"}
          </span>

          <span className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
            <FileText size={12} />
            Page {question.page}
          </span>

        </div>

        {/* Question */}

        <p className="mt-5 line-clamp-3 text-base leading-7 text-zinc-100">
          {question.question}
        </p>

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-zinc-800
          px-6
          py-4
        "
      >
        <span className="text-sm text-zinc-500">
          Click to preview the complete question
        </span>

        <button
          onClick={() => onView(question)}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-zinc-700
            px-4
            py-2
            text-sm
            text-zinc-300
            transition-all
            hover:border-zinc-600
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <Eye size={16} />
          View Details
        </button>

      </div>

    </div>
  );
}