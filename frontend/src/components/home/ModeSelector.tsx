import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

function ModeSelector() {

  const navigate = useNavigate();

  return (

    <div className="mt-8 space-y-4">

      <Button
        text="🏆 Exam Mode"
        onClick={() => navigate("/exam-settings")}
      />

      <Button
        text="📚 Practice Mode"
        onClick={() => {}}
      />

      <Button
        text="📖 Review Mode"
        onClick={() => {}}
      />

    </div>

  );

}

export default ModeSelector;