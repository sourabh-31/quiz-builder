import Heading from "@components/shared/Heading";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={`flex w-full flex-col rounded bg-secondary px-4 py-4 md:w-80 ${className}`}
    >
      {children}
    </div>
  );
}

function Title({ title }: { title: string }) {
  return <Heading heading={title} className="text-accent" />;
}

function Description({ description }: { description: string }) {
  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <p className="mt-3 font-montserrat text-sm font-medium text-gray-600">
      {truncate(description, 170)}
    </p>
  );
}

function ButtonSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mt-auto ${className}`}>{children}</div>;
}

Card.Title = Title;
Card.Description = Description;
Card.ButtonSection = ButtonSection;

export default Card;
