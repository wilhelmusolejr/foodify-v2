import { useParams } from "react-router-dom";
import React, { use, useEffect, useMemo, useState } from "react";

// COMPONENTS
import Navigator from "@components/Navigator";
import DateCardItem from "../components/mealplanner/DateCardItem";
import Footer from "@components/Footer";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";

import { getRandomApiKey } from "../utils/apiUtils";

import axios from "axios";
import RecipeItem from "@components/RecipeItem";

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

  // ENV
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_MEAL_URL = `${BACKEND_URL}/api/mealplan`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

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

  function changeSelectedDate(iso) {
    setSelectedISO(iso);
  }

  // return array of objects for all the days in the selected week
  const fetchUserMealSchedule = async ({ queryKey, signal }) => {
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
    retry: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // derive selected date data
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

    return [
      {
        id: 525252,
        image: "https://img.spoonacular.com/recipes/635215-556x370.jpg",
        imageType: "jpg",
        title: "Blackberry Honey Cocktail",
        readyInMinutes: 45,
        servings: 1,
        sourceUrl: "https://www.foodista.com/recipe/8H7JXHJ8/jaime-molido-cocktail",
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        veryHealthy: false,
        cheap: false,
        veryPopular: false,
        sustainable: false,
        lowFodmap: false,
        weightWatcherSmartPoints: 8,
        gaps: "no",
        preparationMinutes: null,
        cookingMinutes: null,
        aggregateLikes: 4,
        healthScore: 0,
        creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
        license: "CC BY 3.0",
        sourceName: "Foodista",
        pricePerServing: 203.08,
        extendedIngredients: [
          {
            id: 19296,
            aisle: "Nut butters, Jams, and Honey",
            image: "honey.png",
            consistency: "LIQUID",
            name: "home made clover honey syrup",
            nameClean: "home made clover honey syrup",
            original: "3/4 ounce Home Made Clover Honey Syrup (2 parts 100% pure Clover Honey",
            originalName: "Home Made Clover Honey Syrup (2 parts 100% pure Clover Honey",
            amount: 0.75,
            unit: "ounce",
            meta: ["100%", "pure"],
            measures: {
              us: {
                amount: 0.75,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 21.262,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 14051,
            aisle: "Alcoholic Beverages",
            image: "vodka.jpg",
            consistency: "LIQUID",
            name: "honey vodka",
            nameClean: "honey vodka",
            original: "2 ounces Honey Vodka",
            originalName: "Honey Vodka",
            amount: 2,
            unit: "ounces",
            meta: [],
            measures: {
              us: {
                amount: 2,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 56.699,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 9042,
            aisle: "Produce",
            image: "blackberries.jpg",
            consistency: "SOLID",
            name: "blackberries",
            nameClean: "blackberries",
            original: "3 Fresh Blackberries",
            originalName: "Fresh Blackberries",
            amount: 3,
            unit: "",
            meta: ["fresh"],
            measures: {
              us: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
              metric: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
            },
          },
          {
            id: 9152,
            aisle: "Produce",
            image: "lemon-juice.jpg",
            consistency: "LIQUID",
            name: "lemon juice",
            nameClean: "lemon juice",
            original: "3/4 ounce Freshly squeezed lemon juice",
            originalName: "Freshly squeezed lemon juice",
            amount: 0.75,
            unit: "ounce",
            meta: ["freshly squeezed"],
            measures: {
              us: {
                amount: 0.75,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 21.262,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 10419297,
            aisle: "Nut butters, Jams, and Honey",
            image: "blackberry-jam.png",
            consistency: "SOLID",
            name: "garnish: blackberry jam",
            nameClean: "garnish: blackberry jam",
            original: "Garnish: Blackberry jam (3 blackberries & ½ oz. 100% pure honey)",
            originalName: "Garnish: Blackberry jam blackberries & ½ oz. 100% pure honey)",
            amount: 3,
            unit: "",
            meta: ["100%", "pure"],
            measures: {
              us: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
              metric: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
            },
          },
        ],
        summary:
          'Blackberry Honey Cocktail is a beverage that serves 1. Watching your figure? This gluten free, dairy free, and lacto ovo vegetarian recipe has <b>211 calories</b>, <b>0g of protein</b>, and <b>0g of fat</b> per serving. For <b>$2.03 per serving</b>, this recipe <b>covers 1%</b> of your daily requirements of vitamins and minerals. Only a few people made this recipe, and 4 would say it hit the spot. Head to the store and pick up garnish: blackberry jam, honey vodka, blackberries, and a few other things to make it today. It is brought to you by Foodista. From preparation to the plate, this recipe takes about <b>45 minutes</b>. Overall, this recipe earns a <b>very bad (but still fixable) spoonacular score of 8%</b>. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/bride-of-frankenstein-cocktail-vanilla-blackberry-champagne-cocktail-617718">Bride of Frankenstein Cocktail – Vanilla Blackberry Champagne Cocktail</a>, <a href="https://spoonacular.com/recipes/blackberry-cocktail-50694">Blackberry Cocktail</a>, and <a href="https://spoonacular.com/recipes/blackberry-champagne-cocktail-50511">Blackberry Champagne Cocktail</a>.',
        cuisines: [],
        dishTypes: ["beverage", "drink"],
        diets: ["gluten free", "dairy free", "lacto ovo vegetarian"],
        occasions: [],
        winePairing: {
          pairedWines: [],
          pairingText: "",
          productMatches: [],
        },
        instructions:
          "In a pint glass add all spirits and mixers, add ice and shake vigorously for 6 seconds.\nStrain in a Collins glass filled half way with cubed ice.\nTop off with crushed ice. Then crown with hand made jam.",
        analyzedInstructions: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step: "In a pint glass add all spirits and mixers, add ice and shake vigorously for 6 seconds.",
                ingredients: [
                  {
                    id: 10814037,
                    name: "liquor",
                    localizedName: "liquor",
                    image: "rum-dark.jpg",
                  },
                  {
                    id: 0,
                    name: "shake",
                    localizedName: "shake",
                    image: "",
                  },
                  {
                    id: 10014412,
                    name: "ice",
                    localizedName: "ice",
                    image: "ice-cubes.png",
                  },
                ],
                equipment: [],
              },
              {
                number: 2,
                step: "Strain in a Collins glass filled half way with cubed ice.",
                ingredients: [
                  {
                    id: 10014412,
                    name: "ice",
                    localizedName: "ice",
                    image: "ice-cubes.png",
                  },
                ],
                equipment: [],
              },
              {
                number: 3,
                step: "Top off with crushed ice. Then crown with hand made jam.",
                ingredients: [
                  {
                    id: 10114412,
                    name: "crushed ice cubes",
                    localizedName: "crushed ice cubes",
                    image: "crushed-ice.png",
                  },
                  {
                    id: 19297,
                    name: "jam",
                    localizedName: "jam",
                    image: "strawberry-jam.png",
                  },
                ],
                equipment: [],
              },
            ],
          },
        ],
        originalId: null,
        spoonacularScore: 20.085859298706055,
        spoonacularSourceUrl: "https://spoonacular.com/blackberry-honey-cocktail-635215",
      },
      {
        id: 794979,
        image: "https://img.spoonacular.com/recipes/635215-556x370.jpg",
        imageType: "jpg",
        title: "dadada",
        readyInMinutes: 45,
        servings: 1,
        sourceUrl: "https://www.foodista.com/recipe/8H7JXHJ8/jaime-molido-cocktail",
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        veryHealthy: false,
        cheap: false,
        veryPopular: false,
        sustainable: false,
        lowFodmap: false,
        weightWatcherSmartPoints: 8,
        gaps: "no",
        preparationMinutes: null,
        cookingMinutes: null,
        aggregateLikes: 4,
        healthScore: 0,
        creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
        license: "CC BY 3.0",
        sourceName: "Foodista",
        pricePerServing: 203.08,
        extendedIngredients: [
          {
            id: 19296,
            aisle: "Nut butters, Jams, and Honey",
            image: "honey.png",
            consistency: "LIQUID",
            name: "home made clover honey syrup",
            nameClean: "home made clover honey syrup",
            original: "3/4 ounce Home Made Clover Honey Syrup (2 parts 100% pure Clover Honey",
            originalName: "Home Made Clover Honey Syrup (2 parts 100% pure Clover Honey",
            amount: 0.75,
            unit: "ounce",
            meta: ["100%", "pure"],
            measures: {
              us: {
                amount: 0.75,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 21.262,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 14051,
            aisle: "Alcoholic Beverages",
            image: "vodka.jpg",
            consistency: "LIQUID",
            name: "honey vodka",
            nameClean: "honey vodka",
            original: "2 ounces Honey Vodka",
            originalName: "Honey Vodka",
            amount: 2,
            unit: "ounces",
            meta: [],
            measures: {
              us: {
                amount: 2,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 56.699,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 9042,
            aisle: "Produce",
            image: "blackberries.jpg",
            consistency: "SOLID",
            name: "blackberries",
            nameClean: "blackberries",
            original: "3 Fresh Blackberries",
            originalName: "Fresh Blackberries",
            amount: 3,
            unit: "",
            meta: ["fresh"],
            measures: {
              us: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
              metric: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
            },
          },
          {
            id: 9152,
            aisle: "Produce",
            image: "lemon-juice.jpg",
            consistency: "LIQUID",
            name: "lemon juice",
            nameClean: "lemon juice",
            original: "3/4 ounce Freshly squeezed lemon juice",
            originalName: "Freshly squeezed lemon juice",
            amount: 0.75,
            unit: "ounce",
            meta: ["freshly squeezed"],
            measures: {
              us: {
                amount: 0.75,
                unitShort: "oz",
                unitLong: "ounces",
              },
              metric: {
                amount: 21.262,
                unitShort: "g",
                unitLong: "grams",
              },
            },
          },
          {
            id: 10419297,
            aisle: "Nut butters, Jams, and Honey",
            image: "blackberry-jam.png",
            consistency: "SOLID",
            name: "garnish: blackberry jam",
            nameClean: "garnish: blackberry jam",
            original: "Garnish: Blackberry jam (3 blackberries & ½ oz. 100% pure honey)",
            originalName: "Garnish: Blackberry jam blackberries & ½ oz. 100% pure honey)",
            amount: 3,
            unit: "",
            meta: ["100%", "pure"],
            measures: {
              us: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
              metric: {
                amount: 3,
                unitShort: "",
                unitLong: "",
              },
            },
          },
        ],
        summary:
          'Blackberry Honey Cocktail is a beverage that serves 1. Watching your figure? This gluten free, dairy free, and lacto ovo vegetarian recipe has <b>211 calories</b>, <b>0g of protein</b>, and <b>0g of fat</b> per serving. For <b>$2.03 per serving</b>, this recipe <b>covers 1%</b> of your daily requirements of vitamins and minerals. Only a few people made this recipe, and 4 would say it hit the spot. Head to the store and pick up garnish: blackberry jam, honey vodka, blackberries, and a few other things to make it today. It is brought to you by Foodista. From preparation to the plate, this recipe takes about <b>45 minutes</b>. Overall, this recipe earns a <b>very bad (but still fixable) spoonacular score of 8%</b>. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/bride-of-frankenstein-cocktail-vanilla-blackberry-champagne-cocktail-617718">Bride of Frankenstein Cocktail – Vanilla Blackberry Champagne Cocktail</a>, <a href="https://spoonacular.com/recipes/blackberry-cocktail-50694">Blackberry Cocktail</a>, and <a href="https://spoonacular.com/recipes/blackberry-champagne-cocktail-50511">Blackberry Champagne Cocktail</a>.',
        cuisines: [],
        dishTypes: ["beverage", "drink"],
        diets: ["gluten free", "dairy free", "lacto ovo vegetarian"],
        occasions: [],
        winePairing: {
          pairedWines: [],
          pairingText: "",
          productMatches: [],
        },
        instructions:
          "In a pint glass add all spirits and mixers, add ice and shake vigorously for 6 seconds.\nStrain in a Collins glass filled half way with cubed ice.\nTop off with crushed ice. Then crown with hand made jam.",
        analyzedInstructions: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step: "In a pint glass add all spirits and mixers, add ice and shake vigorously for 6 seconds.",
                ingredients: [
                  {
                    id: 10814037,
                    name: "liquor",
                    localizedName: "liquor",
                    image: "rum-dark.jpg",
                  },
                  {
                    id: 0,
                    name: "shake",
                    localizedName: "shake",
                    image: "",
                  },
                  {
                    id: 10014412,
                    name: "ice",
                    localizedName: "ice",
                    image: "ice-cubes.png",
                  },
                ],
                equipment: [],
              },
              {
                number: 2,
                step: "Strain in a Collins glass filled half way with cubed ice.",
                ingredients: [
                  {
                    id: 10014412,
                    name: "ice",
                    localizedName: "ice",
                    image: "ice-cubes.png",
                  },
                ],
                equipment: [],
              },
              {
                number: 3,
                step: "Top off with crushed ice. Then crown with hand made jam.",
                ingredients: [
                  {
                    id: 10114412,
                    name: "crushed ice cubes",
                    localizedName: "crushed ice cubes",
                    image: "crushed-ice.png",
                  },
                  {
                    id: 19297,
                    name: "jam",
                    localizedName: "jam",
                    image: "strawberry-jam.png",
                  },
                ],
                equipment: [],
              },
            ],
          },
        ],
        originalId: null,
        spoonacularScore: 20.085859298706055,
        spoonacularSourceUrl: "https://spoonacular.com/blackberry-honey-cocktail-635215",
      },
    ];

    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      try {
        const apiKey = getRandomApiKey();

        const apiUrl = `${FOOD_API}/recipes/informationBulk?ids=${idsString.join(",")}&apiKey=${apiKey}`;

        const res = await axios.get(apiUrl, { signal });

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
  });

  useEffect(() => {
    let meals = selectedDateData?.meal || {};
    for (const mealType in meals) {
      let mealData = meals[mealType];
      if (mealData.length > 0) {
        for (let i = 0; i < mealData.length; i++) {
          let recipeId = mealData[i].recipeId;
          let recipeDetails = recipeData.find((recipe) => recipe.id === recipeId);
          mealData[i].details = recipeDetails || null;
        }
      }
    }

    setMeal(meals);
    setIsMealReady(true);
  }, [recipeData.length > 0]);

  function handleModifyClick(bool) {
    setToModify(bool);
  }

  function handleDeleteClick() {
    console.log("delete ids:", listId);
  }

  return (
    <>
      <Navigator />

      <div className="mt-40">
        <div className="w-10/12 mx-auto">
          {/* schedule */}
          <div className="flex gap-5 justify-center">
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
            <div className="w-8/12">
              <h2 className="text-3xl font-medium capitalize mb-10">Today's meal</h2>

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
                            // open add meal modal or redirect to search
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
                          {isMealReady && (
                            <ul className="flex flex-col gap-10">
                              {/* Breakfast */}
                              {selectedDateData.meal.breakfast.length > 0 && (
                                <li>
                                  <h2 className="text-xl mb-4">Breakfast</h2>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {selectedDateData.meal.breakfast.map((item, idx) => (
                                      <div key={idx}>
                                        {item?.details?.id && (
                                          <RecipeItem
                                            key={item?.details?.id}
                                            image_name={item?.details?.image}
                                            id={item?.details?.id}
                                            name={item?.details?.title}
                                            setListId={setListId}
                                            toModify={toModify}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </li>
                              )}

                              {/* Lunch */}
                              {selectedDateData.meal.lunch.length > 0 && (
                                <li>
                                  <h2 className="text-xl mb-4">Lunch</h2>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {selectedDateData.meal.lunch.map((item, idx) => (
                                      <div key={idx}>
                                        {item?.details?.id && (
                                          <RecipeItem
                                            key={item?.details?.id}
                                            image_name={item?.details?.image}
                                            id={item?.details?.id}
                                            name={item?.details?.title}
                                            setListId={setListId}
                                            toModify={toModify}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </li>
                              )}

                              {/* Snacks */}
                              {selectedDateData.meal.snacks.length > 0 && (
                                <li>
                                  <h2 className="text-xl mb-4">Snacks</h2>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {selectedDateData.meal.snacks.map((item, idx) => (
                                      <div key={idx}>
                                        {item?.details?.id && (
                                          <RecipeItem
                                            key={item?.details?.id}
                                            image_name={item?.details?.image}
                                            id={item?.details?.id}
                                            name={item?.details?.title}
                                            setListId={setListId}
                                            toModify={toModify}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </li>
                              )}

                              {/* Dinner */}
                              {selectedDateData.meal.dinner.length > 0 && (
                                <li>
                                  <h2 className="text-xl mb-4">Dinner</h2>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {selectedDateData.meal.dinner.map((item, idx) => (
                                      <div key={idx}>
                                        {item?.details?.id && (
                                          <RecipeItem
                                            key={item?.details?.id}
                                            image_name={item?.details?.image}
                                            id={item?.details?.id}
                                            name={item?.details?.title}
                                            setListId={setListId}
                                            toModify={toModify}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </li>
                              )}
                            </ul>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* side 2 */}
            <div className="flex-1 max-w-[400px]">
              {/* button */}
              <div className="mb-10 flex flex-col gap-2">
                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                  <p>Generate shopping list weekly</p>
                </div>

                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
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
