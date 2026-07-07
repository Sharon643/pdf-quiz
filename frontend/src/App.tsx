import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Exam from "./pages/Exam";
import ExamSettings from "./pages/ExamSettings";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/exam-settings"
        element={<ExamSettings />}
      />

      <Route
        path="/exam/:examId"
        element={<Exam />}
      />
    </Routes>
  );
}

export default App;