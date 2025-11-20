import React from "react";

export default function SearchButton({ onClick, className = "" }) {
  return (
    <button
      className={`bg-black w-full md:w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase ${className}`}
      onClick={onClick}
    >
      <p>Search</p>
    </button>
  );
}
