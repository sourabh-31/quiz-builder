import Button from "@components/shared/Button";
import Card from "@components/shared/Card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  quizId: string;
}

export default function QuizCard({
  title,
  description,
  quizId,
}: QuizCardProps) {
  const navigate = useNavigate();

  const handleTakeQuiz = () => {
    if (quizId) {
      navigate(`/quiz?quizId=${quizId}`);
    }
  };

  return (
    <Card className="h-[15rem] md:h-[17rem]">
      {/* Card title and Description */}

      <Card.Title title={title} />
      <Card.Description description={description} />
      {/* Take Quiz Btn */}

      <Card.ButtonSection>
        <Button
          className="mt-10 flex items-center gap-1 self-start"
          onClick={handleTakeQuiz}
        >
          Take Quiz
          <div className="flex items-center">
            <ChevronRight size={18} />
            <ChevronRight size={18} className="-mx-3" />
          </div>
        </Button>
      </Card.ButtonSection>
    </Card>
  );
}
