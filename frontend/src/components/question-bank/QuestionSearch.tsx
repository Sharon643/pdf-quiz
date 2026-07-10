import { Search } from "lucide-react";

interface QuestionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionSearch({
  value,
  onChange,
}: QuestionSearchProps) {
  return (
    <div className="relative my-8">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions..."
        className="
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          py-3
          pl-12
          pr-4
          text-white
          outline-none
          focus:border-zinc-600
        "
      />

    </div>
  );
}