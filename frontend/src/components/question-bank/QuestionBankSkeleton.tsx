export default function QuestionBankSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8 animate-pulse">

        {/* Header */}
        <div className="space-y-4">
          <div className="h-10 w-28 rounded-lg bg-zinc-800" />

          <div className="h-10 w-72 rounded-lg bg-zinc-800" />

          <div className="h-5 w-96 rounded-lg bg-zinc-800" />
        </div>

        {/* Question Bank Info */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="h-7 w-72 rounded bg-zinc-800" />

          <div className="mt-6 flex gap-8">
            <div className="h-4 w-28 rounded bg-zinc-800" />
            <div className="h-4 w-24 rounded bg-zinc-800" />
            <div className="h-4 w-40 rounded bg-zinc-800" />
          </div>
        </div>

        {/* Search */}
        <div className="h-12 rounded-xl bg-zinc-900 border border-zinc-800" />

        {/* Question Cards */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-zinc-800" />
              <div className="h-4 w-32 rounded bg-zinc-800" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-11/12 rounded bg-zinc-800" />
              <div className="h-4 w-9/12 rounded bg-zinc-800" />
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}