import { configureStore } from "@reduxjs/toolkit";
import quizSpanReducer from "./features/quizSpanSlice";

const store = configureStore({
  reducer: {
    quizSpan: quizSpanReducer,
  },
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
