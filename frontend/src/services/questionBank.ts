import { api } from "./api";

import type { QuestionBank } from "../types/questionBank";

export interface QuestionSummary {
  id: string;
  number: number;
  page: number;
  subject?: string;
  question: string;
  options: Record<string, string>;
}

export interface QuestionListResponse {
  count: number;
  questions: QuestionSummary[];
}

export async function getQuestionBank(): Promise<QuestionBank> {
  const response = await api.get<QuestionBank>("/question-bank");

  return response.data;
}

export async function getQuestionBankQuestions(): Promise<QuestionListResponse> {
  const response = await api.get<QuestionListResponse>(
    "/question-bank/questions"
  );

  return response.data;
}