import Button from "../ui/Button";

interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function StartExamButton({
  loading,
  onClick,
}: Props) {
  return (
    <div className="flex justify-end">

      <Button
        onClick={onClick}
        disabled={loading}
      >
        {loading
          ? "Generating Exam..."
          : "Start Exam"}
      </Button>

    </div>
  );
}