import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import { useModal } from "@hooks/useModal";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  resetQuizData,
  updateQuizDetails,
} from "@redux/features/quizSpanSlice";

export default function CreateQuizBtn() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { close } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      topic.trim() === ""
    ) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    dispatch(resetQuizData());
    dispatch(updateQuizDetails({ title, description, topic }));
    navigate("/create-quiz");
    close();
  };

  return (
    <>
      <Modal.Open opens="create-quiz">
        <button className="flex h-[16rem] w-full flex-col items-center justify-center gap-3 rounded bg-secondary py-14 md:size-[19rem]">
          <PlusCircle size={60} className="text-accent" />
          <Heading heading="Create Quiz" className="text-gray-800" />
        </button>
      </Modal.Open>

      <Modal.Window name="create-quiz">
        <div>
          <Heading heading="Create Quiz" className="text-accent" size="2xl" />
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <input
              placeholder="Enter quiz title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-6 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
            <input
              placeholder="Enter quiz description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
            <input
              placeholder="Enter quiz topic"
              name="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-3 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
          </motion.div>
          {/* Buttons */}
          <div className="-mb-2 mt-10 flex items-center justify-end gap-6 font-titilliumWeb text-xl font-bold">
            <button className="text-accent" onClick={handleCreateQuiz}>
              Create
            </button>
            <button className="text-gray-400" onClick={() => close()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}
