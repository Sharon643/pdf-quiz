import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";

import { generateExam } from "../services/exam";

export default function ExamSettings() {
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(75);
  const [duration, setDuration] = useState(60);
  const [shuffle, setShuffle] = useState(true);

  const [loading, setLoading] = useState(false);

  async function handleStartExam() {
    try {
      setLoading(true);

      const response = await generateExam(questionCount);

      navigate(`/exam/${response.examId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate exam.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Exam Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure your exam before starting.
        </p>
      </div>

      <Card>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium text-slate-300">
              Number of Questions
            </label>

            <Select
              value={questionCount}
              onChange={(e) =>
                setQuestionCount(Number(e.target.value))
              }
            >
              <option value={10}>10 Questions</option>
              <option value={25}>25 Questions</option>
              <option value={50}>50 Questions</option>
              <option value={75}>75 Questions</option>
              <option value={100}>100 Questions</option>
            </Select>

          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-300">
              Duration
            </label>

            <Select
              value={duration}
              onChange={(e) =>
                setDuration(Number(e.target.value))
              }
            >
              <option value={30}>30 Minutes</option>
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
              <option value={0}>Unlimited</option>
            </Select>

          </div>

          <div className="flex items-center gap-3">

            <input
              id="shuffle"
              type="checkbox"
              checked={shuffle}
              onChange={(e) =>
                setShuffle(e.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />

            <label
              htmlFor="shuffle"
              className="text-slate-300"
            >
              Shuffle Questions
            </label>

          </div>

          <Button
            loading={loading}
            onClick={handleStartExam}
            fullWidth
          >
            Start Exam
          </Button>

        </div>

      </Card>

    </main>
  );
}