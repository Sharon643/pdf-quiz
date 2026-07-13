interface HistoryFilterProps {
  search: string;
  selectedMode: "All" | "Timed" | "Practice";

  onSearchChange: (value: string) => void;
  onModeChange: (mode: "All" | "Timed" | "Practice") => void;
}

const modes: ("All" | "Timed" | "Practice")[] = [
  "All",
  "Timed",
  "Practice",
];

export default function HistoryFilter({
  search,
  selectedMode,
  onSearchChange,
  onModeChange,
}: HistoryFilterProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search by question bank..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 lg:max-w-md"
        />

        <div className="flex flex-wrap gap-3">

          {modes.map((mode) => {

            const active =
              selectedMode === mode;

            return (
              <button
                key={mode}
                onClick={() => onModeChange(mode)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {mode}
              </button>
            );

          })}

        </div>

      </div>

    </div>
  );
}