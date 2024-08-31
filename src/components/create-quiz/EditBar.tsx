import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Button from "@components/shared/Button";
import Input from "@components/shared/Input";
import useSelectedQuestion from "@hooks/useSelectedQuestion";
import { ArrowLeft } from "lucide-react";
import { updateQuestion } from "@redux/features/quizSpanSlice";

interface EditBarProps {
  handleEditClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditBar({ handleEditClicked }: EditBarProps) {
  // Redux hooks
  const dispatch = useDispatch();
  const selectedQuestion = useSelectedQuestion();

  const [question, setQuestion] = useState(selectedQuestion?.question || "");
  const [options, setOptions] = useState(selectedQuestion?.options || []);
  const [points, setPoints] = useState(selectedQuestion?.points || 0);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  // Sets the initial value
  useEffect(() => {
    if (selectedQuestion) {
      setQuestion(selectedQuestion.question);
      setOptions(selectedQuestion.options);
      setPoints(selectedQuestion.points);
    }
  }, [selectedQuestion]);

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Field validation to check if empty
  const validateFields = () => {
    const newInvalidFields: string[] = [];
    if (!question.trim()) newInvalidFields.push("question");
    options.forEach((option, index) => {
      if (!option.trim()) newInvalidFields.push(`option-${index}`);
    });
    if (points <= 0) newInvalidFields.push("points");
    setInvalidFields(newInvalidFields);
    return newInvalidFields.length === 0;
  };

  // Handle save data
  const handleSave = () => {
    if (validateFields() && selectedQuestion) {
      dispatch(
        updateQuestion({
          questionId: selectedQuestion?.questionId,
          updates: {
            question,
            options,
            points,
          },
        }),
      );
      handleEditClicked(false);
    } else {
      setTimeout(() => setInvalidFields([]), 300);
    }
  };

  // Framer shake animation
  const shakeAnimation = {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.3 },
  };

  return (
    <div className="h-full w-[24rem] rounded bg-secondary p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          className="flex items-center gap-2"
          onClick={() => handleEditClicked(false)}
        >
          <ArrowLeft size={20} />
          <span className="font-montserrat font-semibold text-gray-800">
            Back
          </span>
        </button>

        <Button onClick={handleSave}>Save</Button>
      </div>

      <div className="space-y-4">
        <motion.div
          animate={invalidFields.includes("question") ? shakeAnimation : {}}
        >
          <Input
            label="Question"
            placeholder="Enter question"
            name="question"
            value={question}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
            className={
              invalidFields.includes("question") ? "border-red-500" : ""
            }
          />
        </motion.div>

        <div>
          <label className="font-titilliumWeb font-semibold">Options</label>
          {options.map((option, index) => (
            <motion.div
              key={index}
              animate={
                invalidFields.includes(`option-${index}`) ? shakeAnimation : {}
              }
              className="flex items-center gap-2"
            >
              <Input
                name={`option-${index}`}
                placeholder="Enter option"
                value={option}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOptionChange(index, e.target.value)
                }
                className={
                  invalidFields.includes(`option-${index}`)
                    ? "border-red-500"
                    : ""
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <motion.div
          animate={invalidFields.includes("points") ? shakeAnimation : {}}
        >
          <Input
            label="Points"
            placeholder="Enter points"
            name="points"
            type="text"
            value={points}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPoints(Number(e.target.value))
            }
            className={invalidFields.includes("points") ? "border-red-500" : ""}
          />
        </motion.div>
      </div>
    </div>
  );
}
