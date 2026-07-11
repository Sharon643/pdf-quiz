import Button from "../ui/Button";

interface ExitExamModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ExitExamModal({
  open,
  onCancel,
  onConfirm,
}: ExitExamModalProps) {
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
          Exit Exam?
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Your answers have been saved, but your exam will remain incomplete.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          You can return later and continue from where you left off.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Continue Exam
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}