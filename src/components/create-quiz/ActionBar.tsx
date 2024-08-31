import Button from "@components/shared/Button";
import {
  addQuestion,
  publishQuiz,
  saveQuiz,
} from "@redux/features/quizSpanSlice";
import { AppDispatch, RootState } from "@redux/store";
import generateQuizId from "@utils/generateQuizId";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ActionBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { questions, isPublished } = useSelector(
    (state: RootState) => state.quizSpan,
  );
  const numQuestions = questions.length ?? 0;

  const urlParams = new URLSearchParams(location.search);
  const quizId = urlParams.get("quizId");

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handlePublish = () => {
    if (!questions.length) {
      toast.error("Please add question");
      return;
    }
    const quizId = generateQuizId();
    dispatch(publishQuiz(quizId)).then(() => {
      navigate(`/create-quiz?quizId=${quizId}`, { replace: true });
    });
  };

  const handleSave = () => {
    if (!questions.length || !quizId) {
      toast.error("Please add question");
      return;
    }
    dispatch(saveQuiz(quizId));
  };

  return (
    <div className="h-full w-[24rem] rounded bg-secondary p-6">
      {/* Action bar header */}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-1 text-lg">
          <span className="font-titilliumWeb font-semibold text-gray-800">
            Total Question:
          </span>
          <span className="font-titilliumWeb font-bold">{numQuestions}</span>
        </div>

        {!isPublished ? (
          <Button onClick={handlePublish}>Publish</Button>
        ) : (
          <Button onClick={handleSave}>Save</Button>
        )}
      </div>

      {/* Add question btn */}
      <Button
        className="flex w-full items-center justify-center gap-1"
        onClick={handleAddQuestion}
      >
        Add Question
        <Plus size={20} />
      </Button>
    </div>
  );
}
