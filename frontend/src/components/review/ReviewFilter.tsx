interface ReviewFilterProps {
  selected:
    | "All"
    | "Correct"
    | "Wrong"
    | "Skipped"
    | "Marked";

  onChange: (
    value:
      | "All"
      | "Correct"
      | "Wrong"
      | "Skipped"
      | "Marked"
  ) => void;
}

const filters = [
  "All",
  "Correct",
  "Wrong",
  "Skipped",
  "Marked",
] as const;

export default function ReviewFilter({
  selected,
  onChange,
}: ReviewFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => {

        const active =
          selected === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition ${
              active
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {filter}
          </button>
        );

      })}

    </div>
  );
}