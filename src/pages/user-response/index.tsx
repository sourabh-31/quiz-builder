import { useEffect, useState } from "react";
import UnderlineText from "@components/shared/UnderlineText";
import KeyValue from "@components/user-response/KeyValue";
import { loadQuiz } from "@utils/firestoreActions";
import { QuizSpanSliceStateType } from "@customTypes/quizSpanSlice.type";
import Accordion from "@components/shared/Accordian";
import PageSpinner from "@components/shared/PageSpinner";

export default function UserResponse() {
  const [quizData, setQuizData] = useState<
    QuizSpanSliceStateType | null | undefined
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get("quizId");

    if (quizId) {
      loadQuiz(quizId)
        .then((data) => {
          setQuizData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <PageSpinner />;
  if (!quizData)
    return (
      <div className="font-titilliumWeb text-2xl font-bold">
        No quiz data found
      </div>
    );

  const accordionItems = quizData.userResponses?.map((response, index) => ({
    title: `Response ${index + 1} (${new Date(response.timestamp as string).toLocaleDateString()})`,
    content: (
      <div className="space-y-2">
        <KeyValue title="User ID" value={response.userId ?? ""} />
        <KeyValue
          title="Total Score"
          value={`${
            response.responses
              ? response.responses.reduce(
                  (total, answer) => total + answer.pointsEarned,
                  0,
                )
              : 0
          }/${
            response.responses
              ? response.responses.reduce(
                  (total, answer) => total + answer.pointsAvailable,
                  0,
                )
              : 0
          }`}
        />
        {response.responses &&
          response.responses.map((answer, answerIndex) => (
            <KeyValue
              key={answerIndex}
              title={`Question ${answerIndex + 1}`}
              value={`Answer: ${answer.givenAnswer}, Correct: ${answer.isCorrect ? "Yes" : "No"}, Score: ${answer.pointsEarned}/${answer.pointsAvailable}`}
            />
          ))}
      </div>
    ),
  }));

  return (
    <section className="mt-12">
      <UnderlineText>User Responses</UnderlineText>

      <div className="mt-8 space-y-4">
        <KeyValue title="Quiz Title" value={quizData.title} />
        <KeyValue title="Description" value={quizData.description} />
        <KeyValue title="Topic" value={quizData.topic} />
      </div>

      <div className="mt-10">
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
}
