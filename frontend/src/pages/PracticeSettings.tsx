import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { startPractice } from "../services/practiceService";

export default function PracticeSettings() {
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleStartPractice() {
    try {
      setLoading(true);
      setError("");

      const session = await startPractice(questionCount);

      navigate(`/practice/${session.practiceId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to start practice session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-3xl flex-col px-8 py-12">

        <h1 className="text-4xl font-bold text-white">
          Practice Mode
        </h1>

        <p className="mt-3 text-zinc-400">
          Practice questions with instant feedback and explanations.
        </p>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <div>
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Number of Questions
            </label>

            <select
              value={questionCount}
              onChange={(e) =>
                setQuestionCount(Number(e.target.value))
              }
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            >
              <option value={10}>10 Questions</option>
              <option value={25}>25 Questions</option>
              <option value={50}>50 Questions</option>
              <option value={75}>75 Questions</option>
              <option value={100}>100 Questions</option>
            </select>
          </div>

          {error && (
            <p className="mt-5 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            onClick={handleStartPractice}
            disabled={loading}
            className="
              mt-8
              w-full
              rounded-xl
              bg-blue-600
              py-3
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Starting..." : "Start Practice"}
          </button>

        </section>

      </div>
    </main>
  );
}