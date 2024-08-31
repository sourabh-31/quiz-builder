import Button from "@components/shared/Button";
import Card from "@components/shared/Card";
import { deleteQuizData } from "@utils/firestoreActions";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  quizId: string;
}

export default function DashboardCard({
  title,
  description,
  quizId,
}: QuizCardProps) {
  const navigate = useNavigate();

  const handleDeleteQuiz = async () => {
    await deleteQuizData(quizId);
    window.location.reload();
  };

  const handleEditQuiz = () => {
    navigate(`/create-quiz?quizId=${quizId}`);
  };

  const handleViewResponse = () => {
    navigate(`/user-response?quizId=${quizId}`);
  };

  return (
    <Card className="h-[17rem] md:h-[19rem]">
      {/* Card title and Description */}

      <Card.Title title={title} />
      <Card.Description description={description} />
      {/* Action Btn */}

      <Card.ButtonSection>
        {/* View response btn */}

        <Button
          className="mt-10 flex w-full items-center justify-center gap-1"
          onClick={handleViewResponse}
        >
          View Responses
          <div className="flex items-center">
            <ChevronRight size={18} />
            <ChevronRight size={18} className="-mx-3" />
          </div>
        </Button>

        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Edit btn */}

          <Button
            className="flex w-full items-center justify-center gap-2"
            onClick={handleEditQuiz}
          >
            Edit
            <Pencil size={14} />
          </Button>
          {/* Delete Btn */}

          <Button
            className="flex w-full items-center justify-center gap-2"
            onClick={handleDeleteQuiz}
          >
            Delete
            <Trash2 size={18} />
          </Button>
        </div>
      </Card.ButtonSection>
    </Card>
  );
}
