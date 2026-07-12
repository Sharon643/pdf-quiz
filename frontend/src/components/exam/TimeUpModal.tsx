import Button from "../ui/Button";

interface TimeUpModalProps {
  open: boolean;
  loading: boolean;
  onSubmit: () => void;
}

export default function TimeUpModal({
  open,
  loading,
  onSubmit,
}: TimeUpModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="text-2xl font-semibold text-white">
          Time's Up
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Your exam duration has ended.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Your answers have been saved. Submit your exam to view your results.
        </p>

        <div className="mt-8 flex justify-center">

          <Button
            loading={loading}
            onClick={onSubmit}
          >
            Submit Exam
          </Button>

        </div>

      </div>

    </div>
  );
}