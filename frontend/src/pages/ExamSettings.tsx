import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { QuestionBank } from "../types/questionBank";

import { getQuestionBanks } from "../services/questionBank";
import {generateExam,deleteExam,} from "../services/examService";

import ExamSettingsHeader from "../components/exam-settings/ExamSettingsHeader";
import QuestionCountSelector from "../components/exam-settings/QuestionCountSelector";
import ExamSummary from "../components/exam-settings/ExamSummary";
import StartExamButton from "../components/exam-settings/StartExamButton";
import ExamSettingsSkeleton from "../components/exam-settings/ExamSettingsSkeleton";
import StartExamModal from "../components/exam-settings/StartExamModal";
import ExamModeSelector from "../components/exam-settings/ExamModeSelector";
import ResumeExamModal from "../components/exam-settings/ResumeExamModal";

export default function ExamSettings() {
  const navigate = useNavigate();

  const [activeBank, setActiveBank] =useState<QuestionBank | null>(null);

  const [questionCount, setQuestionCount] = useState(75);
  const [timed, setTimed] = useState(false);
  const [duration, setDuration] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const [existingExamId, setExistingExamId] = useState("");

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  

  useEffect(() => {
  async function loadQuestionBank() {
    try {
      const data = await getQuestionBanks();

      const active =
        data.banks.find(
          (bank: QuestionBank) => bank.active
        ) ?? null;

      setActiveBank(active);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

    loadQuestionBank();
  }, []);

  async function handleStartExam() {
    if (!activeBank) {
      return;
    }

    setStarting(true);

    try {
      const response = await generateExam({
        questionCount,
        timed,
          durationMinutes: timed ? duration : null,
        });

        if (response.unfinishedExam) {
          setExistingExamId(response.examId);
          setShowResumeModal(true);
          return;
        }

      navigate(`/exam/${response.examId}`);
    }
 catch (error) {
      console.error(error);
    } finally {
      setStarting(false);
    }
  }

  if (loading) {
    return <ExamSettingsSkeleton />;
  }

  if (!activeBank) {
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
          totalQuestions={activeBank.questionCount}
          value={questionCount}
          onChange={setQuestionCount}
        />
        <ExamModeSelector
          timed={timed}
          duration={duration}
          onTimedChange={setTimed}
          onDurationChange={setDuration}
        />

        <ExamSummary
          selectedQuestions={questionCount}
          totalQuestions={activeBank.questionCount}
          timed={timed}
          duration={duration}
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

      <ResumeExamModal
          open={showResumeModal}
          onResume={() => {

              setShowResumeModal(false);

              navigate(`/exam/${existingExamId}`);

          }}
          onStartNew={async () => {

              try {

                  setShowResumeModal(false);

                  setStarting(true);

                  await deleteExam(existingExamId);

                  const response = await generateExam({
                      questionCount,
                      timed,
                      durationMinutes: timed
                          ? duration
                          : null,
                  });

                  navigate(`/exam/${response.examId}`);

              } catch (err) {

                  console.error(err);

              } finally {

                  setStarting(false);

              }

          }}
          onCancel={() => setShowResumeModal(false)}
      />
    </main>
  );
}