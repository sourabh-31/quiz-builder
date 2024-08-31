export type QuizSpanSliceStateType = {
  questions: QuizQuestionType[];
  status: "loading" | "ready" | "active" | "finished" | "error";
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secRemaining: number | null;
  title: string;
  description: string;
  topic: string;
  userResponses: UserResponseType[];
  selectedQuestionId: string;
  isPublished: boolean;
};

export type QuizQuestionType = {
  questionId: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type UserResponseType = {
  question: string;
  correctAnswer: string;
  givenAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  pointsAvailable: number;
  timestamp?: string | number;
  userId?: string;
  responses?: UserResponseType[];
};
