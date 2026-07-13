import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

interface HistoryHeaderProps {
  totalExams: number;
  averageScore: number;
  bestScore: number;
}

export default function HistoryHeader({
  totalExams,
  averageScore,
  bestScore,
}: HistoryHeaderProps) {

  const navigate = useNavigate();
  return (

    
    <div className="space-y-8">

        <Button
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft size={16} />
                Dashboard
              </Button>

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Exam History
        </h1>

        <p className="mt-2 text-zinc-400">
          Review your completed exams, track your performance,
          and revisit previously attempted questions.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Completed Exams
          </p>

          <p className="mt-3 text-4xl font-bold text-white">
            {totalExams}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Average Score
          </p>

          <p className="mt-3 text-4xl font-bold text-white">
            {averageScore}%
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Best Score
          </p>

          <p className="mt-3 text-4xl font-bold text-white">
            {bestScore}%
          </p>

        </div>

      </div>

    </div>
  );
}