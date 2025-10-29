import React, { useState, useEffect } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  debounce?: number; // debounce in ms
  onChangeValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  debounce = 300,
  onChangeValue,
  ...props
}) => {
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    if (!onChangeValue) return;
    const handler = setTimeout(() => {
      onChangeValue(value.toString());
    }, debounce);
    return () => clearTimeout(handler);
  }, [value, debounce, onChangeValue]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`px-3 py-2 border rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white placeholder-gray-400
       transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
    />
  );
};

export default Input;
