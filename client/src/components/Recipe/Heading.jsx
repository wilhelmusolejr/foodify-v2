import React from "react";

export default function Heading({ name, step = "" }) {
  return (
    <div className="flex justify-between items-center mb-10 border-b-3 border-green-900 pb-3">
      <div className="">
        <h2 className="text-xl uppercase font-semibold">{name}</h2>
      </div>
      <div className="">
        <p className="text-lg">{step}</p>
      </div>
    </div>
  );
}
