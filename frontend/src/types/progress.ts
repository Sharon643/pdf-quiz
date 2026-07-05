export interface ProgressResponse {
  jobId: string;
  stage: string;
  percent: number;
  message: string;
  completed: boolean;
}