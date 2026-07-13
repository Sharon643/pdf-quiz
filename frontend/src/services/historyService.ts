import { api } from "./api";

import type {
  HistoryItem,
  HistoryListResponse,
} from "../types/history";

export async function getHistory(): Promise<HistoryListResponse> {
  const response =
    await api.get<HistoryListResponse>(
      "/history"
    );

  return response.data;
}

export async function getRecentHistory(): Promise<HistoryListResponse> {
  const response =
    await api.get<HistoryListResponse>(
      "/history/recent"
    );

  return response.data;
}

export async function getHistoryExam(
  examId: string
): Promise<HistoryItem> {
  const response =
    await api.get<HistoryItem>(
      `/history/${examId}`
    );

  return response.data;
}

export async function deleteHistoryExam(
  examId: string
) {
  await api.delete(
    `/history/${examId}`
  );
}