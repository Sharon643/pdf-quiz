import type { ReviewQuestion as Question } from "../../types/review";

interface ReviewQuestionProps {
  question: Question;
  index: number;
  total: number;
}

export default function ReviewQuestion({
  question,
  index,
  total,
}: ReviewQuestionProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-8">

        <p className="text-sm text-zinc-500">
          Question {index + 1} of {total}
        </p>

        <h2 className="mt-3 text-xl font-semibold leading-8 text-white">
          {question.question}
        </h2>

      </div>

      <div className="space-y-4">

        {Object.entries(question.options).map(([key, value]) => {

          const isCorrect =
            key === question.correctAnswer;

          const isUser =
            key === question.userAnswer;

          let classes =
            "border-zinc-700 bg-zinc-800";

          if (isCorrect) {
            classes =
              "border-green-500 bg-green-500/10";
          }

          if (isUser && !isCorrect) {
            classes =
              "border-red-500 bg-red-500/10";
          }

          return (
            <div
              key={key}
              className={`rounded-xl border p-5 ${classes}`}
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 font-semibold text-white">

                    {key}

                  </div>

                  <p className="leading-7 text-white">
                    {value}
                  </p>

                </div>

                <div className="flex flex-col gap-2">

                  {isUser && (
                    <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
                      Your Answer
                    </span>
                  )}

                  {isCorrect && (
                    <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                      Correct
                    </span>
                  )}

                </div>

              </div>

            </div>
          );

        })}

      </div>

      {question.explanation && (

        <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">

          <h3 className="mb-3 text-lg font-semibold text-blue-400">
            Explanation
          </h3>

          <p className="leading-7 text-zinc-300">
            {question.explanation}
          </p>

        </div>

      )}

    </div>
  );
}