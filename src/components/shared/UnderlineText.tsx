import { ReactNode } from "react";

interface UnderlineTextProps {
  children: ReactNode;
  color?: string;
  width?: number;
}

export default function UnderlineText({
  children,
  color = "#ff712c",
  width = 4,
}: UnderlineTextProps) {
  return (
    <span
      className="relative font-titilliumWeb text-xl font-black tracking-wide text-gray-800"
      style={{ paddingBottom: `${width}px` }}
    >
      {children}

      {/* Underline svg */}

      <svg
        className="absolute bottom-0 left-0"
        width="100%"
        height={width}
        viewBox={`0 0 100 ${width}`}
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1={width / 2}
          x2="100%"
          y2={width / 2}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
