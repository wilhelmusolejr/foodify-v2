import React from "react";

export default function NutritionFacts({ className }) {
  return (
    <div className={`px-7 py-10 bg-white rounded-lg border border-black/10 shadow-md ${className}`}>
      <div className="">
        <h2 className="text-2xl lg:text-3xl uppercase font-semibold">Nutrition facts</h2>
      </div>

      <ul className="mt-5 flex gap-5 flex-col">
        <li className="flex border-b border-black/10 justify-between text-lg lg:text-xl">
          <div className="">
            <p>Calories</p>
          </div>
          <div className="">
            <p>200 kcal</p>
          </div>
        </li>
        <li className="flex border-b border-black/10 justify-between text-lg lg:text-xl">
          <div className="">
            <p>Calories</p>
          </div>
          <div className="">
            <p>200 kcal</p>
          </div>
        </li>
        <li className="flex border-b border-black/10 justify-between text-lg lg:text-xl">
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
