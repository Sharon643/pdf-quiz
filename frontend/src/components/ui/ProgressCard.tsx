import Card from "./Card";
import type { ProgressResponse } from "../../types/progress";

type Props = {
  progress: ProgressResponse;
};

export default function ProgressCard({
  progress,
}: Props) {

  return (

    <Card>

      <h2 className="text-xl font-semibold">
        AI Extraction
      </h2>

      <p className="mt-2 text-zinc-400">
        {progress.message}
      </p>

      <div className="mt-6 h-3 w-full rounded-full bg-zinc-700">

        <div
          className="h-3 rounded-full bg-blue-500 transition-all duration-500"
          style={{
            width: `${progress.percent}%`,
          }}
        />

      </div>

      <p className="mt-3 font-semibold">

        {progress.percent}%

      </p>

    </Card>

  );

}