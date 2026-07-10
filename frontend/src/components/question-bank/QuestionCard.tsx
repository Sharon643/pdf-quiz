import type { QuestionSummary } from "../../services/questionBank";

interface QuestionCardProps {
  question: QuestionSummary;
}

export default function QuestionCard({
  question,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-3 flex items-center justify-between">

        <span className="text-sm text-zinc-500">
          Question #{question.number}
        </span>

        <span className="text-sm text-zinc-500">
          {question.subject ?? "General"}
        </span>

      </div>

      <p className="text-white">
        {question.question}
      </p>

    </div>
  );
}