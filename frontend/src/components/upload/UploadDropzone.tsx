import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
}

export default function UploadDropzone({
  onFileSelected,
}: UploadDropzoneProps) {
  function handleFile(file: File | undefined) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      return;
    }

    onFileSelected(file);
  }

  return (
    <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            e.preventDefault();

            handleFile(e.dataTransfer.files?.[0]);
        }}
      className="
        flex
        min-h-[320px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-zinc-700
        bg-zinc-900
        px-10
        transition-all
        duration-200
        hover:border-blue-500
        hover:bg-zinc-900/80
      "
    >
      <input
        hidden
        type="file"
        accept=".pdf"
        onChange={(e) =>
          handleFile(e.target.files?.[0])
        }
      />

      <UploadCloud
        size={70}
        className="text-zinc-500"
      />

      <h2 className="mt-8 text-2xl font-semibold text-white">
        Drag & Drop your PDF
      </h2>

      <p className="mt-3 text-zinc-400">
        or click anywhere to browse
      </p>

      <div className="mt-10 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white">
        Choose PDF
      </div>

      <p className="mt-8 text-sm text-zinc-500">
        Supported format: PDF
      </p>

    </label>
  );
}