interface ReviewControlsProps {
  hasPrevious: boolean;
  hasNext: boolean;

  onPrevious: () => void;
  onNext: () => void;

  onBack: () => void;
}

export default function ReviewControls({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onBack,
}: ReviewControlsProps) {
  return (
    <div className="flex items-center justify-between">

      <button
        onClick={onBack}
        className="rounded-xl bg-zinc-800 px-5 py-3 text-white transition hover:bg-zinc-700"
      >
        Back
      </button>

      <div className="flex gap-3">

        <button
          disabled={!hasPrevious}
          onClick={onPrevious}
          className="rounded-xl bg-zinc-800 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={!hasNext}
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}