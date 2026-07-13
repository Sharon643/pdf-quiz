export interface ReviewQuestion {
  id: string;

  index: number;
  
  question: string;

  options: Record<string, string>;

  userAnswer: string | null;

  correctAnswer: string;

  correctOption: string;

  marked: boolean;

  explanation: string;

  isCorrect: boolean;

  isSkipped: boolean;
}

export interface ReviewSummary {
  examId: string;

  questionBank: string;

  mode: string;

  questionCount: number;

  correct: number;

  wrong: number;

  unanswered: number;

  percentage: number;

  completedAt: string;

  startedAt: string;

  timed: boolean;

  durationMinutes: number | null;
}

export interface ReviewResponse {
  examId: string;

  summary: ReviewSummary;

  questions: ReviewQuestion[];
}