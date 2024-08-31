import Button from "@components/shared/Button";
import Heading from "@components/shared/Heading";
import { SECS_PER_QUESTION } from "@constants/quizSpanData";
import { start } from "@redux/features/quizSpanSlice";
import { RootState } from "@redux/store";
import formatTime from "@utils/formatTime";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface StartScreenProps {
  numQuestions: number;
}

export default function StartScreen({ numQuestions }: StartScreenProps) {
  const { title, description, topic } = useSelector(
    (state: RootState) => state.quizSpan,
  );
  const dispatch = useDispatch();

  // Quiz derived data
  const timeLimit = numQuestions * SECS_PER_QUESTION;
  const { minutes, seconds } = formatTime(timeLimit);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Quiz Label */}

      <Heading
        heading={`Welcome To ${title}`}
        className="tracking-wide text-accent sm:text-4xl md:text-5xl"
        weight="black"
        size="2xl"
      />

      {/* Subheading  */}

      <div className="font-montserrat text-sm font-semibold text-gray-800 sm:mt-1 sm:text-lg md:text-xl">
        <span className="font-titilliumWeb font-bold">{numQuestions}</span>{" "}
        Questions to test your {topic} skills
      </div>

      {/* Quiz description */}

      <div className="mt-4 w-[18rem] text-center font-montserrat text-sm font-medium text-gray-600 sm:mt-6 sm:w-[25rem] sm:text-base">
        {description}
      </div>

      {/* Time Limit */}

      <div className="mt-10 flex items-center gap-1 rounded bg-secondary px-4 py-2 font-montserrat text-sm sm:text-base">
        <span className="font-bold text-gray-800">Time Limit:</span>
        <span className="font-semibold text-gray-600">
          <span className="font-titilliumWeb">
            {minutes}:{seconds}
          </span>{" "}
          mins
        </span>
      </div>

      {/* Start quiz btn */}

      <Button
        className="mt-4 flex items-center gap-2 md:mt-6"
        onClick={() => dispatch(start())}
      >
        <span className="text-sm sm:text-base">Start Quiz</span>
        <ArrowRight size={20} className="mt-[1px]" />
      </Button>
    </div>
  );
}
