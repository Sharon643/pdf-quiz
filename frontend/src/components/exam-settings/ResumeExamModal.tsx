interface ResumeExamModalProps {
  open: boolean;
  onResume: () => void;
  onStartNew: () => void;
  onCancel: () => void;
}

export default function ResumeExamModal({
  open,
  onResume,
  onStartNew,
  onCancel,
}: ResumeExamModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-7 shadow-2xl">

        <h2 className="text-2xl font-semibold text-white">
          Unfinished Exam
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          You already have an exam in progress.
          <br />
          Would you like to continue it or discard it and start a new exam?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onResume}
            className="rounded-lg border border-blue-500 px-5 py-2.5 text-blue-400 transition hover:bg-blue-500/10"
          >
            Resume Exam
          </button>

          <button
            onClick={onStartNew}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-500"
          >
            Start New
          </button>

        </div>

      </div>

    </div>
  );
}