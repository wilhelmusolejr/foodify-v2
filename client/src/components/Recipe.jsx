import React from "react";

export default function Recipe({ image, link, name }) {
  return (
    <>
      <div className="">
        <div class="bg-red-300 h-32 rounded-lg flex items-center justify-center"></div>
        <h2 className="capitalize mt-2 text-lg font-medium">{name}</h2>
      </div>
    </>
  );
}
