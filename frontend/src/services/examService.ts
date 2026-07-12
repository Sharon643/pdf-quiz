import { api } from "./api";

import type {
  ExamSession,
  GenerateExamRequest,
  GenerateExamResponse,
} from "../types/exam";

import type { ExamResult } from "../types/result";


export async function generateExam(
  request: GenerateExamRequest
): Promise<GenerateExamResponse> {
  const response = await api.post<GenerateExamResponse>(
    "/exam/generate",
    request
  );

  return response.data;
}

export async function getExam(
  examId: string
): Promise<ExamSession> {
  const response = await api.get<ExamSession>(
    `/exam/${examId}`
  );

  return response.data;
}

export async function saveAnswer(
  examId: string,
  questionId: string,
  selectedOption: string | null
) {
  await api.post(`/exam/${examId}/answer`, {
    questionId,
    selectedOption,
  });
}

export async function markForReview(
  examId: string,
  questionId: string,
  marked: boolean
) {
  await api.post(`/exam/${examId}/review`, {
    questionId,
    marked,
  });
}
export interface SubmitExamResponse {
    success: boolean;

    score: number;

    totalQuestions: number;

    correctAnswers: number;

    wrongAnswers: number;

    unanswered: number;

    percentage: number;
}
export async function submitExam(
  examId: string
): Promise<ExamResult> {
  const response = await api.post<ExamResult>(
    `/exam/${examId}/submit`
  );

  return response.data;
}

export async function getCurrentExam() {
  const response = await api.get("/exam/current");
  return response.data;
}

export async function deleteExam(examId: string) {
    const response = await api.delete(
        `/exam/${examId}`
    );

    return response.data;
}