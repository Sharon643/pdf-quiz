import api from "./api";
import type { ExtractionJob } from "../types/job";

export async function uploadPdf(
  file: File
): Promise<ExtractionJob> {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post<ExtractionJob>(
    "/extract",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}