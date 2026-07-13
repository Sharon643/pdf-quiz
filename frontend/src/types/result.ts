export interface ExamResult {
  success: boolean;

  examId: string;

  score: number;

  totalQuestions: number;

  correctAnswers: number;

  wrongAnswers: number;

  unanswered: number;

  percentage: number;
}