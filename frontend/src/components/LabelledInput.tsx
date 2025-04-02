import React from "react";
import clsx from "clsx";

type LabelledInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: "text" | "email" | "password";
  className?: string;
};

const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  type = "text",
  className = "",
}) => {
  return (
    <div className={clsx("w-full max-w-xs md:max-w-md lg:max-w-lg", className)}>
      <label htmlFor={label} className="block text-gray-700 text-sm md:text-base font-medium mb-2">
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none",
          error ? "border-red-500" : "border-gray-300",
          "text-sm md:text-base"
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default LabelledInput;
