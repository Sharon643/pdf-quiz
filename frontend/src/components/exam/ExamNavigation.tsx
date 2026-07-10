import Button from "../ui/Button";

interface ExamNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onMarkReview: () => void;
}

export default function ExamNavigation({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onMarkReview,
}: ExamNavigationProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-center justify-between">

        <Button
          variant="secondary"
          disabled={!hasPrevious}
          onClick={onPrevious}
        >
          Previous
        </Button>

        <Button
          variant="secondary"
          onClick={onMarkReview}
        >
          Mark for Review
        </Button>

        <Button
          disabled={!hasNext}
          onClick={onNext}
        >
          Save & Next
        </Button>

      </div>

    </div>
  );
}