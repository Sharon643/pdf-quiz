import { FolderOpen , ArrowRight} from "lucide-react";

import Button from "../ui/Button";

interface QuestionBankCardProps {
  fileName: string;
  questionCount: number;
  uploadedAt: string;
  onManage: () => void;
  onUpload: () => void;
}

export default function QuestionBankCard({
  fileName,
  questionCount,
  uploadedAt,
  onManage,
}: QuestionBankCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <FolderOpen
          size={22}
          className="text-zinc-400"
        />

        <div>
          <h2 className="text-xl font-semibold text-white">
            Question Bank
          </h2>

        </div>

      </div>

      <div className="mb-8">

        <h3 className="text-lg font-medium text-white">
          {fileName}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {questionCount} Questions
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Uploaded {uploadedAt}
        </p>

      </div>

      <div className="flex gap-3">


        <Button
          variant = "secondary"
          onClick={onManage}
        >
          Manage Question Bank
        <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-1"
          />
        </Button>

      </div>

    </div>
  );
}