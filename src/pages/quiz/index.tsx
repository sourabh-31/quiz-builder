import FinishScreen from "@components/quiz/FinishScreen";
import NextButton from "@components/quiz/NextButton";
import Progress from "@components/quiz/Progress";
import Question from "@components/quiz/Question";
import StartScreen from "@components/quiz/StartScreen";
import Timer from "@components/quiz/Timer";
import Error from "@components/shared/Error";
import PageSpinner from "@components/shared/PageSpinner";
import { loadQuizData } from "@redux/features/quizSpanSlice";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Quiz() {
  // Redux state
  const dispatch = useDispatch<AppDispatch>();
  const { status, questions, index, answer, points } = useSelector(
    (state: RootState) => state.quizSpan,
  );

  const urlParams = new URLSearchParams(location.search);
  const quizId = urlParams.get("quizId");

  // Quiz derived data
  const numQuestions = questions?.length ?? 0;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  // Fetch question as the component mounts
  useEffect(() => {
    if (quizId) {
      dispatch(loadQuizData(quizId));
    }
  }, [dispatch, quizId]);

  return (
    <section className="mx-auto mt-24 w-full max-w-4xl">
      <main>
        {status === "loading" && <PageSpinner />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question question={questions[index]} answer={answer} />
            <footer className="mx-auto mt-20 flex max-w-2xl items-center justify-between px-2">
              <Timer />
              <NextButton
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} />
        )}
      </main>
    </section>
  );
}
