import { api } from "./api";

import type {
  ExamSession,
  GenerateExamResponse,
} from "../types/exam";

export interface GenerateExamRequest {
  questionCount: number;
}

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

export async function submitExam(
  examId: string
) {
  const response = await api.post(
    `/exam/${examId}/submit`
  );

  return response.data;
}