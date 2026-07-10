import axios from "axios";

import type { QuestionBank } from "../types/questionBank";

const API_URL = "http://localhost:8000";

export interface QuestionSummary {
  id: number;
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
  const response = await axios.get<QuestionBank>(
    `${API_URL}/question-bank`
  );

  return response.data;
}

export async function getQuestionBankQuestions(): Promise<QuestionListResponse> {
  const response = await axios.get<QuestionListResponse>(
    `${API_URL}/question-bank/questions`
  );

  return response.data;
}