import type { ExamResult } from "../../types/result";

interface Props {
  result: ExamResult;
}

export default function PerformanceGrid({
  result,
}: Props) {
  return (
    <section className="grid gap-5 md:grid-cols-4">

      <Card
        title="Correct"
        value={result.correctAnswers}
        color="text-emerald-400"
      />

      <Card
        title="Wrong"
        value={result.wrongAnswers}
        color="text-red-400"
      />

      <Card
        title="Unanswered"
        value={result.unanswered}
        color="text-amber-400"
      />

        <Card
        title="Accuracy"
        value={`${result.percentage.toFixed(1)}%`}
        color="text-white"
        />

    </section>
  );
}

interface CardProps {
  title: string;
  value: string | number;
  color: string;
}

function Card({
  title,
  value,
  color,
}: CardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <p className="text-sm uppercase text-zinc-500">
        {title}
      </p>

      <p className={`mt-4 text-3xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}