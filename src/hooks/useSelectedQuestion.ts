import { RootState } from "@redux/store";
import { useSelector } from "react-redux";

export default function useSelectedQuestion() {
  const { questions, selectedQuestionId } = useSelector(
    (state: RootState) => state.quizSpan,
  );

  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  return selectedQuestion;
}
