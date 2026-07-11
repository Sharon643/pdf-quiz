import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

export default function ResultActions() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-4">

      <Button
        variant="secondary"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </Button>

      <Button
        onClick={() => navigate("/exam-settings")}
      >
        Practice Again
      </Button>

    </div>
  );
}