import {
  CheckCircle2,
  FileUp,
  PlayCircle,
} from "lucide-react";

const activities = [
  {
    icon: <CheckCircle2 size={18} />,
    title: "Completed Exam",
    subtitle: "Medical MCQs",
    time: "Yesterday",
  },
  {
    icon: <FileUp size={18} />,
    title: "Uploaded Question Bank",
    subtitle: "Medical MCQs.pdf",
    time: "2 days ago",
  },
  {
    icon: <PlayCircle size={18} />,
    title: "Started Practice Session",
    subtitle: "Respiratory MCQs",
    time: "Today",
  },
];

export default function RecentActivity() {
  return (
    <section>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-2 text-zinc-400">
          Your latest actions in QuizForge AI.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900">

        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className={`
              flex items-center justify-between px-6 py-5
              ${
                index !== activities.length - 1
                  ? "border-b border-zinc-800"
                  : ""
              }
            `}
          >
            <div className="flex items-center gap-4">

              <div className="text-zinc-400">
                {activity.icon}
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {activity.title}
                </h3>

                <p className="text-sm text-zinc-400">
                  {activity.subtitle}
                </p>
              </div>

            </div>

            <span className="text-sm text-zinc-500">
              {activity.time}
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}