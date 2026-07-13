import { api } from "./api";

import type { ReviewResponse } from "../types/review";

export async function getReview(
  examId: string
): Promise<ReviewResponse> {

  const response = await api.get<ReviewResponse>(
    `/review/${examId}`
  );

  return response.data;
}