interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="mx-auto grid w-full max-w-2xl grid-cols-[auto_auto] justify-between gap-3">
      {/* Progress bar */}

      <progress max={numQuestions} value={index + Number(answer !== null)} />

      {/* Current Question */}

      <p className="font-titilliumWeb font-semibold">
        Question{" "}
        <span className="text-xl font-bold text-accent">{index + 1}</span> /{" "}
        {numQuestions}
      </p>

      {/* Track Points */}

      <p className="font-titilliumWeb font-semibold">
        <span className="text-xl font-bold text-accent">{points}</span> /{" "}
        {maxPossiblePoints} points
      </p>
    </header>
  );
}
