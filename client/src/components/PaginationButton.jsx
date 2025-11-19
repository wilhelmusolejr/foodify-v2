import React from "react";

export default function PaginationButton({
  text,
  pageNum,
  isDisabled = false,
  className = "",
  onClick,
}) {
  return (
    <button
      className={`min-w-10 h-10 border border-black rounded-lg cursor-pointer text-black ${className}`}
      disabled={isDisabled}
      onClick={() => {
        onClick(pageNum);
      }}
    >
      <p>{text}</p>
    </button>
  );
}
