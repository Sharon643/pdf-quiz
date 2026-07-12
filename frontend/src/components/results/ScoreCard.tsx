import { Trophy } from "lucide-react";

interface ScoreCardProps {
  score: number;
  correct: number;
  total: number;
}

export default function ScoreCard({
  score,
  correct,
  total,
}: ScoreCardProps) {
  const performance =
    score >= 90
      ? "Outstanding"
      : score >= 75
      ? "Excellent"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Fair"
      : "Needs Improvement";

  const message =
    score >= 90
      ? "Exceptional performance. You demonstrated an excellent understanding of the material."
      : score >= 75
      ? "Excellent work. You answered most questions correctly with strong overall accuracy."
      : score >= 60
      ? "Good job. Reviewing a few incorrect answers will help improve your score."
      : "Keep practicing. Reviewing your mistakes will strengthen your understanding.";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">

        <Trophy
          size={28}
          className="text-zinc-300"
        />

      </div>

      <h1 className="mt-6 text-3xl font-bold text-white">
        Exam Completed
      </h1>

      <div className="mt-10">

        <p className="text-7xl font-bold tracking-tight text-white">
          {score.toFixed(0)}%
        </p>

        <p className="mt-3 text-xl font-semibold text-zinc-200">
          {performance}
        </p>

        <p className="mt-2 text-zinc-400">
          {correct} / {total} Correct
        </p>

      </div>

      <div className="mx-auto mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="mx-auto mt-8 max-w-xl leading-7 text-zinc-400">
        {message}
      </p>

    </section>
  );
}