import React from "react";

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-3 my-30">
      <button className="px-3 h-10 border border-black rounded-md bg-white">
        <p>Previous</p>
      </button>
      <button className="w-10 h-10 border border-black rounded-lg bg-black text-white">
        <p>1</p>
      </button>
      <button className="w-10 h-10 border border-black rounded-lg bg-white">
        <p>2</p>
      </button>
      <button className="px-3 h-10 border border-black rounded-lg bg-white">
        <p>Next</p>
      </button>
    </div>
  );
}
