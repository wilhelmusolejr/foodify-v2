import React from "react";
import { faLemon, faSpoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MealTypeItem from "./MealTypeItem";

import img from "@/assets/foodinbowl.jpg";

export default function DateCardItem({ dayName, dateLabel, meals, onClick, isoDate, selectedISO }) {
  let totalMeal =
    meals.breakfast.length + meals.lunch.length + meals.dinner.length + meals.snacks.length;

  const todayISO = getLocalISO();
  let isToday = todayISO === isoDate;
  let isSelected = isoDate === selectedISO;

  return (
    <div
      onClick={() => {
        onClick(dateLabel);
      }}
      className={`min-w-52 md:min-w-60 min-h-72 flex flex-col rounded-2xl p-3 border shadow-sm hover:shadow-md transition-all cursor-pointer 
    ${isSelected ? "bg-green-50 border-green-400 shadow-md scale-[1.02]" : "bg-white border-gray-200"}
  `}
    >
      <p className="uppercase text-center pb-3 text-gray-400 text-sm">{isToday ? "today" : "."}</p>
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 uppercase">{dayName}</h2>
        <h3 className="text-sm text-gray-500">{dateLabel}</h3>
      </div>

      {isSelected ? (
        <>
          <div className="border p-3 rounded-lg border-black/5 shadow-md h-full flex flex-col bg-white">
            {totalMeal > 0 ? (
              <>
                <ul className="space-y-3 mb-4 ">
                  <MealTypeItem mealTypeName="Breakfast" mealNum={meals.breakfast.length} />
                  <MealTypeItem mealTypeName="Lunch" mealNum={meals.lunch.length} />
                  <MealTypeItem mealTypeName="Snacks" mealNum={meals.snacks.length} />
                  <MealTypeItem mealTypeName="Dinner" mealNum={meals.dinner.length} />
                </ul>

                {/* Total Recipes */}
                <div className="border-t border-black/10 pt-3 mb-4">
                  <p className="text-sm font-medium text-center text-green-600 uppercase">
                    {totalMeal} meals
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex flex-col items-center justify-center text-center ">
                  {/* img */}
                  <img src={img} alt="" className="w-10/12 mx-auto " />

                  {/* heading */}
                  <div className="">
                    <p className="text-sm font-semibold text-gray-700">No meals planned</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Add a recipe to this day to get started.
                    </p>
                  </div>
                </div>
              </>
            )}
            {/* button */}
            <div className="border border-black/10 text-center py-2 rounded-lg capitalize shadow-md bg-green-400 text-white">
              add meal
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`border p-3 rounded-lg border-black/5 shadow-md h-full flex flex-col ${totalMeal > 0 ? "bg-green-50" : ""}`}
          >
            {totalMeal > 0 ? (
              <>
                <ul className="space-y-3 mb-4 ">
                  <MealTypeItem mealTypeName="Breakfast" mealNum={meals.breakfast.length} />
                  <MealTypeItem mealTypeName="Lunch" mealNum={meals.lunch.length} />
                  <MealTypeItem mealTypeName="Snacks" mealNum={meals.snacks.length} />
                  <MealTypeItem mealTypeName="Dinner" mealNum={meals.dinner.length} />
                </ul>

                {/* Total Recipes */}
                <div className="border-t border-black/10 pt-3 mb-4">
                  <p className="text-sm font-medium text-center text-green-600 uppercase">
                    {totalMeal} meals
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-semibold text-gray-700">No meals planned</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Add a recipe to this day to get started.
                  </p>
                </div>
              </>
            )}
            {/* button */}
            <div className="border border-black/5 text-center py-2 rounded-lg capitalize shadow-md bg-white">
              add meal
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getLocalISO(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}
