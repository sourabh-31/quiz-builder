import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizMenu from "@pages/quiz-menu";
import AppLayout from "@layout/AppLayout";
import Quiz from "@pages/quiz";
import Dashboard from "@pages/dashboard";
import CreateQuiz from "@pages/create-quiz";
import Modal from "@components/shared/Modal";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserResponse from "@pages/user-response";

function App() {
  return (
    <>
      <Modal>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<QuizMenu />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/user-response" element={<UserResponse />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
