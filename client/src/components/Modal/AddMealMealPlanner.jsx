import React, { useState } from "react";

// Component
import ModalContainer from "../ModalContainer";
import { useModal } from "../../context/ModalContext";
import { useAuthStore } from "../../stores/useAuthStore";

// Library
import axios from "axios";
import { useMemo } from "react";

export default function AddMealMealPlanner({ recipeId = 0 }) {
  const { closeModal } = useModal();

  // STATE
  const [selectedISO, setSelectedISO] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ENV
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_MEAL_URL = `${BACKEND_URL}/api/mealplan`;

  // AUTH
  const token = useAuthStore.getState().token;

  // FUNCTION
  const weekSchedule = useMemo(() => getWeekSchedule(), []);

  function toggleMeal(meal) {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  }

  // HANDLER
  async function handleAddMeal() {
    if (isLoading || isSuccess) return;

    // Validation
    if (!selectedISO || selectedMeals.length === 0) {
      return;
    }

    try {
      setIsLoading(true);

      await sleep(5000);

      let formData = {
        date: selectedISO,
        mealTimes: selectedMeals,
        recipeId: recipeId,
      };

      const API_URL = `${BACKEND_MEAL_URL}/usermeal`;

      // const res = await axios.post(API_URL, formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log(res.data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);

      // closeModal();
    }
  }

  function handleClose() {
    setSelectedISO("");
    setSelectedMeals([]);
    setIsLoading(false);
    setIsSuccess(false);
    closeModal();
  }

  return (
    <ModalContainer>
      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg">
        {/* Header */}
        <h2 id="login-title" className="text-lg font-semibold mb-4">
          Add to Meal Planner
        </h2>

        <div className="min-h-56 relative border border-black/10 p-4 rounded-lg bg-gray-50">
          {/* LOADING STATE */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-lg z-10">
              <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mb-3" />
              <p className="text-sm text-gray-600">Adding to your meal planner…</p>
            </div>
          )}

          {/* SUCCESS STATE */}
          {isSuccess && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-4 rounded-lg z-20">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Added successfully 🎉</h3>
              <p className="text-sm text-green-700 text-center">
                This recipe is now part of your meal plan.
              </p>
            </div>
          )}

          {/* FORM CONTENT */}
          {!isSuccess && (
            <div className={isLoading ? "opacity-40 pointer-events-none" : ""}>
              {/* Select Day */}
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

              {/* Meal Type */}
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
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          {isSuccess ? (
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAddMeal}
                disabled={!selectedISO || selectedMeals.length === 0 || isLoading}
                className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 
                   disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding…" : "Add to Planner"}
              </button>
            </>
          )}
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
