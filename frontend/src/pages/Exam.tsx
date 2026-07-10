import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import type { ExamSession } from "../types/exam";

import { getExam } from "../services/examService";

import ExamHeader from "../components/exam/ExamHeader";
import QuestionPanel from "../components/exam/QuestionPanel";
import QuestionNavigator from "../components/exam/QuestionNavigator";
import SubmitExamModal from "../components/exam/SubmitExamModal";
import { submitExam } from "../services/examService";

export default function Exam() {
  const { examId } = useParams();

  const [exam, setExam] = useState<ExamSession | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string | null>>({});

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [reviewQuestions] = useState<Set<number>>(new Set());

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExam() {
      if (!examId) {
        setError("Invalid exam.");
        setLoading(false);
        return;
      }

      try {
        const session = await getExam(examId);

        setExam(session);
        setAnswers(session.answers ?? {});
      } catch (err) {
        console.error(err);
        setError("Failed to load exam.");
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, [examId]);

  const currentQuestion = useMemo(() => {
    if (!exam) return null;

    return exam.questions[currentQuestionIndex];
  }, [exam, currentQuestionIndex]);

  const answeredQuestions = useMemo(() => {
    return new Set(
      Object.keys(answers)
        .filter((id) => answers[id])
        .map(Number)
    );
  }, [answers]);

  function handleSelectOption(option: string) {
    if (!currentQuestion) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: option,
    }));
  }

  function handlePrevious() {
    setCurrentQuestionIndex((index) =>
      Math.max(index - 1, 0)
    );
  }

  function handleNext() {
    if (!exam) return;

    setCurrentQuestionIndex((index) =>
      Math.min(index + 1, exam.questions.length - 1)
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">Loading Exam...</p>
      </main>
    );
  }

  if (error || !exam || !currentQuestion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-red-400">
          {error || "Exam not found"}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">

      <div className="mx-auto max-w-[1800px] px-8 py-8">

        <ExamHeader
          current={currentQuestionIndex + 1}
          total={exam.questionCount}
          answered={answeredQuestions.size}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* LEFT */}

          <section className="min-h-0">

            <QuestionPanel
              question={currentQuestion}
              selectedOption={
                answers[currentQuestion.id] ?? null
              }
              hasPrevious={currentQuestionIndex > 0}
              hasNext={
                currentQuestionIndex <
                exam.questionCount - 1
              }
              onSelectOption={handleSelectOption}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onMarkReview={() => {}}
            />

          </section>

          {/* RIGHT */}

          <aside className="sticky top-8 self-start space-y-6">

            <QuestionNavigator
              total={exam.questionCount}
              current={currentQuestionIndex + 1}
              answered={answeredQuestions}
              review={reviewQuestions}
              onSelect={(question) =>
                setCurrentQuestionIndex(question - 1)
              }
            />

            {/* Progress */}

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="text-lg font-semibold text-white">
                Progress
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Answered
                  </span>

                  <span className="font-semibold text-white">
                    {answeredQuestions.size}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Review
                  </span>

                  <span className="font-semibold text-white">
                    {reviewQuestions.size}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Remaining
                  </span>

                  <span className="font-semibold text-white">
                    {exam.questionCount -
                      answeredQuestions.size}
                  </span>
                </div>

              </div>

            </div>
            {/* Submit */}

              <button
                className="
                  mt-6
                  w-full
                  rounded-lg
                  bg-blue-600
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                Submit Exam
              </button>

          </aside>

        </div>

      </div>

    </main>
  );
}

// interface LegendItemProps {
//   color: string;
//   label: string;
// }

// function LegendItem({
//   color,
//   label,
// }: LegendItemProps) {
//   return (
//     <div className="flex items-center gap-3">

//       <div
//         className={`h-3 w-3 rounded-full ${color}`}
//       />

//       <span className="text-zinc-300">
//         {label}
//       </span>

//     </div>
//   );
// }