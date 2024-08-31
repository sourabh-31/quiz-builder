import { QuizQuestionType } from "@customTypes/quizSpanSlice.type";
import { newAnswer } from "@redux/features/quizSpanSlice";
import { useDispatch } from "react-redux";

interface OptionsProps {
  question: QuizQuestionType;
  answer: number | null;
}

export default function Options({ question, answer }: OptionsProps) {
  const dispatch = useDispatch();
  const hasAnswered = answer !== null;

  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      {question.options.map((option, index) => (
        <button
          className={`hover: w-full cursor-pointer rounded-full px-6 py-3 text-left font-montserrat text-lg font-medium transition-all duration-200 ${!hasAnswered ? "bg-secondary text-gray-800 hover:translate-x-5 hover:bg-[#ffcbb5]" : ""} disabled:cursor-not-allowed ${index === answer ? "translate-x-5" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "bg-accent text-white"
                : "bg-gray-600 text-white"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch(newAnswer(index))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
