import { Loader2, CheckCircle2 } from "lucide-react";
import type { ExtractionProgress } from "../../services/extraction";

interface UploadProgressProps {
  progress: ExtractionProgress;
}

export default function UploadProgress({
  progress,
}: UploadProgressProps) {
  const progressValue = Math.min(
    100,
    Math.max(0, progress.percent)
  );

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-start gap-5">

        <div className="mt-1">

          {progress.completed ? (
            <CheckCircle2
              size={28}
              className="text-emerald-400"
            />
          ) : (
            <Loader2
              size={28}
              className="animate-spin text-blue-500"
            />
          )}

        </div>

        <div className="flex-1">

          <h2 className="text-xl font-semibold text-white">

            {progress.completed
              ? "Extraction Complete"
              : progress.stage === "starting"
              ? "Preparing Extraction"
              : progress.stage === "extracting"
              ? "Extracting Questions"
              : progress.stage === "saving"
              ? "Saving Question Bank"
              : "Processing"}

          </h2>

          <p className="mt-2 text-zinc-400">
            {progress.message}
          </p>

          <div className="mt-8">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm text-zinc-500">
                Progress
              </span>

              <span className="text-sm font-medium text-white">
                {progressValue}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{
                  width: `${progressValue}%`,
                }}
              />

            </div>

          </div>

          {!progress.completed && (
            <p className="mt-6 text-sm text-zinc-500">
              Please don't close this page while your PDF is
              being processed.
            </p>
          )}

        </div>

      </div>

    </section>
  );
}