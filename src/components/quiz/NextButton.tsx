import Button from "@components/shared/Button";
import { finish, nextQuestion } from "@redux/features/quizSpanSlice";
import { RootState } from "@redux/store";
import { saveUserResponse } from "@utils/firestoreActions";
import generateUserId from "@utils/generateUserId";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface NextButtonProps {
  answer: number | null;
  index: number;
  numQuestions: number;
}

function NextButton({ answer, index, numQuestions }: NextButtonProps) {
  const dispatch = useDispatch();
  const { userResponses } = useSelector((state: RootState) => state.quizSpan);

  const urlParams = new URLSearchParams(location.search);
  const quizId = urlParams.get("quizId");
  const userId = generateUserId();

  const handleFinish = () => {
    if (quizId) {
      saveUserResponse(quizId, userId, userResponses);
    }
    dispatch(finish());
  };

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <Button
        className="flex items-center gap-2"
        onClick={() => dispatch(nextQuestion())}
      >
        <span className="text-sm sm:text-base">Next</span>
        <ArrowRight size={20} className="mt-[1px]" />
      </Button>
    );

  if (index === numQuestions - 1)
    return (
      <Button onClick={handleFinish}>
        <span className="text-sm sm:text-base">Finish</span>
      </Button>
    );
}

export default NextButton;
