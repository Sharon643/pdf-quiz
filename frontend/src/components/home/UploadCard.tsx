import { useRef } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

type UploadCardProps = {
  file: File | null;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onExtract: () => void;
};

function UploadCard({
  file,
  loading,
  onFileChange,
  onExtract,
}: UploadCardProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  function chooseFile() {
    inputRef.current?.click();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    if (e.target.files?.length) {
      onFileChange(e.target.files[0]);
    }

  }

  return (

    <Card>

      <h2 className="text-2xl font-semibold">
        Upload Question PDF
      </h2>

      <p className="mt-2 text-zinc-400">
        Upload a PDF containing MCQs.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
      />

      <div className="mt-6 space-y-3">

        <Button
          text="Choose PDF"
          variant="secondary"
          onClick={chooseFile}
        />

        <Button
          text="Extract Questions"
          loading={loading}
          disabled={!file}
          onClick={onExtract}
        />

      </div>

      {file && (

        <div className="mt-5 rounded-lg border border-zinc-700 p-4">

          <p className="font-semibold">
            {file.name}
          </p>

          <p className="text-sm text-zinc-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>

      )}

    </Card>

  );

}

export default UploadCard;