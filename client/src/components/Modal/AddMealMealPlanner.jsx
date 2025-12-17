import React, { useState } from "react";

// Component
import ModalContainer from "../ModalContainer";
import { useModal } from "../../context/ModalContext";

export default function AddMealMealPlanner({ recipeId = 0 }) {
  const { openModal, closeModal } = useModal();

  const [selectedISO, setSelectedISO] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);

  const weekSchedule = getWeekSchedule(); // uses today

  function toggleMeal(meal) {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  }

  function handleAddMeal() {
    // Here you would typically send the selectedISO and selectedMeals to your backend or state management
    console.log(selectedISO);
    console.log(selectedMeals);
    console.log(recipeId);
    // closeModal();
  }

  return (
    <ModalContainer>
      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg">
        {/* Header */}
        <h2 id="login-title" className="text-lg font-semibold mb-4">
          Add to Meal Planner
        </h2>

        {/* Week Schedule */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-600 mb-2">Select a day</p>

          <div className="grid grid-cols-4 gap-2">
            {weekSchedule.map((day) => (
              <button
                key={day.iso}
                onClick={() => setSelectedISO(day.iso)}
                className={`px-3 py-2 rounded-lg text-sm border transition
                ${
                  selectedISO === day.iso
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="font-semibold uppercase">{day.short.split(" ")[0]}</div>
                <div className="text-xs">{day.short.split(" ")[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-2">Select meal type</p>

          <div className="grid grid-cols-2 gap-3">
            {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
              <label key={meal} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMeals.includes(meal)}
                  onChange={() => toggleMeal(meal)}
                  className="accent-green-600"
                />
                <span className="capitalize">{meal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleAddMeal}
            disabled={!selectedISO || selectedMeals.length === 0}
            className="px-4 py-2 rounded-lg text-sm bg-green-600 cursor-pointer text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Planner
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

/**
 * Return an array for the week (length = 7) that contains the given date (default = today).
 *
 * Each day object has the shape:
 * {
 *   date: "December 12",       // friendly
 *   iso: "2025-12-12",         // yyyy-mm-dd
 *   short: "Mon 12",           // short label
 *   day_type: "monday",        // lowercase weekday name
 *   meal: { breakfast: [{recipeId: 123}], [{recipeId: 123}], [{recipeId: 123}] }
 * }
 *
 * @param {Date|String|Number} [baseDate=new Date()] - date to compute week for
 * @param {"monday"|"sunday"} [weekStart="monday"] - week start day
 * @param {string} [locale="en-US"] - locale for month/weekday names
 * @returns {Array<Object>} 7-day array
 */
function getWeekSchedule(baseDate = new Date(), weekStart = "monday", locale = "en-PH") {
  const today = baseDate instanceof Date ? new Date(baseDate) : new Date(baseDate);

  // normalize time
  today.setHours(0, 0, 0, 0);

  // JS getDay(): 0 (Sun) ... 6 (Sat)
  const jsDay = today.getDay();

  // Determine how many days to subtract to get the week start
  const startOffset = weekStart === "sunday" ? jsDay : (jsDay + 6) % 7; // 0 for Monday when weekStart = monday

  const weekStartDate = new Date(today);
  weekStartDate.setDate(today.getDate() - startOffset);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(weekStartDate.getDate() + i);

    const monthName = d.toLocaleString(locale, { month: "long" }); // "December"
    const dayNumber = d.getDate(); // 1..31
    const weekdayFull = d.toLocaleString(locale, { weekday: "long" }); // "Monday"
    const weekdayShort = d.toLocaleString(locale, { weekday: "short" }); // "Mon"

    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

    return {
      date: `${monthName} ${dayNumber}`,
      iso,
      short: `${weekdayShort} ${dayNumber}`,
      day_type: weekdayFull.toLowerCase(),
      meal: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
    };
  });

  return days;
}

function getLocalISO(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}
