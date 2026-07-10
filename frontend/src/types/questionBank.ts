export interface QuestionBank {
  fileName: string;
  questionCount: number;
  subjects: number;
  uploadedAt: string | null;
  lastModified: string | null;
  hasQuestions: boolean;
}