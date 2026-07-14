export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        <div
          className="
            h-12
            w-12
            animate-spin
            rounded-full
            border-4
            border-zinc-700
            border-t-blue-500
          "
        />

        <p className="text-sm text-zinc-400">
          Loading...
        </p>

      </div>
    </div>
  );
}