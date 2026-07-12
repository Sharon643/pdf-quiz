import { RotateCcw, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

export default function ResultActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-center">

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