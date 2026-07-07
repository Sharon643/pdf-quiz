import { LayoutDashboard, Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600">
          <LayoutDashboard size={22} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            QuizForge AI
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Prepare. Practice. Improve.
          </p>
        </div>
      </div>

      <button
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          border
          border-zinc-800
          bg-zinc-900
          transition-colors
          hover:bg-zinc-800
        "
      >
        <Settings size={18} />
      </button>
    </header>
  );
}