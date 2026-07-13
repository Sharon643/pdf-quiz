export interface HistoryItem {
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

export interface HistoryListResponse {
  exams: HistoryItem[];
}