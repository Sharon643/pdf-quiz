import { Routes, Route } from "react-router-dom";

import Exam from "./pages/Exam";
import ExamSettings from "./pages/ExamSettings";
import Dashboard from "./pages/Dashboard";
import QuestionBank from "./pages/QuestionBank";
import Results from "./pages/Results";
import UploadPdf from "./pages/UploadPdf";
import History from "./pages/History";
import Review from "./pages/Review";


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="dashboard"
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
      <Route
        path="/question-bank"
        element={<QuestionBank />}
      />
      <Route
          path="/results"
          element={<Results />}
      />
      <Route
          path="/upload"
          element={<UploadPdf />}
      />

      <Route
          path="/history"
          element={<History />}
      />

      <Route
          path="/review/:examId"
          element={<Review />}
      />
    </Routes>
    
  );
}

export default App;