import React from "react";

export default function NutritionFacts({ className }) {
  return (
    <div className={`px-7 py-10 bg-white rounded-lg border border-black/10 shadow-md ${className}`}>
      <div className="">
        <h2 className="text-xl uppercase font-semibold">Nutrition facts</h2>
      </div>

      <ul className="mt-5 flex gap-2 flex-col">
        <li className="flex mb-2 border-b border-black/10 justify-between">
          <div className="">
            <p>Calories</p>
          </div>
          <div className="">
            <p>200 kcal</p>
          </div>
        </li>
        <li className="flex mb-2 border-b border-black/10 justify-between">
          <div className="">
            <p>Calories</p>
          </div>
          <div className="">
            <p>200 kcal</p>
          </div>
        </li>
        <li className="flex mb-2 border-b border-black/10 justify-between">
          <div className="">
            <p>Calories</p>
          </div>
          <div className="">
            <p>200 kcal</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
