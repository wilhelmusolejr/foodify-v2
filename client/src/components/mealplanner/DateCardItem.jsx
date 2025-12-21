import React from "react";
import { faLemon, faSpoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MealTypeItem from "./MealTypeItem";

export default function DateCardItem({ dayName, dateLabel, meals, isToday, onClick }) {
  let totalMeal =
    meals.breakfast.length + meals.lunch.length + meals.dinner.length + meals.snacks.length;

  return (
    <div
      onClick={() => {
        onClick(dateLabel);
      }}
      className={`w-full min-w-52 min-h-72 flex flex-col rounded-2xl px-5 py-10 border shadow-sm hover:shadow-md transition-all cursor-pointer 
    ${isToday ? "bg-green-50 border-green-400 shadow-md scale-[1.02]" : "bg-white border-gray-200"}
  `}
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 uppercase">{dayName}</h2>
        <h3 className="text-sm text-gray-500">{dateLabel}</h3>
      </div>

      {totalMeal > 0 ? (
        <>
          <ul className="space-y-3 mb-4">
            <MealTypeItem mealTypeName="Breakfast" mealNum={meals.breakfast.length} />
            <MealTypeItem mealTypeName="Lunch" mealNum={meals.lunch.length} />
            <MealTypeItem mealTypeName="Snacks" mealNum={meals.snacks.length} />
            <MealTypeItem mealTypeName="Dinner" mealNum={meals.dinner.length} />
          </ul>

          {/* Total Recipes */}
          <div className="border-t pt-3">
            <p className="text-sm font-medium text-center text-green-600 uppercase">
              {totalMeal} meals
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col flex-1">
            {/* message */}
            <div className="text-center flex flex-col h-full items-center justify-center">
              <p className="text-sm font-semibold text-gray-700">No meals planned</p>
              <p className="text-xs text-gray-500 mt-1">Add a recipe to this day to get started.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
