import React from "react";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChangeValue,
  ...props
}) => {
  return (
    <input
      type="date"
      {...props}
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
      className={`px-3 py-2 border rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white
       transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
    />
  );
};

export default DatePicker;
