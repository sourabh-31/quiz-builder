import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

interface AccordianItemProps {
  title: string;
  children: ReactNode;
}

interface AccordinProps {
  items: ItemProps[];
}

interface ItemProps {
  title: string;
  content: JSX.Element;
}

const AccordionItem = ({ title, children }: AccordianItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full rounded-md border border-[#ffcbb5] text-left text-lg transition-colors duration-200`}
    >
      <button
        className="flex w-full items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-titilliumWeb font-semibold">{title}</span>
        <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const Accordion = ({ items }: AccordinProps) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
