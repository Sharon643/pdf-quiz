import { Navigate, useLocation } from "react-router-dom";

import type { ExamResult } from "../types/result";

import ScoreCard from "../components/results/ScoreCard";
import PerformanceGrid from "../components/results/PerformanceGrid";
import ResultActions from "../components/results/ResultActions";

export default function Results() {
  const location = useLocation();

  const result = location.state as ExamResult | undefined;

  if (!result) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen bg-zinc-950">

      <div className="mx-auto max-w-5xl px-8 py-12">

        <ScoreCard
          score={result.percentage}
          correct={result.correctAnswers}
          total={result.totalQuestions}
        />

        <div className="mt-8">

          <PerformanceGrid result={result} />

        </div>

        <div className="mt-8">

          <ResultActions
              examId={result.examId}
          />

        </div>

      </div>

    </main>
  );
}