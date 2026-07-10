export interface ExamQuestion {
  id: string;
  number: number;
  page?: number;
  subject?: string;
  question: string;
  options: Record<string, string>;
}

export interface AnswerState {
  selectedOption: string | null;
  visited: boolean;
  markedForReview: boolean;
}

export interface ExamSession {
  examId: string;
  questionCount: number;
  questions: ExamQuestion[];
  answers: Record<string, string | null>;
  completed: boolean;
}

export interface GenerateExamRequest {
  questionCount: number;
}

export interface GenerateExamResponse {
  success: boolean;
  examId: string;
  questionCount: number;
}

export interface SaveAnswerRequest {
  questionId: string;
  selectedOption: string | null;
}

export interface MarkReviewRequest {
  questionId: string;
  marked: boolean;
}

export interface SubmitExamResponse {
  success: boolean;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  percentage: number;
}