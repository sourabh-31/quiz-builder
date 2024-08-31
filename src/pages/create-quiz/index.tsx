import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ActionBar from "@components/create-quiz/ActionBar";
import CreateView from "@components/create-quiz/CreateView";
import EditBar from "@components/create-quiz/EditBar";
import { AppDispatch, RootState } from "@redux/store";
import Spinner from "@components/shared/Spinner";
import { loadQuizData as loadQuiz } from "@redux/features/quizSpanSlice";

export default function CreateQuiz() {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isPublished, title } = useSelector(
    (state: RootState) => state.quizSpan,
  );

  useEffect(() => {
    const loadQuizData = async () => {
      setIsLoading(true);
      const urlParams = new URLSearchParams(location.search);
      const quizId = urlParams.get("quizId");

      if (quizId) {
        setIsEditing(true);
        await dispatch(loadQuiz(quizId));
      } else {
        setIsEditing(false);
      }

      setIsLoading(false);
    };

    loadQuizData();
  }, [dispatch, location.search]);

  useEffect(() => {
    if (!isLoading && !isEditing && !title) {
      navigate("/dashboard");
    }
  }, [title, navigate, isLoading, isEditing]);

  // Handle page refresh
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isPublished) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPublished]);

  // Loading spinner when page is loading
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="mt-12 flex h-[78vh] min-w-[1024px] gap-12 overflow-x-auto">
      <CreateView handleEditClicked={setIsEditClicked} />

      {isEditClicked ? (
        <EditBar handleEditClicked={setIsEditClicked} />
      ) : (
        <ActionBar />
      )}
    </section>
  );
}
