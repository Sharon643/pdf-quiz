import { useRef, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

function UploadCard() {
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  function chooseFile() {
    inputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  }

  return (
    <Card>
      <h2 className="text-2xl font-semibold">
        Upload Question PDF
      </h2>

      <p className="mt-2 text-zinc-400">
        Select a PDF containing multiple-choice questions.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

        <div className="mt-6 space-y-3">

        <Button
            text="Choose PDF"
            onClick={chooseFile}
            variant="secondary"
        />

        <Button
            text="Extract Questions"
            onClick={() => {}}
            disabled={!file}
        />

        </div>

      {file && (
        <div className="mt-4 rounded-lg border border-zinc-700 p-3">
          <p className="font-medium">{file.name}</p>

          <p className="text-sm text-zinc-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </Card>
  );
}

export default UploadCard;