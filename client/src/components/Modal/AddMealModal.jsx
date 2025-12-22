import React, { useMemo, useState } from "react";

// Component
import ModalContainer from "../ModalContainer";
import { useModal } from "../../context/ModalContext";

// UTILS
import { getRandomApiKey } from "../../utils/apiUtils";
import { useAuthStore } from "../../stores/useAuthStore";
import { ENV } from "@/config/env";

// LIBRARY
import axios from "axios";

export default function AddMealModal() {
  const { closeModal } = useModal();

  const STEPS = {
    SEARCH: "search",
    RESULTS: "results",
    SCHEDULE: "schedule",
    FINISH: "done",
  };

  //   ENV
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const FOOD_API = import.meta.env.VITE_FOOD_API;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_MEAL_URL = `${BACKEND_URL}/api/mealplan`;

  //   STATE
  const [step, setStep] = useState(STEPS.SEARCH);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedISO, setSelectedISO] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // AUTH
  const token = useAuthStore.getState().token;
  const user = useAuthStore.getState().user;

  //   HANDLE
  async function handleSearch() {
    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      try {
        setIsLoading(true);
        setStep(STEPS.RESULTS);

        const apiKey = getRandomApiKey();
        const apiUrl = `${FOOD_API}/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

        // setIsLoading(true);
        // setError(null);

        // 1. Axios handles the request
        const res = await axios.get(apiUrl);

        console.log(res.data);

        // 2. Axios data is automatically parsed as JSON
        setResults(res.data.results);
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);
        console.log(attempt === MAX_TRY);
        console.log(attempt, MAX_TRY);

        // if (attempt === MAX_TRY) {
        //   // last attempt – fallback
        //   const localRecipes = Array.from({ length: 8 }, () => ({
        //     ...offlineRecipeData,
        //   }));

        //   toast.error("Showing offline data. API LIMIT");

        //   let tempRecipe = {
        //     recipes: localRecipes,
        //     totalResults: localRecipes.length,
        //     pageLimit: Math.ceil(localRecipes.length / 10),
        //   };

        //   console.log(tempRecipe);

        //   setSearchResults(tempRecipe);
        //   return;
        // }

        // if reached 50 points
        // setError(error.response ? error.response.data.message : error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function toggleMeal(meal) {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  }

  function handleClose() {
    closeModal();
  }

  async function handleAddMeal() {
    // Validation
    if (!selectedISO || selectedMeals.length === 0 || isLoading) {
      return;
    }

    // LOCAL
    // ------------------------------
    if (ENV.isDemoMode) {
      let formData = {
        userId: user.id,
        date: selectedISO,
        mealTimes: selectedMeals,
        recipeId: selectedRecipeId,
      };
      addLocalMeal(formData);
      return;
    }

    // BACKEND
    // ------------------------------
    try {
      setIsLoading(true);

      let formData = {
        date: selectedISO,
        mealTimes: selectedMeals,
        recipeId: selectedRecipeId,
      };

      const API_URL = `${BACKEND_MEAL_URL}/usermeal`;

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsSuccess(true);
      setStep(STEPS.FINISH);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const weekSchedule = useMemo(() => getWeekSchedule(), []);
  const canSubmit = selectedISO && selectedMeals.length > 0;

  return (
    <ModalContainer>
      <div className="bg-white w-10/12 rounded-lg max-w-lg flex flex-col max-h-[80vh]">
        {/* ---------- HEADER ---------- */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Search for meals to add</h2>
        </div>

        {/* ---------- BODY ---------- */}
        <div className="px-6 py-4 flex-1 overflow-y-auto min-h-80 relative">
          {/*  SEARCH STEP */}
          {step === "search" && (
            <div className="space-y-4 h-full">
              <p className="text-sm text-gray-600">
                Search for recipes and add them to your meal planner.
              </p>

              <div className="flex gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/*  LOADING */}
          {step === "results" && isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-gray-500 ">
              <div className="animate-spin mb-3">🍽️</div>
              <p className="text-sm">Searching recipes...</p>
            </div>
          )}

          {/*  RESULTS */}
          {step === "results" && !isLoading && (
            <div className="space-y-4 ">
              <p className="text-sm text-gray-600">Select a recipe to add</p>

              <ul className="space-y-3 max-h-80 overflow-y-auto pe-2">
                {results.map((recipe) => (
                  <li
                    key={recipe.id}
                    className={`border rounded p-3 flex items-center gap-3 cursor-pointer
                  ${selectedRecipeId === recipe.id ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setSelectedRecipeId(recipe.id)}
                  >
                    <input type="radio" checked={selectedRecipeId === recipe.id} readOnly />
                    <span className="text-sm font-medium">{recipe.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/*  SCHEDULE STEP */}
          {step === "schedule" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Choose when to add this meal</p>

              {/* example schedule UI */}
              <div className={isLoading ? "opacity-40 pointer-events-none" : ""}>
                {/* Select Day */}
                <div className="mb-5">
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
            </div>
          )}

          {/*  SUCCESS */}
          {step === "done" && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-4 rounded-lg z-20">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Added successfully 🎉</h3>
              <p className="text-sm text-green-700 text-center">
                This recipe is now part of your meal plan.
              </p>
            </div>
          )}
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="px-6 py-4 border-t flex justify-between items-center">
          {/*  SEARCH STEP */}
          {(step === "search" || step === "done" || step === "results") && (
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          )}

          {/*  RESULTS */}
          {step === "results" && !isLoading && (
            <div className="flex justify-between w-full">
              <button onClick={handleClose} className="text-sm text-gray-500 hover:text-gray-700">
                Close
              </button>

              <button
                disabled={!selectedRecipeId || isLoading}
                onClick={() => setStep(STEPS.SCHEDULE)}
                className={`px-5 py-2 rounded text-sm 
            ${selectedRecipeId ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              >
                Next
              </button>
            </div>
          )}

          {/*  SCHEDULE STEP */}
          {step === "schedule" && (
            <div className="flex justify-between w-full">
              {/* back */}
              <button
                onClick={() => setStep(STEPS.RESULTS)}
                className="text-sm text-gray-500 hover:text-gray-700 "
              >
                Back
              </button>

              {/* add */}
              <button
                onClick={handleAddMeal}
                disabled={!canSubmit}
                className={`px-5 py-2 rounded text-sm transition
        ${
          canSubmit
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
              >
                Add to planner
              </button>
            </div>
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

function getLocalMealplans(userId) {
  return JSON.parse(localStorage.getItem(`mealplans:${userId}`)) || {};
}

function saveLocalMealplans(userId, data) {
  localStorage.setItem(`mealplans:${userId}`, JSON.stringify(data));
}

function addLocalMeal({ userId, date, mealTimes, recipeId }) {
  const plans = getLocalMealplans(userId);

  if (!plans[date]) {
    plans[date] = {
      date,
      meal: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      },
    };
  }

  mealTimes.forEach((mealTime) => {
    const exists = plans[date].meal[mealTime].some((item) => item.recipeId === recipeId);

    if (!exists) {
      plans[date].meal[mealTime].push({ recipeId });
    }
  });

  saveLocalMealplans(userId, plans);
}
