import React, { useState } from "react";
import AnimatedSelector from "./Components/AnimatedSelector";

export default function Selectors() {
  const [value, setValue] = useState(null);
  const selectorsValues = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
  ];
  return (
    <div>
      <AnimatedSelector
        options={selectorsValues}
        placeholder="Select an option"
        value={value}
        onChange={setValue}
        classNameInput="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
