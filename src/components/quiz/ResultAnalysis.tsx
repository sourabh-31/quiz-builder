import Heading from "@components/shared/Heading";
import { RootState } from "@redux/store";
import { ChevronDown, ChevronUp, CircleAlert } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ResultAnalysis() {
  // Redux hooks
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { questions, userResponses } = useSelector(
    (state: RootState) => state.quizSpan,
  );

  //   Handle toggle accordian
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-12">
      {/* Heading */}

      <div className="mb-8 flex justify-center">
        <Heading
          heading="Result Analysis"
          size="2xl"
          className="text-gray-800"
        />
      </div>

      {/* Accordian cards */}
      {questions.map((question, index) => (
        <div key={index} className="mb-4 overflow-hidden rounded-lg">
          {/* Open accordin btn */}
          <button
            className={`flex w-full justify-between px-6 py-4 text-left text-lg transition-colors duration-200 hover:bg-[#ffcbb5] ${activeIndex === index ? "bg-[#ffcbb5]" : "bg-secondary"}`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="flex items-center gap-6 font-titilliumWeb font-semibold">
              {`Question ${index + 1}`}
              {!userResponses[index]?.isCorrect && (
                <CircleAlert className="text-red-600" size={20} />
              )}
            </span>
            <span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>

          {/* User response content */}

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="rounded-b-xl border border-[#ffcbb5] bg-[#fff2ec] p-6">
              {/* question */}

              <p className="mb-2 font-titilliumWeb text-lg font-semibold text-gray-800">
                {question.question}
              </p>
              {/* User Answer */}

              <p className="mb-1">
                <span className="mr-2 font-titilliumWeb font-semibold">
                  Your Answer:
                </span>

                <span className="font-montserrat font-medium text-gray-600">
                  {userResponses[index]?.givenAnswer || "No response"}
                </span>
              </p>
              {/* Correct Answer */}

              <p className="mb-1">
                <span className="mr-2 font-titilliumWeb font-semibold">
                  Correct Answer:
                </span>

                <span className="font-montserrat font-medium text-gray-600">
                  {userResponses[index]?.correctAnswer}
                </span>
              </p>
              {/* Result */}

              <p className="mb-1">
                <span className="mr-2 font-titilliumWeb font-semibold">
                  Result:
                </span>

                <span
                  className={`font-montserrat font-semibold ${
                    userResponses[index]?.isCorrect
                      ? "text-green-600"
                      : "text-red-600"
                  } `}
                >
                  {userResponses[index]?.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </p>
              {/* Points earned */}

              <p>
                <span className="mr-2 font-titilliumWeb font-semibold">
                  Points Earned:
                </span>

                <span className="font-titilliumWeb font-semibold text-gray-600">
                  <span
                    className={`text-lg font-semibold ${
                      userResponses[index]?.isCorrect
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {userResponses[index]?.pointsEarned}
                  </span>{" "}
                  / {userResponses[index]?.pointsAvailable}
                </span>
              </p>
            </div>
          </div>

          {/* User Response end */}
        </div>
      ))}
    </div>
  );
}
