import { ArrowLeft } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center font-titilliumWeb text-2xl font-bold text-accent">
      <span>💥 There was an error fetching questions</span>

      {/* Go Back Btn */}
      <Button className="mt-4 flex items-center gap-2 px-6 md:mt-6">
        <ArrowLeft size={20} className="-ml-2 mt-[1px]" />
        <span className="text-sm sm:text-base" onClick={() => navigate("/")}>
          Go Back
        </span>
      </Button>
    </div>
  );
}
