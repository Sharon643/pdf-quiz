import {api} from "./api";
import type { ProgressResponse } from "../types/progress";

export async function getProgress(
  jobId: string
): Promise<ProgressResponse> {
  const { data } = await api.get<ProgressResponse>(
    `/progress/${jobId}`
  );

  return data;
}