export interface ExamResult {
  success: boolean;

  score: number;

  totalQuestions: number;

  correctAnswers: number;

  wrongAnswers: number;

  unanswered: number;

  percentage: number;
}