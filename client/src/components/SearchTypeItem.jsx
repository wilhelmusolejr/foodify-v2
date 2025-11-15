import React from "react";

export default function SearchTypeItem({ type_name, onClick, searchType }) {
  let selectedClasses = "";

  if (searchType.toLowerCase() === type_name.toLowerCase()) {
    selectedClasses = "bg-[#f5f5f5] border-black/20";
  } else {
    selectedClasses = "border-transparent hover:border-black/50";
  }

  return (
    <div
      className={`py-5 px-10 md:w-fit flex items-center justify-center rounded-lg cursor-pointer border  ${selectedClasses}`}
      onClick={() => onClick(type_name.toLowerCase())}
    >
      <p>{type_name}</p>
    </div>
  );
}
