export interface QuestionBank {
  id: string;
  fileName: string;
  questionCount: number;

  uploadedAt: string;
  lastModified: string;

  active: boolean;

  // Temporary compatibility fields
  subjects: number;
  hasQuestions?: boolean;
}

export interface QuestionSummary {
  id: number;
  number: number;
  page: number;
  subject: string;
  question: string;
  options: string[];
}

export interface QuestionBankListResponse {
  count: number;
  banks: QuestionBank[];
}

export interface QuestionListResponse {
  count: number;
  questions: QuestionSummary[];
}