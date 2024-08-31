import Heading from "@components/shared/Heading";
import { Pencil } from "lucide-react";
import QuizSkeleton from "./QuizSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import { Dispatch, useState } from "react";
import { motion } from "framer-motion";
import { updateQuizDetails } from "@redux/features/quizSpanSlice";
import Modal from "@components/shared/Modal";
import { useModal } from "@hooks/useModal";

interface CreateViewProps {
  handleEditClicked: Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateView({ handleEditClicked }: CreateViewProps) {
  const dispatch = useDispatch();
  const { questions, title, description, topic } = useSelector(
    (state: RootState) => state.quizSpan,
  );

  const { close } = useModal();

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTopic, setEditTopic] = useState(topic);
  const [isShaking, setIsShaking] = useState(false);
  const isEmpty = !questions.length;

  // Handle Modal Save
  const handleSave = () => {
    if (
      editTitle.trim() === "" ||
      editDescription.trim() === "" ||
      editTopic.trim() === ""
    ) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    dispatch(
      updateQuizDetails({
        title: editTitle,
        description: editDescription,
        topic: editTopic,
      }),
    );
    close();
  };

  return (
    <div className="flex h-full flex-1 flex-col rounded-md bg-secondary py-10">
      <div className="mx-auto flex h-full w-[34rem] flex-grow flex-col">
        {/* Quiz title */}
        <Modal.Open opens="edit-quiz">
          <div
            className="flex items-center justify-center gap-2 rounded-t-lg bg-accent py-3"
            role="button"
          >
            <Heading heading={title} className="text-white" />
            <Pencil className="text-white" size={20} />
          </div>
        </Modal.Open>

        {/* Quiz questions */}
        <div className="flex-grow overflow-y-auto rounded-b-lg border border-accent">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center font-titilliumWeb text-xl font-bold text-accent">
              Add Questions
            </div>
          ) : (
            <div className="space-y-6 p-6">
              {questions.map((question) => (
                <QuizSkeleton
                  key={question.questionId}
                  questionId={question.questionId}
                  question={question.question}
                  options={question.options}
                  points={question.points}
                  correctOption={question.correctOption}
                  handleEditClicked={handleEditClicked}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit quiz modal window */}
      <Modal.Window name="edit-quiz">
        <div>
          <Heading heading="Edit Quiz" className="text-accent" size="2xl" />
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <input
              placeholder="Enter quiz title"
              name="title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mt-6 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
            <input
              placeholder="Enter quiz description"
              name="description"
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="mt-3 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
            <input
              placeholder="Enter quiz topic"
              name="topic"
              type="text"
              value={editTopic}
              onChange={(e) => setEditTopic(e.target.value)}
              className="mt-3 w-[20rem] border-b border-[#ffa680] py-2 font-montserrat font-semibold text-gray-800 outline-none placeholder:font-normal sm:w-[30rem]"
            />
          </motion.div>
          {/* Buttons */}
          <div className="-mb-2 mt-10 flex items-center justify-end gap-6 font-titilliumWeb text-xl font-bold">
            <button className="text-accent" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-400" onClick={() => close()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Window>
    </div>
  );
}
