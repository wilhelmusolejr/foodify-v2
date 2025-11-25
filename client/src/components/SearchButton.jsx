import React from "react";

export default function SearchButton({ onClick, className = "", isDisabled = false }) {
  return (
    <button
      className={`bg-black w-full md:w-fit  ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed opacity-70"
          : "bg-black hover:bg-gray-800 cursor-pointer"
      } text-white px-4 py-3 rounded-lg uppercase ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <p>Search</p>
    </button>
  );
}
