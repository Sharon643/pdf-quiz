import { Routes, Route } from "react-router-dom";

import Exam from "./pages/Exam";
import ExamSettings from "./pages/ExamSettings";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
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