import Button from "../ui/Button";

interface SubmitExamModalProps {
  open: boolean;
  answered: number;
  review: number;
  answeredReview: number;
  total: number;
  loading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function SubmitExamModal({
  open,
  answered,
  review,
  answeredReview,
  total,
  loading,
  onCancel,
  onSubmit,
}: SubmitExamModalProps) {
  if (!open) return null;

  const unanswered = total - answered;

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
          Submit Exam?
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Review your progress before submitting.
        </p>

        <div className="mt-6 space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-5">

          <Row
            label="Answered"
            value={answered}
            color="text-emerald-400"
          />

          <Row
            label="Needs Review"
            value={answeredReview}
            color="text-violet-400"
          />

          <Row
            label="Review Only"
            value={review}
            color="text-amber-400"
          />

          <Row
            label="Unanswered"
            value={unanswered}
            color="text-red-400"
          />

        </div>

        {unanswered > 0 && (
          <p className="mt-5 text-sm text-amber-400">
            You still have unanswered questions.
          </p>
        )}

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Continue Exam
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onSubmit}
          >
            Submit
          </Button>

        </div>

      </div>

    </div>
  );
}

interface RowProps {
  label: string;
  value: number;
  color: string;
}

function Row({
  label,
  value,
  color,
}: RowProps) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-zinc-400">
        {label}
      </span>

      <span className={`font-semibold ${color}`}>
        {value}
      </span>

    </div>
  );
}