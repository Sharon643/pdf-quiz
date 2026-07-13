import { Clock3, BookOpen, Trophy, ArrowRight } from "lucide-react";

import type { HistoryItem } from "../../types/history";

interface HistoryCardProps {
  exam: HistoryItem;
  onReview: (examId: string) => void;
}

export default function HistoryCard({
  exam,
  onReview,
}: HistoryCardProps) {
  const completedDate = new Date(
    exam.completedAt
  ).toLocaleString();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                exam.timed
                  ? "bg-emerald-500"
                  : "bg-blue-500"
              }`}
            />

            <p className="text-lg font-semibold text-white">
              {exam.mode} Exam
            </p>

          </div>

          <p className="mt-1 text-sm text-zinc-400">
            {exam.questionBank}
          </p>

        </div>

        <div className="text-right">

          <p className="text-3xl font-bold text-white">
            {exam.percentage}%
          </p>

          <p className="text-xs text-zinc-500">
            Score
          </p>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-zinc-800/50 p-4">

          <BookOpen
            className="mb-2 text-zinc-400"
            size={18}
          />

          <p className="text-xl font-semibold text-white">
            {exam.questionCount}
          </p>

          <p className="text-xs text-zinc-500">
            Questions
          </p>

        </div>

        <div className="rounded-xl bg-zinc-800/50 p-4">

          <Trophy
            className="mb-2 text-zinc-400"
            size={18}
          />

          <p className="text-xl font-semibold text-white">
            {exam.correct}
          </p>

          <p className="text-xs text-zinc-500">
            Correct
          </p>

        </div>

        <div className="rounded-xl bg-zinc-800/50 p-4">

          <Clock3
            className="mb-2 text-zinc-400"
            size={18}
          />

          <p className="text-sm font-medium text-white">
            {completedDate}
          </p>

          <p className="text-xs text-zinc-500">
            Completed
          </p>

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">

        <div className="flex gap-5 text-sm">

          <span className="text-emerald-400">
            ✔ {exam.correct}
          </span>

          <span className="text-red-400">
            ✖ {exam.wrong}
          </span>

          <span className="text-zinc-400">
            ○ {exam.unanswered}
          </span>

        </div>

        <button
          onClick={() => onReview(exam.examId)}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Review

          <ArrowRight size={16} />

        </button>

      </div>

    </div>
  );
}