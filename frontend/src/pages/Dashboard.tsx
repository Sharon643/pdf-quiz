import { useEffect, useState } from "react";
import {
  Upload,
  ClipboardList,
  Brain,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import ContinueCard from "../components/dashboard/ContinueCard";
import QuestionBankCard from "../components/dashboard/QuestionBankCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import StatCard from "../components/dashboard/StatCard";

import type { QuestionBank } from "../types/questionBank";
import { getQuestionBank } from "../services/questionBank";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {
  const navigate = useNavigate();

  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestionBank() {
      try {
        const data = await getQuestionBank();
        setQuestionBank(data);
      } catch (error) {
        console.error("Failed to load question bank:", error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestionBank();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-8 py-8">

        <DashboardHeader />

        {/* Welcome */}
        <section>
          <h2 className="text-4xl font-semibold text-white">
            Welcome back.
          </h2>

          <p className="mt-2 text-zinc-400">
            Continue your preparation and build momentum.
          </p>
        </section>

        {/* Statistics */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
              title="Questions"
              value={questionBank?.questionCount ?? 0}
            />

            <StatCard
              title="Exams Taken"
              value={8}
            />

            <StatCard
              title="Question Banks"
              value={questionBank?.hasQuestions ? 1 : 0}
            />

          </div>
        </section>

        {/* Continue + Question Bank */}
        <section>
          <div className="grid gap-6 lg:grid-cols-2">

            <ContinueCard
              title={questionBank?.fileName ?? "No Question Bank"}
              questionCount={questionBank?.questionCount ?? 0}
              progress={19}
              lastStudied={
                questionBank?.uploadedAt
                  ? new Date(questionBank.uploadedAt).toLocaleDateString()
                  : "N/A"
              }
              onResume={() => navigate("/exam-settings")}
            />

            <QuestionBankCard
              fileName={questionBank?.fileName ?? "No Question Bank"}
              questionCount={questionBank?.questionCount ?? 0}
              uploadedAt={
                questionBank?.uploadedAt
                  ? new Date(questionBank.uploadedAt).toLocaleDateString()
                  : "N/A"
              }
              onManage={() => navigate("/question-bank")}
              onUpload={() => navigate("/")}
            />

          </div>
        </section>

        {/* Get Started */}
        <section>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Get Started
            </h2>

            <p className="mt-2 text-zinc-400">
              Choose how you'd like to continue learning.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <QuickActionCard
              title="Upload PDF"
              description="Import questions into your question bank."
              icon={<Upload size={22} className="text-zinc-400" />}
              onClick={() => navigate("/")}
            />

            <QuickActionCard
              title="Start Exam"
              description="Simulate a real timed examination."
              icon={<ClipboardList size={22} className="text-zinc-400" />}
              onClick={() => navigate("/exam-settings")}
            />

            <QuickActionCard
              title="Practice"
              description="Practice with instant feedback."
              icon={<Brain size={22} className="text-zinc-400" />}
              onClick={() => navigate("/practice")}
            />

            <QuickActionCard
              title="Review"
              description="Review previous exams and incorrect answers."
              icon={<RotateCcw size={22} className="text-zinc-400" />}
              onClick={() => navigate("/review")}
            />

          </div>

        </section>

      </div>
    </main>
  );
}