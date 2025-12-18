import React, { useState } from "react";

// Component
import ModalContainer from "../ModalContainer";
import { useModal } from "../../context/ModalContext";

// UTILS
import { getRandomApiKey } from "../../utils/apiUtils";

// LIBRARY
import axios from "axios";

export default function AddMealModal() {
  const { openModal, closeModal } = useModal();

  const STEPS = {
    SEARCH: "search",
    RESULTS: "results",
    SCHEDULE: "schedule",
  };

  //   ENV
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const FOOD_API = import.meta.env.VITE_FOOD_API;

  //   STATE
  const [step, setStep] = useState(STEPS.SEARCH);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  async function handleSearch() {
    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      try {
        setIsLoading(true);
        setStep("results");

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

  return (
    <ModalContainer>
      <div className="bg-white rounded-lg max-w-lg w-full flex flex-col max-h-[80vh]">
        {/* ---------- HEADER ---------- */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Search for meals to add</h2>
        </div>

        {/* ---------- BODY ---------- */}
        <div className="px-6 py-4 flex-1 overflow-y-auto  min-h-80">
          {/* 🔎 SEARCH STEP */}
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

          {/* ⏳ LOADING */}
          {step === "results" && isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 ">
              <div className="animate-spin mb-3">🍽️</div>
              <p className="text-sm">Searching recipes...</p>
            </div>
          )}

          {/* 📋 RESULTS */}
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

          {/* 📅 SCHEDULE STEP */}
          {step === "schedule" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Choose when to add this meal</p>

              {/* example schedule UI */}
              <div className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <label
                      key={day}
                      className="flex items-center justify-between border rounded px-3 py-2 cursor-pointer"
                    >
                      <span className="text-sm">{day}</span>
                      <div className="flex gap-3 text-sm">
                        <label>
                          <input type="checkbox" /> Breakfast
                        </label>
                        <label>
                          <input type="checkbox" /> Lunch
                        </label>
                        <label>
                          <input type="checkbox" /> Dinner
                        </label>
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="px-6 py-4 border-t flex justify-between items-center">
          {/* 🔎 SEARCH STEP */}
          {step === "search" && (
            <button
              onClick={() => {
                closeModal();
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          )}

          {/* 📋 RESULTS */}
          {step === "results" && !isLoading && (
            <div className="flex justify-between w-full">
              <button
                onClick={() => {
                  closeModal();
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>

              <button
                disabled={!selectedRecipeId || isLoading}
                onClick={() => setStep("schedule")}
                className={`px-5 py-2 rounded text-sm 
            ${selectedRecipeId ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              >
                Next
              </button>
            </div>
          )}

          {/* 📅 SCHEDULE STEP */}
          {step === "schedule" && (
            <div className="flex justify-between w-full">
              {/* back */}
              <button
                onClick={() => setStep("results")}
                className="text-sm text-gray-500 hover:text-gray-700 "
              >
                Back
              </button>

              {/* add */}
              <button className="px-5 py-2 bg-green-600 text-white rounded text-sm">
                Add to planner
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
