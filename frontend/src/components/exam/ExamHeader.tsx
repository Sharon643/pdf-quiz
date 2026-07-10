import { CheckCircle2, Clock3, FileQuestion, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExamHeaderProps {
  current: number;
  total: number;
  answered: number;
}

export default function ExamHeader({
  current,
  total,
  answered,
}: ExamHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 mb-6 rounded-xl border border-zinc-800 bg-zinc-900/95 px-6 py-3 backdrop-blur">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-8">

          <div>

            <h1 className="text-lg font-bold text-white">
              QuizForge AI
            </h1>

          </div>

          <Stat
            icon={<FileQuestion size={15} />}
            value={`${current}/${total}`}
          />

          <Stat
            icon={<CheckCircle2 size={15} />}
            value={`${answered}`}
          />

          <Stat
            icon={<Clock3 size={15} />}
            value="--:--"
          />

        </div>

        {/* Right */}

        <button
          onClick={() => navigate("/dashboard")}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-zinc-700
            px-3
            py-2
            text-sm
            text-zinc-300
            transition
            hover:bg-zinc-800
          "
        >
          <LogOut size={16} />
          Exit
        </button>

      </div>

    </header>
  );
}

interface StatProps {
  icon: React.ReactNode;
  value: string;
}

function Stat({
  icon,
  value,
}: StatProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-zinc-950 px-3 py-2 text-zinc-300">

      {icon}

      <span className="font-medium">
        {value}
      </span>

    </div>
  );
}