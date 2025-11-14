import React from "react";

export default function LabeledInput({ name }) {
  return (
    <div className="w-full flex items-center gap-5 justify-between">
      <label htmlFor="aa">{name}</label>
      <input
        type="text"
        id="aa"
        placeholder="20"
        className={`border w-30 border-black/50 rounded-lg px-4 py-3`}
      />
    </div>
  );
}
