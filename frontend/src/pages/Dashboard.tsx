import {
  // BookOpen,
  // ClipboardCheck,
  // Files,
  FolderOpen,
  Upload,
  ClipboardList,
  Brain,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import ContinueCard from "../components/dashboard/ContinueCard";
import StatCard from "../components/dashboard/StatCard";
import ActionCard from "../components/dashboard/ActionCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-8 py-8">

        {/* Header */}
        <DashboardHeader />

        {/* Welcome */}
        <section>
          <h2 className="text-4xl font-semibold text-white">
            Welcome back.
          </h2>

          <p className="mt-2 text-zinc-400">
            Prepare. Practice. Improve.
          </p>
        </section>

        {/* Statistics */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
              title="Questions"
              value={364}
            />

            <StatCard
              title="Exams Taken"
              value={8}
            />

            <StatCard
              title="Question Banks"
              value={1}
            />

          </div>
        </section>

        {/* Continue + Question Bank */}
        <section>
          <div className="grid gap-6 lg:grid-cols-2">

            <ContinueCard
              title="Medical MCQs.pdf"
              questionCount={364}
              progress={19}
              lastStudied="Yesterday"
              onResume={() => {}}
            />

            <ActionCard
              title="Question Bank"
              description="Manage your extracted questions."
              icon={<FolderOpen size={22} className="text-zinc-400" />}
              buttonText="Manage"
              onClick={() => navigate("/question-bank")}
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
              description="Review incorrect and flagged questions."
              icon={<RotateCcw size={22} className="text-zinc-400" />}
              onClick={() => navigate("/review")}
            />

          </div>

        </section>

      </div>
    </main>
  );
}