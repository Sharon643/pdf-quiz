import { ArrowLeft } from "lucide-react";

interface ReviewHeaderProps {
  onBack: () => void;
}

export default function ReviewHeader({
  onBack,
}: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Exam Review
        </h1>

        <p className="mt-2 text-zinc-400">
          Review your answers and compare them with the correct ones.
        </p>

      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 text-white transition hover:bg-zinc-700"
      >
        <ArrowLeft size={18} />

        Back
      </button>

    </div>
  );
}