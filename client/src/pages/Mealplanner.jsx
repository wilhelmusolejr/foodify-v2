import { useParams } from "react-router-dom";
import React, { use, useEffect, useMemo, useState } from "react";

// COMPONENTS
import Navigator from "@components/Navigator";
import DateCardItem from "../components/mealplanner/DateCardItem";
import Footer from "@components/Footer";
import RecipeItem from "@components/RecipeItem";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";

import { getRandomApiKey } from "../utils/apiUtils";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddMealModal from "../components/Modal/AddMealModal";
import { useModal } from "../context/ModalContext";

let nutrients = [
  {
    name: "Calories",
    amount: 478.32,
    unit: "kcal",
    percentOfDailyNeeds: 23.92,
  },
  {
    name: "Fat",
    amount: 34.31,
    unit: "g",
    percentOfDailyNeeds: 52.78,
  },
  {
    name: "Saturated Fat",
    amount: 3.89,
    unit: "g",
    percentOfDailyNeeds: 24.3,
  },
  {
    name: "Carbohydrates",
    amount: 12.57,
    unit: "g",
    percentOfDailyNeeds: 4.19,
  },
  {
    name: "Net Carbohydrates",
    amount: 9.36,
    unit: "g",
    percentOfDailyNeeds: 3.4,
  },
  {
    name: "Sugar",
    amount: 5.12,
    unit: "g",
    percentOfDailyNeeds: 5.69,
  },
  {
    name: "Cholesterol",
    amount: 72.32,
    unit: "mg",
    percentOfDailyNeeds: 24.11,
  },
  {
    name: "Sodium",
    amount: 940.04,
    unit: "mg",
    percentOfDailyNeeds: 40.87,
  },
  {
    name: "Alcohol",
    amount: 0,
    unit: "g",
    percentOfDailyNeeds: 100,
  },
  {
    name: "Alcohol %",
    amount: 0,
    unit: "%",
    percentOfDailyNeeds: 100,
  },
  {
    name: "Protein",
    amount: 32.66,
    unit: "g",
    percentOfDailyNeeds: 65.32,
  },
  {
    name: "Vitamin C",
    amount: 131.81,
    unit: "mg",
    percentOfDailyNeeds: 159.77,
  },
  {
    name: "Vitamin B3",
    amount: 16.03,
    unit: "mg",
    percentOfDailyNeeds: 80.13,
  },
  {
    name: "Vitamin B6",
    amount: 1.37,
    unit: "mg",
    percentOfDailyNeeds: 68.53,
  },
  {
    name: "Selenium",
    amount: 39.61,
    unit: "µg",
    percentOfDailyNeeds: 56.58,
  },
  {
    name: "Phosphorus",
    amount: 361.79,
    unit: "mg",
    percentOfDailyNeeds: 36.18,
  },
  {
    name: "Manganese",
    amount: 0.67,
    unit: "mg",
    percentOfDailyNeeds: 33.59,
  },
  {
    name: "Vitamin K",
    amount: 34.24,
    unit: "µg",
    percentOfDailyNeeds: 32.61,
  },
  {
    name: "Vitamin E",
    amount: 4,
    unit: "mg",
    percentOfDailyNeeds: 26.66,
  },
  {
    name: "Potassium",
    amount: 897.47,
    unit: "mg",
    percentOfDailyNeeds: 25.64,
  },
  {
    name: "Magnesium",
    amount: 88.76,
    unit: "mg",
    percentOfDailyNeeds: 22.19,
  },
  {
    name: "Vitamin B5",
    amount: 2.1,
    unit: "mg",
    percentOfDailyNeeds: 20.98,
  },
  {
    name: "Vitamin A",
    amount: 950.52,
    unit: "IU",
    percentOfDailyNeeds: 19.01,
  },
  {
    name: "Copper",
    amount: 0.32,
    unit: "mg",
    percentOfDailyNeeds: 16.22,
  },
  {
    name: "Vitamin B2",
    amount: 0.26,
    unit: "mg",
    percentOfDailyNeeds: 15.14,
  },
  {
    name: "Vitamin B1",
    amount: 0.2,
    unit: "mg",
    percentOfDailyNeeds: 13.59,
  },
  {
    name: "Folate",
    amount: 53.97,
    unit: "µg",
    percentOfDailyNeeds: 13.49,
  },
  {
    name: "Fiber",
    amount: 3.21,
    unit: "g",
    percentOfDailyNeeds: 12.83,
  },
  {
    name: "Iron",
    amount: 2.07,
    unit: "mg",
    percentOfDailyNeeds: 11.53,
  },
  {
    name: "Zinc",
    amount: 1.34,
    unit: "mg",
    percentOfDailyNeeds: 8.96,
  },
  {
    name: "Calcium",
    amount: 50.45,
    unit: "mg",
    percentOfDailyNeeds: 5.04,
  },
  {
    name: "Vitamin B12",
    amount: 0.23,
    unit: "µg",
    percentOfDailyNeeds: 3.88,
  },
];

export default function Mealplanner() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { modalType, openModal } = useModal();

  // ENV
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_MEAL_URL = `${BACKEND_URL}/api/mealplan`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

  // STATE
  const [toggleAction, setToggleAction] = useState(false);

  // AUTH
  const token = useAuthStore.getState().token;

  // clean up
  const todayISO = getLocalISO();

  const [selectedISO, setSelectedISO] = useState(todayISO);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState([]);
  const [meal, setMeal] = useState({});
  const [isMealReady, setIsMealReady] = useState(false);
  const [listId, setListId] = useState([]);
  const [toModify, setToModify] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  function changeSelectedDate(iso) {
    setSelectedISO(iso);
  }
  // -----------------------------------------------------
  // return array of objects for all the days in the selected week
  // -----------------------------------------------------
  const fetchUserMealSchedule = async ({ queryKey, signal }) => {
    console.log("Fetching user meal schedule...");

    const [, selectedISO] = queryKey; // date, not userId

    const API_URL = `${BACKEND_MEAL_URL}/usermeal`;

    const res = await axios.get(API_URL, {
      params: selectedISO ? { date: selectedISO } : {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    return res.data.data;
  };
  const {
    data: userMealSchedule = [],
    isLoading: userMealLoading,
    error: userMealError,
  } = useQuery({
    queryKey: ["user-meal-schedule"],
    queryFn: fetchUserMealSchedule,
    enabled: !!selectedISO,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // -----------------------------------------------------
  // derive selected date data
  // -----------------------------------------------------
  useEffect(() => {
    const data = userMealSchedule.find((day) => day.iso === selectedISO);
    setSelectedDateData(data);
  }, [selectedISO, userMealSchedule]);

  useEffect(() => {
    // get recipe ids in the data
    let todayRecipesId = [];

    for (const mealType in selectedDateData?.meal) {
      let mealData = selectedDateData.meal[mealType];
      if (mealData.length > 0) {
        for (let meal in mealData) {
          let recipe_id = mealData[meal].recipeId;
          let isRecipeExist = todayRecipesId.includes(recipe_id);
          if (!isRecipeExist) {
            todayRecipesId.push(mealData[meal].recipeId);
          }
        }
      }
    }

    setSelectedMealId(todayRecipesId);
  }, [selectedDateData]);

  // Fetch recipe
  const fetchRecipe = async ({ queryKey, signal }) => {
    const [, idsString] = queryKey;

    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      try {
        const apiKey = getRandomApiKey();

        const apiUrl = `${FOOD_API}/recipes/informationBulk?ids=${idsString.join(",")}&apiKey=${apiKey}`;

        const res = await axios.get(apiUrl, { signal });

        console.log(res.data);

        return res.data;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === MAX_TRY) {
          const localRecipes = Array.from({ length: userBookmarks.length }, () => ({
            ...offlineRecipeData,
          }));

          toast.error("Showing offline data. API LIMIT");

          return localRecipes;
        }
      }
    }
  };
  const {
    data: recipeData = [],
    isLoading: recipesLoading,
    error: recipesError,
    isSuccess: recipesSuccess,
  } = useQuery({
    queryKey: ["recipes", selectedMealId],
    queryFn: fetchRecipe,
    enabled: selectedMealId.length > 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const enrichedSelectedDateData = useMemo(() => {
    if (!selectedDateData || recipeData.length === 0) return selectedDateData;

    const enrichedMeal = {};

    for (const mealType in selectedDateData.meal) {
      enrichedMeal[mealType] = selectedDateData.meal[mealType].map((mealItem) => ({
        ...mealItem,
        details: recipeData.find((recipe) => recipe.id === mealItem.recipeId) || null,
      }));
    }

    return {
      ...selectedDateData,
      meal: enrichedMeal,
    };
  }, [selectedDateData, recipeData]);

  function handleModifyClick(bool) {
    setToModify(bool);
  }

  async function handleDeleteClick() {
    if (listId.length === 0) {
      toast.error("No meals selected to delete");
      return;
    }

    let formData = {
      date: selectedISO,
      items: listId,
    };

    console.log(formData);

    try {
      const res = await axios.delete(`${BACKEND_MEAL_URL}/usermeal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });

      // let res = { data: { success: true } };

      if (res.data.success) {
        toast.success("Deleted successfully");

        setSelectedMealId([]);
        setToModify(false);

        // 🔥 THIS is the key line
        queryClient.invalidateQueries({
          queryKey: ["user-meal-schedule"],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete meal");
    }
  }

  useEffect(() => {
    console.log("Selected list ids:", listId);
  }, [listId]);

  console.log(selectedISO);

  return (
    <>
      <Navigator />

      <Toaster position="top-center" reverseOrder={false} />

      <div className="mt-40">
        <div className="w-10/12 mx-auto">
          {/* schedule */}
          <div className="flex gap-5 overflow-x-auto py-5">
            {userMealSchedule.map((item, idx) => (
              <DateCardItem
                key={item.iso} // prefer stable key
                dayName={item.day_type}
                dateLabel={item.date}
                meals={item.meal}
                isToday={item.iso === selectedISO}
                onClick={() => {
                  changeSelectedDate(item.iso);
                }}
              />
            ))}
          </div>

          <div className="my-30 flex gap-10 justify-between mx-auto">
            {/* side 1 */}
            <div className="lg:w-8/12 w-full">
              {/* heading */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-medium capitalize ">Today's meal</h2>
                <div className="lg:hidden">
                  <button
                    onClick={() => setToggleAction((prev) => !prev)}
                    className="border px-2 py-1 rounded-lg"
                  >
                    ACTION
                  </button>
                </div>
              </div>

              {/* button */}
              {toggleAction && (
                // BUTTON
                <div className="flex justify-end lg:hidden">
                  <div className="mb-10 flex flex-col gap-2 w-full md:w-6/12">
                    {/* item */}
                    <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                      <p>Generate shopping list weekly</p>
                    </div>

                    {/* item */}
                    <div
                      onClick={() => {
                        openModal("meal-planner");
                      }}
                      className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                    >
                      <p>Add meal</p>
                    </div>

                    {!toModify ? (
                      <>
                        {/* item */}
                        <div
                          className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                          onClick={() => handleModifyClick(true)}
                        >
                          <p>Modify</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* item */}
                        <div
                          className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                          onClick={handleDeleteClick}
                        >
                          <p>Delete</p>
                        </div>
                      </>
                    )}

                    {/* item */}
                    {toModify && (
                      <div
                        className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                        onClick={() => handleModifyClick(false)}
                      >
                        <p>Cancel</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {userMealLoading ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="animate-pulse rounded-xl border bg-white shadow-sm overflow-hidden"
                      >
                        {/* Image placeholder */}
                        <div className="h-40 bg-gray-200" />

                        {/* Text placeholder */}
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {selectedMealId.length === 0 ? (
                    <>
                      <li className="flex flex-col items-center justify-center py-20 border border-dashed rounded-xl text-center">
                        <div className="text-5xl mb-4">🍽️</div>

                        <h3 className="text-xl font-semibold text-gray-800">
                          No meals planned for today
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 max-w-sm">
                          You haven’t added any meals yet. Start planning your day by adding a
                          recipe for breakfast, lunch, or dinner.
                        </p>

                        <button
                          className="mt-6 px-6 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                          onClick={() => {
                            openModal("meal-planner");
                          }}
                        >
                          + Add meal
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      {recipesLoading ? (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, idx) => (
                              <div
                                key={idx}
                                className="animate-pulse rounded-xl border bg-white shadow-sm overflow-hidden"
                              >
                                {/* Image placeholder */}
                                <div className="h-40 bg-gray-200" />

                                {/* Text placeholder */}
                                <div className="p-4 space-y-3">
                                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <ul className="flex flex-col gap-10">
                            {/* Breakfast */}
                            {enrichedSelectedDateData.meal.breakfast.length > 0 && (
                              <li>
                                <h2 className="text-xl mb-4">Breakfast</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {enrichedSelectedDateData.meal.breakfast.map((item, idx) => (
                                    <div key={idx}>
                                      {item?.details?.id && (
                                        <RecipeItem
                                          key={item?.details?.id}
                                          image_name={item?.details?.image}
                                          id={item?.details?.id}
                                          name={item?.details?.title}
                                          setListId={setListId}
                                          toModify={toModify}
                                          mealTime={"breakfast"}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </li>
                            )}

                            {/* Lunch */}
                            {enrichedSelectedDateData.meal.lunch.length > 0 && (
                              <li>
                                <h2 className="text-xl mb-4">Lunch</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {enrichedSelectedDateData.meal.lunch.map((item, idx) => (
                                    <div key={idx}>
                                      {item?.details?.id && (
                                        <RecipeItem
                                          key={item?.details?.id}
                                          image_name={item?.details?.image}
                                          id={item?.details?.id}
                                          name={item?.details?.title}
                                          setListId={setListId}
                                          toModify={toModify}
                                          mealTime={"lunch"}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </li>
                            )}

                            {/* Snacks */}
                            {enrichedSelectedDateData.meal.snacks.length > 0 && (
                              <li>
                                <h2 className="text-xl mb-4">Snacks</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {enrichedSelectedDateData.meal.snacks.map((item, idx) => (
                                    <div key={idx}>
                                      {item?.details?.id && (
                                        <RecipeItem
                                          key={item?.details?.id}
                                          image_name={item?.details?.image}
                                          id={item?.details?.id}
                                          name={item?.details?.title}
                                          setListId={setListId}
                                          toModify={toModify}
                                          mealTime={"snacks"}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </li>
                            )}

                            {/* Dinner */}
                            {enrichedSelectedDateData.meal.dinner.length > 0 && (
                              <li>
                                <h2 className="text-xl mb-4">Dinner</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {enrichedSelectedDateData.meal.dinner.map((item, idx) => (
                                    <div key={idx}>
                                      {item?.details?.id && (
                                        <RecipeItem
                                          key={item?.details?.id}
                                          image_name={item?.details?.image}
                                          id={item?.details?.id}
                                          name={item?.details?.title}
                                          setListId={setListId}
                                          toModify={toModify}
                                          mealTime={"dinner"}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* side 2 */}
            <div className="flex-1 max-w-[400px] hidden lg:block">
              {/* button */}
              <div className="mb-10 flex flex-col gap-2">
                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                  <p>Generate shopping list weekly</p>
                </div>

                {/* item */}
                <div
                  onClick={() => {
                    openModal("meal-planner");
                  }}
                  className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                >
                  <p>Add meal</p>
                </div>

                {!toModify ? (
                  <>
                    {/* item */}
                    <div
                      className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                      onClick={() => handleModifyClick(true)}
                    >
                      <p>Modify</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* item */}
                    <div
                      className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                      onClick={handleDeleteClick}
                    >
                      <p>Delete</p>
                    </div>
                  </>
                )}

                {/* item */}
                {toModify && (
                  <div
                    className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer"
                    onClick={() => handleModifyClick(false)}
                  >
                    <p>Cancel</p>
                  </div>
                )}
              </div>

              {/* nutrition  */}
              <div className="px-7 hidden py-10 bg-white rounded-lg border border-black/10 shadow-md">
                {/* headig */}
                <div className="">
                  <h2 className="text-2xl lg:text-3xl uppercase font-semibold">Nutrition facts</h2>
                </div>

                {/* list */}

                <ul className="mt-5 flex gap-5 flex-col max-h-[500px] overflow-auto pe-3">
                  {/* Mapping over the nutrients array */}
                  {nutrients.map((item, index) => (
                    // The key must be on the outermost repeating element (the <li>)
                    <li
                      key={index} // Using index as a key is okay here since the list order is static
                      className="flex border-b border-black/10 justify-between text-lg lg:text-xl pb-2"
                    >
                      {/* Nutrient Name */}
                      <div className=" text-gray-700">
                        <p>{item.name}</p>
                      </div>

                      {/* Nutrient Amount and Unit */}
                      <div className=" text-gray-900">
                        <p>
                          {/* Display amount, rounded to 1 decimal place, followed by the unit */}
                          {item.amount.toFixed(1)} {item.unit}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      {modalType === "meal-planner" && <AddMealModal />}

      <Footer />
    </>
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
