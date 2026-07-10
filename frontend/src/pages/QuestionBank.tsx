import { useEffect, useMemo, useState } from "react";

import type { QuestionBank } from "../types/questionBank";

import {
  getQuestionBank,
  getQuestionBankQuestions,
  type QuestionSummary,
} from "../services/questionBank";

import QuestionBankHeader from "../components/question-bank/QuestionBankHeader";
import QuestionBankInfo from "../components/question-bank/QuestionBankInfo";
import QuestionSearch from "../components/question-bank/QuestionSearch";
import QuestionCard from "../components/question-bank/QuestionCard";
import QuestionBankSkeleton from "../components/question-bank/QuestionBankSkeleton";

export default function QuestionBank() {
  const [metadata, setMetadata] = useState<QuestionBank | null>(null);
  const [questions, setQuestions] = useState<QuestionSummary[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestionBankData() {
      try {
        const [metadataResponse, questionsResponse] =
          await Promise.all([
            getQuestionBank(),
            getQuestionBankQuestions(),
          ]);

        setMetadata(metadataResponse);
        setQuestions(questionsResponse.questions);
      } catch (err) {
        console.error(err);
        setError("Failed to load Question Bank.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestionBankData();
  }, []);

  const filteredQuestions = useMemo(() => {
    if (!search.trim()) {
      return questions;
    }

    const query = search.toLowerCase();

    return questions.filter(
      (question) =>
        question.question.toLowerCase().includes(query) ||
        question.subject?.toLowerCase().includes(query)
    );
  }, [questions, search]);

  if (loading) {
    return <QuestionBankSkeleton />;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  if (!metadata) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">
          No Question Bank Found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8">

        <QuestionBankHeader />

        <QuestionBankInfo metadata={metadata} />

        <QuestionSearch
          value={search}
          onChange={setSearch}
        />

        <section className="space-y-4">

          {filteredQuestions.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
              <p className="text-zinc-400">
                No matching questions found.
              </p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
              />
            ))
          )}

        </section>

      </div>
    </main>
  );
}