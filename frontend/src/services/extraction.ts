import { api } from "./api";

export async function uploadPdf(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/extract",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}

export interface ExtractionProgress {
  jobId: string;
  stage: string;
  percent: number;
  message: string;
  completed: boolean;
}

export async function getExtractionStatus(
  jobId: string
): Promise<ExtractionProgress> {
  const response = await api.get(
    `/extract/status/${jobId}`
  );

  return response.data;
}