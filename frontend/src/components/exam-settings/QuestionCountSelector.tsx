import { useState } from "react";

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

  const [customValue, setCustomValue] = useState("");

  const isPreset = options.includes(value);

  function handleCustomChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const input = event.target.value;

    setCustomValue(input);

    const count = Number(input);

    if (
      Number.isInteger(count) &&
      count >= 1 &&
      count <= totalQuestions
    ) {
      onChange(count);
    }
  }

  function handlePresetChange(count: number) {
    setCustomValue("");
    onChange(count);
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Question Count
      </h2>

      <div className="mt-6 space-y-3">
        {options.map((count, index) => (
          <button
            key={`${count}-${index}`}
            onClick={() =>
              handlePresetChange(count)
            }
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
                value === count &&
                customValue === ""
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
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
                  value === count &&
                  customValue === ""
                    ? "border-blue-500 bg-blue-500"
                    : "border-zinc-600"
                }
              `}
            />
          </button>
        ))}

        {/* Custom Question Count */}

        <div
          className={`
            rounded-lg
            border
            px-5
            py-4
            transition
            ${
              !isPreset && customValue
                ? "border-blue-500 bg-blue-500/10"
                : "border-zinc-800 bg-zinc-900"
            }
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white">
                Custom
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Enter between 1 and {totalQuestions}
              </p>
            </div>

            <input
              type="number"
              min={1}
              max={totalQuestions}
              value={customValue}
              onChange={handleCustomChange}
              placeholder="e.g. 40"
              className="
                w-28
                rounded-lg
                border
                border-zinc-700
                bg-zinc-950
                px-3
                py-2
                text-center
                text-white
                outline-none
                transition
                placeholder:text-zinc-600
                focus:border-blue-500
              "
            />
          </div>

          {customValue &&
            (Number(customValue) < 1 ||
              Number(customValue) >
                totalQuestions) && (
              <p className="mt-3 text-sm text-red-400">
                Enter a number between 1 and{" "}
                {totalQuestions}.
              </p>
            )}
        </div>
      </div>
    </section>
  );
}