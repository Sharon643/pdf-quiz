export default function ExamSettingsSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-8 py-8 animate-pulse">

        <div className="space-y-4">
          <div className="h-10 w-28 rounded bg-zinc-800" />
          <div className="h-10 w-64 rounded bg-zinc-800" />
          <div className="h-5 w-80 rounded bg-zinc-800" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="h-6 w-48 rounded bg-zinc-800" />

          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-14 rounded-lg bg-zinc-800"
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="h-6 w-40 rounded bg-zinc-800" />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="h-4 w-24 rounded bg-zinc-800" />
                <div className="mt-3 h-8 w-20 rounded bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="h-11 w-40 rounded-lg bg-zinc-800" />
        </div>

      </div>
    </main>
  );
}