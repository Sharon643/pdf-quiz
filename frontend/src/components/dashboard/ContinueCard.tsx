import { ArrowRight, Clock3, FileText } from "lucide-react";

import Button from "../ui/Button";

interface ContinueCardProps {
  title: string;
  questionCount: number;
  progress: number;
  lastStudied: string;
  onResume: () => void;
}

export default function ContinueCard({
  title,
  questionCount,
  progress,
  lastStudied,
  onResume,
}: ContinueCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Continue Studying
          </h2>

          <p className="mt-2 text-zinc-400">
            Pick up where you left off.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Clock3 size={16} />
          {lastStudied}
        </div>

      </div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-10 w-10 items-center justify-center">
            <FileText size={20} className="text-zinc-400" />
          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {title}
            </h3>

            <p className="text-sm text-zinc-400">
              {questionCount} Questions
            </p>

          </div>

        </div>

        <Button onClick={onResume}>
          Resume
          <ArrowRight size={18} />
        </Button>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm text-zinc-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

    </div>
  );
}