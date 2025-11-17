import React from "react";

import ChecklistItem from "@components/ChecklistItem";

export default function Tags({ className = "" }) {
  return (
    <div
      className={`px-10 min-h-[30vh] flex flex-wrap mx-auto justify-center items-center border rounded-lg border-black/10  bg-green-900 text-white ${className}`}
    >
      <div className="flex flex-col gap-2">
        {/* item */}
        <ChecklistItem name={"Vegetarian"} />
        <ChecklistItem name={"Popular"} />
        <ChecklistItem name={"Gluten Free"} />
        <ChecklistItem name={"Cheap"} />
      </div>
    </div>
  );
}
