import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string;
  onChangeValue: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChangeValue,
  ...props
}) => {
  return (
    <div className="inline-block relative">
      <select
        {...props}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        className={`appearance-none border border-gray-300 bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white p-2 rounded-lg pr-8 cursor-pointer
                   transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${props.className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="w-4 h-4 text-white transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
