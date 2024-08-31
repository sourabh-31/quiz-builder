import CreateQuizBtn from "@components/dashboard/CreateQuizBtn";
import DashboardCard from "@components/dashboard/DashboardCard";
import Spinner from "@components/shared/Spinner";
import UnderlineText from "@components/shared/UnderlineText";
import { QuizSpanSliceStateType } from "@customTypes/quizSpanSlice.type";
import { loadAllQuizes } from "@utils/firestoreActions";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [quizes, setQuizes] = useState<{
    [id: string]: QuizSpanSliceStateType;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizes() {
      try {
        const data = await loadAllQuizes();
        setQuizes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizes();
  }, []);

  const filteredQuizes = quizes
    ? Object.entries(quizes).filter(([id, _]) => id.startsWith("quiz-"))
    : [];

  return (
    <section className="mt-12">
      <UnderlineText>Create Quiz</UnderlineText>

      {/* Quiz Cards */}

      <div className="mt-8 flex flex-wrap items-stretch justify-center gap-8 sm:justify-start">
        <CreateQuizBtn />

        {/* Quiz Detail Card */}

        {loading ? (
          <div className="flex h-[16rem] w-full items-center justify-center md:size-[19rem]">
            <Spinner />
          </div>
        ) : (
          filteredQuizes.map((quiz) => (
            <DashboardCard
              key={quiz[0]}
              quizId={quiz[0]}
              title={quiz[1].title}
              description={quiz[1].description}
            />
          ))
        )}
      </div>
    </section>
  );
}
