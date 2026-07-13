import {
  RotateCcw,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

interface ResultActionsProps {
  examId: string;
}

export default function ResultActions({
  examId,
}: ResultActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">

      <Button
        variant="secondary"
        onClick={() => navigate("/dashboard")}
      >
        <LayoutDashboard
          size={18}
          className="mr-2"
        />
        Dashboard
      </Button>

      <Button
        variant="secondary"
        onClick={() => navigate(`/review/${examId}`)}
      >
        <BookOpen
          size={18}
          className="mr-2"
        />
        Review Answers
      </Button>

      <Button
        onClick={() => navigate("/exam-settings")}
      >
        <RotateCcw
          size={18}
          className="mr-2"
        />
        Practice Again
      </Button>

    </div>
  );
}