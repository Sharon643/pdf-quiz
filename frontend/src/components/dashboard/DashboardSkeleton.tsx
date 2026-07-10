export default function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-8 py-8 animate-pulse">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-56 rounded-lg bg-zinc-800" />
          <div className="h-10 w-10 rounded-lg bg-zinc-800" />
        </div>

        {/* Welcome */}
        <div className="space-y-3">
          <div className="h-10 w-64 rounded bg-zinc-800" />
          <div className="h-5 w-96 rounded bg-zinc-800" />
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="h-10 w-20 rounded bg-zinc-800" />
              <div className="mt-4 h-4 w-24 rounded bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Continue + Question Bank */}
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="h-6 w-40 rounded bg-zinc-800" />
              <div className="mt-6 h-4 w-56 rounded bg-zinc-800" />
              <div className="mt-3 h-4 w-32 rounded bg-zinc-800" />
              <div className="mt-8 flex gap-3">
                <div className="h-10 w-28 rounded-lg bg-zinc-800" />
                <div className="h-10 w-28 rounded-lg bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="mb-6 h-6 w-40 rounded bg-zinc-800" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="h-6 w-6 rounded bg-zinc-800" />
                <div className="mt-6 h-5 w-28 rounded bg-zinc-800" />
                <div className="mt-3 h-4 w-full rounded bg-zinc-800" />
                <div className="mt-2 h-4 w-3/4 rounded bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}