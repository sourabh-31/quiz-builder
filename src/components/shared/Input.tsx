import { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  className,
  ...props
}: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label className="font-titilliumWeb font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        className={`rounded border border-[#ffcbb5] px-3 py-2 font-montserrat text-sm font-semibold text-gray-600 outline-none ${className}`}
      />
    </div>
  );
}
