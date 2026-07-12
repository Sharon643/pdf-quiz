interface ExamModeSelectorProps {
  timed: boolean;
  duration: number;
  onTimedChange: (value: boolean) => void;
  onDurationChange: (value: number) => void;
}

const DURATIONS = [1, 15, 30, 45, 60, 90, 120, 180];

export default function ExamModeSelector({
  timed,
  duration,
  onTimedChange,
  onDurationChange,
}: ExamModeSelectorProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-lg font-semibold text-white">
        Exam Mode
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Choose between practice mode and a timed exam.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

  {/* Practice */}

  <label
    className={`
      cursor-pointer
      rounded-xl
      border
      p-5
      transition-all duration-200 ease-in-out
      ${
        !timed
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 hover:border-zinc-700"
      }
    `}
  >
    <div className="flex items-start gap-3">

      <input
        type="radio"
        checked={!timed}
        onChange={() => onTimedChange(false)}
        className="mt-1"
      />

      <div>
        <h3 className="font-semibold text-white">
          Practice Mode
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          No time limit.
        </p>
      </div>

    </div>
  </label>

  {/* Timed */}

  <label
    className={`
      cursor-pointer
      rounded-xl
      border
      p-5
      transition-all duration-200 ease-in-out
      ${
        timed
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 hover:border-zinc-700"
      }
    `}
  >
    <div className="flex items-start gap-3">

      <input
        type="radio"
        checked={timed}
        onChange={() => onTimedChange(true)}
        className="mt-1"
      />

      <div className="flex-1">

        <h3 className="font-semibold text-white">
          Timed Exam
        </h3>

        <p className="mt-1 mb-4 text-sm text-zinc-400">
          Automatically submits when time expires.
        </p>

        {timed && (
        <div
            className="
            mt-4
            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
            "
        >
            <select
            value={duration}
            onChange={(e) =>
                onDurationChange(Number(e.target.value))
            }
            className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-900
                px-3
                py-2
                text-white
            "
            >
            {DURATIONS.map((value) => (
                <option
                key={value}
                value={value}
                >
                {value} Minutes
                </option>
            ))}
            </select>
        </div>
        )}

        </div>

        </div>
    </label>

    </div>


    </section>
  );
}