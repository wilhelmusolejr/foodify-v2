import React from "react";

export default function SearchTypeItem({ type_name, selected = false }) {
  let selectedClasses = "";
  if (selected) {
    selectedClasses = "border bg-[#f5f5f5] border-black/20";
  }

  return (
    <div
      className={`py-5 px-10 md:w-fit flex items-center justify-center rounded-lg cursor-pointer ${selectedClasses}`}
    >
      <p>{type_name}</p>
    </div>
  );
}
