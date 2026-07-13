import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HistoryCard from "../components/history/HistoryCard";
import HistoryFilter from "../components/history/HistoryFilter";
import HistoryHeader from "../components/history/HistoryHeader";

import { getHistory } from "../services/historyService";

import type { HistoryItem } from "../types/history";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedMode, setSelectedMode] = useState<
    "All" | "Timed" | "Practice"
  >("All");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);

      const response = await getHistory();

      setHistory(response.exams);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredHistory = useMemo(() => {
    return history.filter((exam) => {
      const matchesSearch = exam.questionBank
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesMode =
        selectedMode === "All" ||
        exam.mode.toLowerCase() === selectedMode.toLowerCase();

      return matchesSearch && matchesMode;
    });
  }, [history, search, selectedMode]);

  const averageScore = useMemo(() => {
    if (!history.length) return 0;

    const total = history.reduce(
      (sum, exam) => sum + exam.percentage,
      0
    );

    return Number((total / history.length).toFixed(1));
  }, [history]);

  const bestScore = useMemo(() => {
    if (!history.length) return 0;

    return Math.max(...history.map((exam) => exam.percentage));
  }, [history]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">

      <HistoryHeader
        totalExams={history.length}
        averageScore={averageScore}
        bestScore={bestScore}
      />

      <HistoryFilter
        search={search}
        selectedMode={selectedMode}
        onSearchChange={setSearch}
        onModeChange={setSelectedMode}
      />

      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center text-zinc-400">
          Loading history...
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">

          <h2 className="text-2xl font-semibold text-white">
            No Exams Found
          </h2>

          <p className="mt-3 text-zinc-400">
            Complete an exam to see your history here.
          </p>

        </div>
      ) : (
        <div className="grid gap-6">

          {filteredHistory.map((exam) => (
            <HistoryCard
              key={exam.examId}
              exam={exam}
              onReview={(examId) =>
                navigate(`/review/${examId}`)
              }
            />
          ))}

        </div>
      )}

    </div>
  );
}