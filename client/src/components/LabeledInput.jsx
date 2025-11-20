import React from "react";

export default function LabeledInput({ name, data, onChange, nutrientName }) {
  // Define the range
  const min = 1000;
  const max = 9999;

  // Generate the random integer
  const randomDigit = Math.floor(Math.random() * (max - min + 1)) + min;

  let type = name == "Minimum" ? 0 : 1;

  return (
    <div className="w-full flex items-center gap-5 justify-between">
      <label htmlFor={randomDigit}>{name}</label>
      <input
        type="number"
        id={randomDigit}
        placeholder="0"
        value={data}
        onChange={(e) => onChange(nutrientName, e.target.value, type)}
        className={`border w-30 border-black/50 rounded-lg px-4 py-3 text-right`}
      />
    </div>
  );
}
