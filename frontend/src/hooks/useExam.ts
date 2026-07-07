import { useEffect, useMemo, useState } from "react";

import {
  getExam,
  saveAnswer,
  markForReview,
  submitExam,
} from "../services/exam";

import type {
  ExamSession,
  SubmitExamResponse,
} from "../types/exam";

export function useExam(examId: string) {
  const [exam, setExam] = useState<ExamSession | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const [result, setResult] =
    useState<SubmitExamResponse | null>(null);

  useEffect(() => {
    async function loadExam() {
      try {
        const data = await getExam(examId);

        setExam(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, [examId]);

  const currentQuestion = useMemo(() => {
    if (!exam) return null;

    return exam.questions[currentIndex];
  }, [exam, currentIndex]);

  function nextQuestion() {
    if (!exam) return;

    setCurrentIndex((prev) =>
      Math.min(prev + 1, exam.questions.length - 1)
    );
  }

  function previousQuestion() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  async function selectAnswer(option: string) {
    if (!exam || !currentQuestion) return;

    await saveAnswer(exam.examId, {
      questionId: currentQuestion.id,
      selectedOption: option,
    });

    setExam({
      ...exam,
      answers: {
        ...exam.answers,
        [currentQuestion.id]: {
          visited: true,
          markedForReview:
            exam.answers[currentQuestion.id]
              ?.markedForReview ?? false,
          selectedOption: option,
        },
      },
    });
  }

  async function toggleReview() {
    if (!exam || !currentQuestion) return;

    const current =
      exam.answers[currentQuestion.id];

    const marked =
      !(current?.markedForReview ?? false);

    await markForReview(exam.examId, {
      questionId: currentQuestion.id,
      marked,
    });

    setExam({
      ...exam,
      answers: {
        ...exam.answers,
        [currentQuestion.id]: {
          visited: true,
          selectedOption:
            current?.selectedOption ?? null,
          markedForReview: marked,
        },
      },
    });
  }

  async function finishExam() {
    if (!exam) return;

    const response = await submitExam(
      exam.examId
    );

    setResult(response);
  }

  return {
    loading,
    exam,
    result,

    currentIndex,
    currentQuestion,

    nextQuestion,
    previousQuestion,

    selectAnswer,
    toggleReview,

    finishExam,
  };
}