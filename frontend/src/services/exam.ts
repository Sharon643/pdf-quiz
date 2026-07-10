import {api} from "./api";

import type {
  ExamSession,
  GenerateExamResponse,
  SaveAnswerRequest,
  MarkReviewRequest,
  SubmitExamResponse,
} from "../types/exam";

export async function generateExam(questionCount: number) {
  const { data } = await api.post<GenerateExamResponse>(
    "/exam/generate",
    {
      questionCount,
    }
  );

  return data;
}

export async function getExam(examId: string) {
  const { data } = await api.get<ExamSession>(
    `/exam/${examId}`
  );

  return data;
}

export async function saveAnswer(
  examId: string,
  request: SaveAnswerRequest
) {
  await api.post(
    `/exam/${examId}/answer`,
    request
  );
}

export async function markForReview(
  examId: string,
  request: MarkReviewRequest
) {
  await api.post(
    `/exam/${examId}/review`,
    request
  );
}

export async function submitExam(
  examId: string
) {
  const { data } =
    await api.post<SubmitExamResponse>(
      `/exam/${examId}/submit`
    );

  return data;
}