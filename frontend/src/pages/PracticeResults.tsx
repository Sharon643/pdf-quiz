import { useLocation, useNavigate } from "react-router-dom";

export default function PracticeResult() {
  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-3xl px-8 py-16">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10">

          <h1 className="text-center text-4xl font-bold text-white">
            🎉 Practice Complete
          </h1>

          <p className="mt-3 text-center text-zinc-400">
            Great job! Here's how you performed.
          </p>

          <div className="mt-10">

            <div className="rounded-xl bg-zinc-950 p-8 text-center">

              <p className="text-zinc-400">
                Accuracy
              </p>

              <h2 className="mt-2 text-6xl font-bold text-blue-400">
                {state.accuracy}%
              </h2>

            </div>

            <div className="mt-8 grid grid-cols-3 gap-5">

              <StatCard
                title="Correct"
                value={state.correct}
                color="text-green-400"
              />

              <StatCard
                title="Wrong"
                value={state.wrong}
                color="text-red-400"
              />

              <StatCard
                title="Skipped"
                value={state.skipped}
                color="text-yellow-400"
              />

            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                navigate("/practice/settings")
              }
              className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Practice Again
            </button>

            <button
              onClick={() =>
                navigate("/")
              }
              className="flex-1 rounded-xl border border-zinc-700 py-3 font-semibold text-white hover:bg-zinc-800"
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-950 p-6 text-center">

      <p className="text-zinc-400">
        {title}
      </p>

      <h3
        className={`mt-2 text-4xl font-bold ${color}`}
      >
        {value}
      </h3>

    </div>
  );
}