import { useParams } from "react-router-dom";

import { useExam } from "../hooks/useExam";

function Exam() {
  const { examId } = useParams();

  if (!examId) {
    return (
      <div className="p-8 text-center text-red-500">
        Invalid exam.
      </div>
    );
  }

  const {
    loading,
    exam,
    result,

    currentIndex,
    currentQuestion,

    nextQuestion,
    previousQuestion,

    selectAnswer,
    toggleReview,

    finishExam,
  } = useExam(examId);

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading Exam...
      </div>
    );
  }

  if (!exam || !currentQuestion) {
    return (
      <div className="p-8 text-center">
        Exam not found.
      </div>
    );
  }

  const answer =
    exam.answers[currentQuestion.id];

  return (
    <div className="mx-auto max-w-4xl p-8">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Question {currentIndex + 1} / {exam.questionCount}
        </h1>

        <button
          onClick={finishExam}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Submit Exam
        </button>

      </div>

      <div className="rounded-lg border p-6">

        <p className="mb-6 text-lg font-medium">
          {currentQuestion.question}
        </p>

        <div className="space-y-3">

          {Object.entries(currentQuestion.options).map(
            ([key, value]) => (

              <button
                key={key}
                onClick={() => selectAnswer(key)}
                className={`w-full rounded border p-3 text-left transition

                ${
                  answer?.selectedOption === key
                    ? "border-blue-600 bg-blue-100"
                    : "hover:bg-gray-100"
                }
                `}
              >
                <strong>{key}.</strong> {value}
              </button>

            )
          )}

        </div>

        <div className="mt-8 flex justify-between">

          <button
            onClick={previousQuestion}
            disabled={currentIndex === 0}
            className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={toggleReview}
            className={`rounded px-4 py-2 text-white

            ${
              answer?.markedForReview
                ? "bg-yellow-600"
                : "bg-gray-600"
            }
            `}
          >
            {answer?.markedForReview
              ? "Remove Review"
              : "Mark for Review"}
          </button>

          <button
            onClick={nextQuestion}
            disabled={
              currentIndex === exam.questionCount - 1
            }
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

      {result && (

        <div className="mt-8 rounded-lg border bg-green-50 p-6">

          <h2 className="mb-4 text-xl font-bold">
            Exam Result
          </h2>

          <p>Score: {result.score}</p>

          <p>
            Correct: {result.correctAnswers}
          </p>

          <p>
            Wrong: {result.wrongAnswers}
          </p>

          <p>
            Unanswered: {result.unanswered}
          </p>

          <p>
            Percentage: {result.percentage}%
          </p>

        </div>

      )}

    </div>
  );
}

export default Exam;