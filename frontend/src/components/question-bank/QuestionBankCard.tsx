import {
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react";

import type {
  QuestionBank,
} from "../../types/questionBank";

interface Props {
  bank: QuestionBank;
  onOpen: () => void;
}

export default function QuestionBankCard({
  bank,
  onOpen,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <FileText
              size={18}
              className="text-blue-400"
            />

            <h3 className="text-lg font-semibold text-white">
              {bank.fileName}
            </h3>

          </div>

          <p className="mt-4 text-sm text-zinc-400">
            {bank.questionCount} Questions
          </p>

          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">

            <Calendar size={14} />

            {new Date(
              bank.uploadedAt
            ).toLocaleDateString()}

          </p>

        </div>

        {bank.active && (

          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">

            <CheckCircle2 size={14} />

            Active

          </div>

        )}

      </div>

      <div className="mt-6 flex justify-end">

        <button
          onClick={onOpen}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white transition hover:bg-blue-500"
        >
          Open
        </button>

      </div>

    </div>
  );
}