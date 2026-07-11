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
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">

        <Trophy
          size={30}
          className="text-emerald-400"
        />

      </div>

      <h1 className="mt-6 text-3xl font-bold text-white">
        Exam Completed
      </h1>

      <p className="mt-3 text-zinc-400">
        Here's how you performed.
      </p>

      <div className="mt-10">

        <p className="text-7xl font-bold text-white">
          {score.toFixed(0)}%
        </p>

        <p className="mt-3 text-lg text-zinc-400">
          {correct} / {total} Correct
        </p>

      </div>

    </section>
  );
}