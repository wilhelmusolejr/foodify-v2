import React from "react";

export default function Feedback({ className = "" }) {
  return (
    <div
      className={`min-h-[30vh] px-10  bg-green-900 rounded-lg text-white flex justify-center items-center ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Have your tried this recipe?</h2>
        <p>Mention @budgetbytes or tag #budgetbytes on Instagram!</p>
      </div>
    </div>
  );
}
