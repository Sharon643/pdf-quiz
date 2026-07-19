import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";


import Exam from "./pages/Exam";
import ExamSettings from "./pages/ExamSettings";
import Dashboard from "./pages/Dashboard";
import QuestionBank from "./pages/QuestionBank";
import Results from "./pages/Results";
import UploadPdf from "./pages/UploadPdf";
import History from "./pages/History";
import Review from "./pages/Review";
import Practice from "./pages/Practice"
import PracticeSettings from "./pages/PracticeSettings";
import PracticeResult from "./pages/PracticeResults";


function App() {
  return (
    <Routes>
      <Toaster richColors position="top-right" />
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

      <Route
          path="/practice"
          element={<Practice />}
      />

      <Route
        path="/practice/settings"
        element={<PracticeSettings />}
      />

      <Route
        path="/practice/:practiceId"
        element={<Practice />}
      />
      <Route
        path="/practice/result"
        element={<PracticeResult />}
    />
    </Routes>
    
  );
}

export default App;