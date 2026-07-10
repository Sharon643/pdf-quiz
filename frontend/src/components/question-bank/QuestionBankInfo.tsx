import type { QuestionBank } from "../../types/questionBank";

interface QuestionBankInfoProps {
  metadata: QuestionBank;
}

export default function QuestionBankInfo({
  metadata,
}: QuestionBankInfoProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        {metadata.fileName}
      </h2>

      <div className="mt-6 flex flex-wrap gap-8 text-sm text-zinc-400">

        <span>{metadata.questionCount} Questions</span>

        <span>{metadata.subjects} Subjects</span>

        <span>
          Uploaded{" "}
          {metadata.uploadedAt
            ? new Date(metadata.uploadedAt).toLocaleDateString()
            : "N/A"}
        </span>

      </div>

    </section>
  );
}