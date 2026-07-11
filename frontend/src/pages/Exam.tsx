import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import type { ExamSession } from "../types/exam";

import {getExam,saveAnswer,markForReview,} from "../services/examService";

import ExamHeader from "../components/exam/ExamHeader";
import QuestionPanel from "../components/exam/QuestionPanel";
import QuestionNavigator from "../components/exam/QuestionNavigator";
import SubmitExamModal from "../components/exam/SubmitExamModal";
import { submitExam } from "../services/examService";
import { useNavigate } from "react-router-dom";
import ExitExamModal from "../components/exam/ExitExamModal";


export default function Exam() {
  const { examId } = useParams();

  const navigate = useNavigate();

  const [showExitModal, setShowExitModal] = useState(false);

  const [exam, setExam] = useState<ExamSession | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [remainingSeconds, setRemainingSeconds] =useState<number | null>(null);

  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>( new Set([1]) );

  const [answers, setAnswers] = useState<Record<string, string | null>>({});

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [reviewQuestions, setReviewQuestions] = useState<Set<number>>(new Set());

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
        const restoredAnswers: Record<string, string | null> = {};
        const restoredReview = new Set<number>();

        session.questions.forEach((question, index) => {
          const state = session.answers?.[question.id];

          if (!state) return;

          restoredAnswers[question.id] = state.selectedOption;

          if (state.markedForReview) {
            restoredReview.add(index + 1);
          }
        });

        setAnswers(restoredAnswers);
        setReviewQuestions(restoredReview);

        const restoredVisited = new Set<number>();

        session.questions.forEach((question, index) => {
          const state = session.answers?.[question.id];

          if (state?.visited) {
            restoredVisited.add(index + 1);
          }
        });

        setVisitedQuestions(restoredVisited);
      } catch (err) {
        console.error(err);
        setError("Failed to load exam.");
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, [examId]);

  useEffect(() => {
      if (!exam?.timed || exam.durationMinutes == null) {
          setRemainingSeconds(null);
          return;
      }

      const startedAt = new Date(exam.startedAt).getTime();
      const durationMinutes = exam.durationMinutes;

      const updateTimer = () => {
          const end = startedAt + durationMinutes * 60 * 1000;

          const remaining = Math.max(
              0,
              Math.floor((end - Date.now()) / 1000)
          );

          setRemainingSeconds(remaining);

          if (remaining === 0 && !submitting) {
              handleSubmitExam();
          }
      };

      updateTimer();

      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
  }, [exam, submitting]);
  const currentQuestion = useMemo(() => {
    if (!exam) return null;

    return exam.questions[currentQuestionIndex];
  }, [exam, currentQuestionIndex]);

  const answeredQuestions = useMemo(() => {
    if (!exam) return new Set<number>();

    const answered = new Set<number>();

    exam.questions.forEach((question, index) => {
      if (answers[question.id]) {
        answered.add(index + 1);
      }
    });

    return answered;
  }, [answers, exam]);

async function handleSelectOption(option: string) {
  if (!currentQuestion || !exam) return;

  // Update UI immediately
  setAnswers((previous) => ({
    ...previous,
    [currentQuestion.id]: option,
  }));

  // Save to backend
  try {
    await saveAnswer(
      exam.examId,
      currentQuestion.id,
      option
    );
  } catch (err) {
    console.error("Failed to save answer", err);
  }
}
async function handleMarkForReview() {
  if (!exam || !currentQuestion) return;

  const questionNumber = currentQuestionIndex + 1;
  const isMarked = reviewQuestions.has(questionNumber);

  // Optimistic UI update
  const updated = new Set(reviewQuestions);

  if (isMarked) {
    updated.delete(questionNumber);
  } else {
    updated.add(questionNumber);
  }

  setReviewQuestions(updated);

  try {
    await markForReview(
      exam.examId,
      currentQuestion.id,
      !isMarked
    );
  } catch (err) {
    console.error(err);

    // Roll back on failure
    setReviewQuestions(reviewQuestions);
  }
}

  function handlePrevious() {
    const previousIndex = Math.max(currentQuestionIndex - 1, 0);

    setCurrentQuestionIndex(previousIndex);

    setVisitedQuestions((previous) => {
      const updated = new Set(previous);
      updated.add(previousIndex + 1);
      return updated;
    });
  }

  function handleNext() {
    if (!exam) return;

    const next = Math.min(
      currentQuestionIndex + 1,
      exam.questions.length - 1
    );

    setCurrentQuestionIndex(next);

    setVisitedQuestions((previous) => {
      const updated = new Set(previous);
      updated.add(next + 1);
      return updated;
    });
  }

const answeredAndReview = [...reviewQuestions].filter((questionNumber) => {
const question = exam?.questions[questionNumber - 1];

return question !== undefined && answers[question.id];
}).length;

const reviewOnly = reviewQuestions.size - answeredAndReview;

const answeredOnly = answeredQuestions.size - answeredAndReview;
async function handleSubmitExam() {
  if (!exam) return;

  setSubmitting(true);

  try {
    const result = await submitExam(exam.examId);

    navigate("/results", {
      state: result,
      replace: true,
    });

  } catch (err) {
    console.error(err);
  } finally {
    setSubmitting(false);
    setShowSubmitModal(false);
  }
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
    <>
    <main className="min-h-screen bg-zinc-950">

      <div className="mx-auto max-w-[1800px] px-8 py-8">

      <ExamHeader
          current={currentQuestionIndex + 1}
          total={exam.questionCount}
          answered={answeredQuestions.size}
          timed={exam.timed}
          remainingSeconds={remainingSeconds}
          onExit={() => setShowExitModal(true)}
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
              isMarkedForReview={reviewQuestions.has(currentQuestionIndex + 1)}
              onSelectOption={handleSelectOption}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onMarkReview={handleMarkForReview}
            />

          </section>

          {/* RIGHT */}

          <aside className="sticky top-8 self-start space-y-6">

            <QuestionNavigator
              total={exam.questionCount}
              current={currentQuestionIndex + 1}
              answered={answeredQuestions}
              review={reviewQuestions}
              visited={visitedQuestions}
              onSelect={(question) => {
              setCurrentQuestionIndex(question - 1);

              setVisitedQuestions((previous) => {
                const updated = new Set(previous);
                updated.add(question);
                return updated;
              });
            }}
              
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
                onClick={() => setShowSubmitModal(true)}
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
    <SubmitExamModal
      open={showSubmitModal}
      answered={answeredOnly}
      review={reviewOnly}
      answeredReview={answeredAndReview}
      total={exam.questionCount}
      loading={submitting}
      onCancel={() => setShowSubmitModal(false)}
      onSubmit={handleSubmitExam}
    />
    

    <ExitExamModal
      open={showExitModal}
      onCancel={() => setShowExitModal(false)}
      onConfirm={() => {
        setShowExitModal(false);
        navigate("/dashboard");
      }}
    />
    </>
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