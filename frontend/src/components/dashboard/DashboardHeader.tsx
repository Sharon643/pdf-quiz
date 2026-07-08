import { LayoutDashboard, Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900">
          <LayoutDashboard size={20} className="text-zinc-300" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            QuizForge AI
          </h1>

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