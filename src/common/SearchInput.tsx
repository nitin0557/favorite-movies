import React, { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
  debounce?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onSearch,
  debounce = 300,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onSearch(inputValue);
      }
    }, debounce);

    return () => clearTimeout(handler); // cleanup on value change
  }, [inputValue, onSearch, debounce, value]);

  return (
    <input
      type="text"
      placeholder="Search by title or director"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="px-3 py-2 border rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white placeholder-gray-400
       transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchInput;
