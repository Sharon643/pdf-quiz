import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { QuestionBank } from "../types/questionBank";

import { getQuestionBank } from "../services/questionBank";
import { generateExam } from "../services/examService";

import ExamSettingsHeader from "../components/exam-settings/ExamSettingsHeader";
import QuestionCountSelector from "../components/exam-settings/QuestionCountSelector";
import ExamSummary from "../components/exam-settings/ExamSummary";
import StartExamButton from "../components/exam-settings/StartExamButton";
import ExamSettingsSkeleton from "../components/exam-settings/ExamSettingsSkeleton";
import StartExamModal from "../components/exam-settings/StartExamModal";

export default function ExamSettings() {
  const navigate = useNavigate();

  const [questionBank, setQuestionBank] =
    useState<QuestionBank | null>(null);

  const [questionCount, setQuestionCount] = useState(75);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  

  useEffect(() => {
    async function loadQuestionBank() {
      try {
        const data = await getQuestionBank();
        setQuestionBank(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestionBank();
  }, []);

  async function handleStartExam() {
    if (!questionBank) {
      return;
    }

    setStarting(true);

    try {
      const response = await generateExam({
        questionCount,
      });

      navigate(`/exam/${response.examId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setStarting(false);
    }
  }

  if (loading) {
    return <ExamSettingsSkeleton />;
  }

  if (!questionBank) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">
          No Question Bank Found
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-8 py-8">

        <ExamSettingsHeader />

        <QuestionCountSelector
          totalQuestions={questionBank.questionCount}
          value={questionCount}
          onChange={setQuestionCount}
        />

        <ExamSummary
          selectedQuestions={questionCount}
          totalQuestions={questionBank.questionCount}
        />

        <StartExamButton
            loading={starting}
            onClick={() => setShowModal(true)}
        />

      </div>
      <StartExamModal
          open={showModal}
          questionCount={questionCount}
          loading={starting}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
              setShowModal(false);
              await handleStartExam();
          }}
      />
    </main>
  );
}