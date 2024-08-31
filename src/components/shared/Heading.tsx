interface HeadingProps {
  heading: string;
  className?: string;
  size?: keyof typeof sizeClasses;
  weight?: keyof typeof weightClasses;
}

const sizeClasses = {
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  black: "font-black",
};

export default function Heading({
  heading,
  className,
  size = "xl",
  weight = "bold",
}: HeadingProps) {
  return (
    <span
      role="heading"
      className={`font-titilliumWeb ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
    >
      {heading}
    </span>
  );
}
