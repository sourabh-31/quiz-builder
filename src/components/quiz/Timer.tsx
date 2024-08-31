import { tick } from "@redux/features/quizSpanSlice";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Timer() {
  const dispatch = useDispatch();
  const { secRemaining } = useSelector((state: RootState) => state.quizSpan);

  //   Derived quiz data
  const timeRemaining = secRemaining ?? 0;
  const mins = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch(tick());
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch],
  );

  return (
    <div className="rounded bg-secondary px-4 py-2 font-titilliumWeb font-semibold tracking-wide">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
