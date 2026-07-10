interface Props {
  totalQuestions: number;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionCountSelector({
  totalQuestions,
  value,
  onChange,
}: Props) {
  const options = [
    25,
    50,
    75,
    totalQuestions,
  ];

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Question Count
      </h2>

      <div className="mt-6 space-y-3">

        {options.map((count, index) => (
          <button
            key={`${count}-${index}`}
            onClick={() => onChange(count)}
            className={`
              flex
              w-full
              items-center
              justify-between
              rounded-lg
              border
              px-5
              py-4
              transition

              ${
                value === count
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }
            `}
          >
            <span className="text-white">
              {index === options.length - 1
                ? `All Questions (${totalQuestions})`
                : `${count} Questions`}
            </span>

            <div
              className={`
                h-4
                w-4
                rounded-full
                border

                ${
                  value === count
                    ? "border-blue-500 bg-blue-500"
                    : "border-zinc-600"
                }
              `}
            />
          </button>
        ))}

      </div>

    </section>
  );
}