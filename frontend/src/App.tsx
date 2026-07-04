import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ExamSettings from "./pages/ExamSettings";
import Exam from "./pages/Exam";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/exam-settings" element={<ExamSettings />} />

      <Route path="/exam" element={<Exam />} />

      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;