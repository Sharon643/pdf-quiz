import type { ReviewSummary as Summary } from "../../types/review";

interface ReviewSummaryProps {
  summary: Summary;
}

export default function ReviewSummary({
  summary,
}: ReviewSummaryProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {summary.percentage}%
          </h2>

          <p className="mt-1 text-zinc-400">
            {summary.questionBank}
          </p>

        </div>

        <span
          className={`rounded-lg px-3 py-1 text-sm font-medium ${
            summary.timed
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {summary.mode}
        </span>

      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">

        <div className="rounded-xl bg-zinc-800 p-4 text-center">
          <p className="text-2xl font-bold text-green-400">
            {summary.correct}
          </p>
          <p className="text-sm text-zinc-400">
            Correct
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4 text-center">
          <p className="text-2xl font-bold text-red-400">
            {summary.wrong}
          </p>
          <p className="text-sm text-zinc-400">
            Wrong
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">
            {summary.unanswered}
          </p>
          <p className="text-sm text-zinc-400">
            Skipped
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {summary.questionCount}
          </p>
          <p className="text-sm text-zinc-400">
            Questions
          </p>
        </div>

      </div>

    </div>
  );
}