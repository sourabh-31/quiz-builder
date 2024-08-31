import {
  QuizSpanSliceStateType,
  QuizQuestionType,
} from "@customTypes/quizSpanSlice.type";
import { RootState } from "@redux/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  editQuizData,
  loadQuiz,
  publishQuizData,
} from "@utils/firestoreActions";
import generateQuestionId from "@utils/generateQuestionId";

const SECS_PER_QUESTION = 30;

const initialState: QuizSpanSliceStateType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRemaining: null,
  title: "",
  description: "",
  topic: "",
  userResponses: [],
  selectedQuestionId: "",
  isPublished: false,
};

const quizSpanSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    start(state) {
      state.status = "active";
      state.secRemaining = state.questions.length * SECS_PER_QUESTION;
      state.userResponses = [];
    },
    newAnswer(state, action: PayloadAction<number>) {
      const question = state.questions[state.index];
      state.answer = action.payload;
      const isCorrect = action.payload === question.correctOption;

      if (isCorrect) {
        state.points += question.points;
      }

      // Store user response
      state.userResponses.push({
        question: question.question,
        correctAnswer: question.options[question.correctOption],
        givenAnswer: question.options[action.payload],
        isCorrect: isCorrect,
        pointsEarned: isCorrect ? question.points : 0,
        pointsAvailable: question.points,
      });
    },
    nextQuestion(state) {
      state.index += 1;
      state.answer = null;
    },
    finish(state) {
      state.status = "finished";
      state.highscore = Math.max(state.points, state.highscore);
    },
    restart(state) {
      state.status = "ready";
      state.index = 0;
      state.answer = null;
      state.points = 0;
      state.secRemaining = 10;
      state.userResponses = [];
    },
    tick(state) {
      if (state.secRemaining) {
        state.secRemaining -= 1;
      }
      if (state.secRemaining === 0) {
        state.status = "finished";
      }
    },
    addQuestion(state) {
      const newQuestion: QuizQuestionType = {
        questionId: generateQuestionId(),
        question: "Click on the pencil icon to edit this question.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctOption: 0,
        points: 10,
      };
      state.questions.push(newQuestion);
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(
        (question) => question.questionId !== action.payload,
      );
    },
    updateQuestion(
      state,
      action: PayloadAction<{
        questionId?: string;
        updates: Partial<QuizQuestionType>;
      }>,
    ) {
      const index = state.questions.findIndex(
        (question) => question.questionId === action.payload.questionId,
      );
      if (index !== -1) {
        state.questions[index] = {
          ...state.questions[index],
          ...action.payload.updates,
        };
      }
    },
    setSelectedQuestion(state, action: PayloadAction<string>) {
      state.selectedQuestionId = action.payload;
    },
    updateQuizDetails: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        topic: string;
      }>,
    ) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.topic = action.payload.topic;
    },
    setIsPublished: (state, action: PayloadAction<boolean>) => {
      state.isPublished = action.payload;
    },
    setQuizState: (state, action: PayloadAction<QuizSpanSliceStateType>) => {
      return { ...state, ...action.payload };
    },
    resetQuizData: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuizData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadQuizData.fulfilled, (state, action) => {
        state.status = "ready";
        Object.assign(state, action.payload);
      })
      .addCase(loadQuizData.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Thunk to fetch quiz data
export const fetchQuizData = createAsyncThunk(
  "quizSpan/fetchQuestions",
  async () => {
    const response = await fetch("http://localhost:8080/quizData");
    const data = await response.json();
    return {
      title: data.title,
      description: data.description,
      questions: data.questions,
      topic: data.topic,
    };
  },
);

//Thunk to load form data
export const loadQuizData = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("quizSpan/loadQuiz", async (quizId, { dispatch }) => {
  try {
    const quizData = await loadQuiz(quizId);
    if (quizData) {
      dispatch(setQuizState(quizData));
    } else {
      console.error("Quiz not found");
    }
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
});

// Thunk to publish form data
export const publishQuiz = createAsyncThunk<void, string, { state: RootState }>(
  "quizSpan/publishQuiz",
  async (quizId, { getState, dispatch }) => {
    dispatch(setIsPublished(true));
    const quizSpan = getState().quizSpan;
    await publishQuizData(quizSpan, quizId);
  },
);

// Thunk to save form data
export const saveQuiz = createAsyncThunk<void, string, { state: RootState }>(
  "quizSpan/saveQuiz",
  async (quizId, { getState }) => {
    const quizSpan = getState().quizSpan;
    await editQuizData(quizId, quizSpan);
  },
);

export const {
  start,
  newAnswer,
  nextQuestion,
  finish,
  restart,
  tick,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setSelectedQuestion,
  updateQuizDetails,
  setIsPublished,
  setQuizState,
  resetQuizData,
} = quizSpanSlice.actions;

export default quizSpanSlice.reducer;
