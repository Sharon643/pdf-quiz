import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

export default function QuestionBankHeader() {
  const navigate = useNavigate();

  return (
    <header className="mb-10">
      <Button
        variant="secondary"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={16} />
        Dashboard
      </Button>

      <h1 className="mt-6 text-4xl font-semibold text-white">
        Question Banks
      </h1>


    </header>
  );
}