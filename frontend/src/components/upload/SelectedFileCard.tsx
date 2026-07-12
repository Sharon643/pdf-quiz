import { FileText, Trash2 } from "lucide-react";
import Button from "../ui/Button";

interface SelectedFileCardProps {
  file: File;
  uploading: boolean;
  onRemove: () => void;
  onUpload: () => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function SelectedFileCard({
  file,
  uploading,
  onRemove,
  onUpload,
}: SelectedFileCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800">

            <FileText
              size={28}
              className="text-zinc-300"
            />

          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">
              Selected File
            </h3>

            <p className="mt-2 break-all text-zinc-300">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {formatFileSize(file.size)}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 flex justify-between">

        <Button
          variant="secondary"
          onClick={onRemove}
          disabled={uploading}
        >
          <Trash2
            size={16}
            className="mr-2"
          />
          Remove
        </Button>

        <Button
          loading={uploading}
          onClick={onUpload}
        >
          Upload PDF
        </Button>

      </div>

    </section>
  );
}