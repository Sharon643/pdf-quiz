import api from "./api";
import type { QuestionBankResponse } from "../types/questionBank";

export async function getQuestionBank(): Promise<QuestionBankResponse> {
    const { data } = await api.get<QuestionBankResponse>("/question-bank");
    return data;
}