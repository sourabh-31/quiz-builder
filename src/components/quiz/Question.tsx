import Heading from "@components/shared/Heading";
import { QuizQuestionType } from "@customTypes/quizSpanSlice.type";
import Options from "./Options";

interface QuestionProps {
  question: QuizQuestionType;
  answer: number | null;
}

export default function Question({ question, answer }: QuestionProps) {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-start justify-center px-1">
      <Heading heading={question.question} size="2xl" />
      <Options question={question} answer={answer} />
    </div>
  );
}
