interface StartExamModalProps {
  open: boolean;
  questionCount: number;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function StartExamModal({
  open,
  questionCount,
  onCancel,
  onConfirm,
  loading,
}: StartExamModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white">
          Start Exam?
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          You're about to begin an exam containing{" "}
          <span className="font-medium text-white">
            {questionCount} questions
          </span>
          .
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          Once started, your progress will be tracked until you submit the
          exam.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Starting..." : "Start Exam"}
          </button>
        </div>
      </div>
    </div>
  );
}