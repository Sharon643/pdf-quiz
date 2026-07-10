interface Props {
  selectedQuestions: number;
  totalQuestions: number;
}

export default function ExamSummary({
  selectedQuestions,
}: Props) {
  const estimatedMinutes = selectedQuestions;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Exam Summary
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-sm text-zinc-500">
            Questions
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {selectedQuestions}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Estimated Time
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {estimatedMinutes} min
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Difficulty
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            Mixed
          </p>
        </div>

      </div>

    </section>
  );
}