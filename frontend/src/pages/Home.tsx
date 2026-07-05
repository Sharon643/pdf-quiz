import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import UploadCard from "../components/home/UploadCard";
import QuestionBank from "../components/home/QuestionBank";
import ModeSelector from "../components/home/ModeSelector";
import Alert from "../components/ui/Alert";
import ProgressCard from "../components/ui/ProgressCard";

import { getQuestionBank } from "../services/questionBank";

import { useUpload } from "../hooks/useUpload";
import { useProgress } from "../hooks/useProgress";

import type { AlertMessage } from "../types/alert";
import type { QuestionBankResponse } from "../types/questionBank";

export default function Home() {
  const [questionBank, setQuestionBank] =
    useState<QuestionBankResponse>({
      questionCount: 0,
      subjects: 0,
    });

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [jobId, setJobId] =
    useState<string | null>(null);

  const [alert, setAlert] =
    useState<AlertMessage | null>(null);

  const { loading, extract } = useUpload();

  const {
    progress,
    isPolling,
  } = useProgress(jobId);

  //----------------------------------------------------
  // Load Question Bank
  //----------------------------------------------------

  useEffect(() => {
    loadQuestionBank();
  }, []);

  async function loadQuestionBank() {
    try {
      const data = await getQuestionBank();
      setQuestionBank(data);
    } catch (error) {
      console.error(error);

      setAlert({
        type: "error",
        message: "Failed to load question bank.",
      });
    }
  }

  //----------------------------------------------------
  // Hide Alert
  //----------------------------------------------------

  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, 4000);

    return () => clearTimeout(timer);

  }, [alert]);

  //----------------------------------------------------
  // Refresh after extraction completes
  //----------------------------------------------------

  useEffect(() => {

    if (!progress?.completed) {
      return;
    }

    async function finishExtraction() {

      await loadQuestionBank();

      setAlert({
        type: "success",
        message: "Extraction completed successfully!",
      });

      setSelectedFile(null);

      setJobId(null);

    }

    finishExtraction();

  }, [progress]);

  //----------------------------------------------------
  // Upload
  //----------------------------------------------------

  async function handleExtract() {

    if (!selectedFile) {

      setAlert({
        type: "warning",
        message: "Please select a PDF.",
      });

      return;

    }

    try {

      const job = await extract(selectedFile);

      setJobId(job.jobId);

      setAlert({
        type: "info",
        message: "Extraction started...",
      });

    } catch (error) {

      console.error(error);

      setAlert({
        type: "error",
        message: "Failed to start extraction.",
      });

    }

  }

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (

    <main className="mx-auto max-w-4xl space-y-8 p-8">

      <Hero />

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
        />
      )}

      {isPolling && progress ? (

        <ProgressCard
          progress={progress}
        />

      ) : (

        <UploadCard
          file={selectedFile}
          loading={loading}
          onFileChange={setSelectedFile}
          onExtract={handleExtract}
        />

      )}

      <QuestionBank
        questionCount={questionBank.questionCount}
        subjects={questionBank.subjects}
      />

      <ModeSelector />

    </main>

  );

}