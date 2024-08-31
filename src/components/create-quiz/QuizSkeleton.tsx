import React from "react";
import { useDispatch } from "react-redux";
import Heading from "@components/shared/Heading";
import {
  deleteQuestion,
  setSelectedQuestion,
  updateQuestion,
} from "@redux/features/quizSpanSlice";
import { Pencil, Trash2 } from "lucide-react";
import { Dispatch } from "react";

interface QuizSkeletonProps {
  questionId: string;
  question: string;
  options: string[];
  points: number;
  correctOption: number;
  handleEditClicked: Dispatch<React.SetStateAction<boolean>>;
}

export default function QuizSkeleton({
  questionId,
  question,
  options,
  points,
  correctOption,
  handleEditClicked,
}: QuizSkeletonProps) {
  const dispatch = useDispatch();

  const onEditClick = () => {
    handleEditClicked(true);
    dispatch(setSelectedQuestion(questionId));
  };

  const onDeleteClick = () => {
    dispatch(deleteQuestion(questionId));
  };

  const handleOptionClick = (index: number) => {
    dispatch(
      updateQuestion({
        questionId,
        updates: {
          correctOption: index,
        },
      }),
    );
  };

  return (
    <div className="flex flex-col justify-center rounded-md border border-[#ffa680] bg-secondary p-4">
      {/* Quiz Question */}
      <Heading heading={question} size="base" className="mb-4 text-gray-800" />

      {/* Quiz options */}
      <div className="mb-4 grid grid-cols-2 gap-4 font-montserrat text-sm font-semibold text-gray-600">
        {options.map((option, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-lg border border-[#ffcbb5] p-2 text-center transition-colors duration-200 ease-in-out ${
              index === correctOption ? "bg-[#ffa680] text-white" : "bg-gray-50"
            }`}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* Points and Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-montserrat text-sm font-semibold text-gray-800">
            Answer:{" "}
            <span className="font-titilliumWeb">
              {correctOption + 1}
              <span className="ml-1 font-montserrat">
                ({options[correctOption]})
              </span>
            </span>
          </span>
          <span className="font-montserrat text-sm font-semibold text-gray-800">
            Points: <span className="font-titilliumWeb">{points}</span>
          </span>
        </div>

        {/* Action Icon */}

        <div className="flex gap-4">
          <button onClick={onEditClick} className="p-2 hover:text-blue-600">
            <Pencil size={20} />
          </button>
          <button onClick={onDeleteClick} className="p-2 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
