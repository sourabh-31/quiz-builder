import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { RootState } from "@redux/store";
import { resetQuizData } from "@redux/features/quizSpanSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();

  const isQuizPage = pathname === "/quiz";
  const isHomePage = pathname === "/";
  const isDashboardPage = pathname === "/dashboard";
  const isCreateQuizPage = pathname === "/create-quiz";
  const isUserResponse = pathname === "/user-response";

  const { isPublished } = useSelector((state: RootState) => state.quizSpan);

  const handleNavigation = (path: string) => {
    if (isCreateQuizPage && !isPublished) {
      const confirmMessage =
        "Your quiz is not published. Changes may be lost. Do you still want to leave this page?";
      if (window.confirm(confirmMessage)) {
        dispatch(resetQuizData());
        navigate(path, { replace: true });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="mx-auto flex w-full max-w-8xl items-center justify-between bg-bg px-6 py-6 sm:px-12">
      <span
        className="font-lilitaOne text-3xl text-accent"
        role="button"
        onClick={() => handleNavigation("/")}
      >
        Quiz
      </span>
      {/* Navigation Btn */}

      {isQuizPage && (
        <Button onClick={() => handleNavigation("/")}>Go To Home</Button>
      )}
      {isHomePage && (
        <Button onClick={() => handleNavigation("/dashboard")}>
          Go To Dashboard
        </Button>
      )}
      {isDashboardPage && (
        <Button onClick={() => handleNavigation("/")}>Go To Home</Button>
      )}
      {isCreateQuizPage && (
        <Button onClick={() => handleNavigation("/dashboard")}>
          Go To Dashboard
        </Button>
      )}

      {isUserResponse && (
        <Button onClick={() => handleNavigation("/dashboard")}>
          Go To Dashboard
        </Button>
      )}
    </nav>
  );
}
