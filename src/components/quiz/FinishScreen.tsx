import Button from "@components/shared/Button";
import { restart } from "@redux/features/quizSpanSlice";
import { RootState } from "@redux/store";
import { RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ResultAnalysis from "./ResultAnalysis";

interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
}

export default function FinishScreen({
  points,
  maxPossiblePoints,
}: FinishScreenProps) {
  const dispatch = useDispatch();
  const { highscore } = useSelector((state: RootState) => state.quizSpan);

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
      {/* Score */}

      <p className="rounded-md bg-secondary px-6 py-4 text-center font-titilliumWeb text-xl font-semibold sm:text-2xl md:text-3xl">
        <span>{emoji}</span>
        You scored <span className="font-bold text-accent">{points}</span> out
        of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>

      {/* High score */}

      <p className="mt-4 font-montserrat font-medium">
        (Highscore:{" "}
        <span className="font-titilliumWeb text-lg font-bold text-accent">
          {highscore}
        </span>{" "}
        points)
      </p>

      {/* Restart quiz button */}

      <Button
        className="mt-8 flex items-center gap-1"
        onClick={() => dispatch(restart())}
      >
        <RotateCcw size={18} />
        <span className="py-1 text-base">Restart Quiz</span>
      </Button>

      {/* Result analysis */}

      <ResultAnalysis />
    </div>
  );
}
