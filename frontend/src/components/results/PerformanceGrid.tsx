import type { ExamResult } from "../../types/result";

interface Props {
  result: ExamResult;
}

export default function PerformanceGrid({
  result,
}: Props) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      <Card
        title="Correct"
        value={result.correctAnswers}
        dot="bg-emerald-400"
      />

      <Card
        title="Incorrect"
        value={result.wrongAnswers}
        dot="bg-red-400"
      />

      <Card
        title="Unanswered"
        value={result.unanswered}
        dot="bg-amber-400"
      />

      <Card
        title="Accuracy"
        value={`${result.percentage.toFixed(1)}%`}
        dot="bg-blue-400"
      />

    </section>
  );
}

interface CardProps {
  title: string;
  value: string | number;
  dot: string;
}

function Card({
  title,
  value,
  dot,
}: CardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${dot}`}
        />

        <p className="text-sm uppercase tracking-wide text-zinc-500">
          {title}
        </p>

      </div>

      <p className="mt-5 text-2xl font-semibold text-white">
        {value}
      </p>

    </div>
  );
}