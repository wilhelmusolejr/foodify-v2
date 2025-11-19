import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamationCircle, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import SearchTypeItem from "@components/SearchTypeItem";
import CheckboxItem from "@components/CheckboxItem";
import Label from "@components/Label";
import NutrientFormGroup from "@components/NutrientFormGroup";
import IngredientListItem from "@components/ingredientListItem";
import SearchResult from "./SearchResult";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";
import RecipeItem from "@components/RecipeItem";

import axios from "axios";

export default function Search() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");

  const [searchType, setSearchType] = useState("nutrient");
  const [searchInput, setSearchInput] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState({ recipes: [] });
  const [isTriggerSearch, setIsTriggerSeach] = useState(false);

  const [carbohydrates, setCarbohydrates] = useState(["", ""]);
  const [calories, setCalories] = useState(["", ""]);
  const [fat, setFat] = useState(["", ""]);
  const [protein, setProtein] = useState(["", ""]);

  // nutrient
  // nutrient
  // nutrient
  const handleCarbsChange = (newValue, indexToUpdate) => {
    // 2. Use the functional update form to safely modify the array
    setCarbohydrates((prevCarbs) => {
      // Create a copy of the previous array
      const newCarbs = [...prevCarbs];

      // Update the specific index (0 for min, 1 for max)
      newCarbs[indexToUpdate] = newValue;

      // Return the new array to update the state
      return newCarbs;
    });
  };
  const handleCaloriesChange = (newValue, indexToUpdate) => {
    // 2. Use the functional update form to safely modify the array
    setCalories((prevCarbs) => {
      // Create a copy of the previous array
      const newCarbs = [...prevCarbs];

      // Update the specific index (0 for min, 1 for max)
      newCarbs[indexToUpdate] = newValue;

      // Return the new array to update the state
      return newCarbs;
    });
  };
  const handleFatChange = (newValue, indexToUpdate) => {
    // 2. Use the functional update form to safely modify the array
    setFat((prevCarbs) => {
      // Create a copy of the previous array
      const newCarbs = [...prevCarbs];

      // Update the specific index (0 for min, 1 for max)
      newCarbs[indexToUpdate] = newValue;

      // Return the new array to update the state
      return newCarbs;
    });
  };
  const handleProteinChange = (newValue, indexToUpdate) => {
    // 2. Use the functional update form to safely modify the array
    setProtein((prevCarbs) => {
      // Create a copy of the previous array
      const newCarbs = [...prevCarbs];

      // Update the specific index (0 for min, 1 for max)
      newCarbs[indexToUpdate] = newValue;

      // Return the new array to update the state
      return newCarbs;
    });
  };

  // ingredients
  // ingredients
  // ingredients
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");

  function addIngredient(ingredient) {
    if (ingredient.trim() === "") {
      return;
    }

    setListIngredients([...listIngredients, ingredient]);
    setIngredient("");
  }

  function removeIngredient(indexToRemove) {
    setListIngredients(listIngredients.filter((_, index) => index !== indexToRemove));
  }

  // Recipe
  // Recipe
  // Recipe
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);

  const handleCheckboxChangeDiet = (name, isChecked) => {
    setSelectedDiet((prevTypes) => {
      if (isChecked) {
        // If checked, add the type to the array if it's not already there
        return [...prevTypes, name];
      } else {
        // If unchecked, remove the type from the array
        return prevTypes.filter((t) => t !== name);
      }
    });
  };

  const handleCheckboxChangeIntolerance = (name, isChecked) => {
    setSelectedIntolerances((prevTypes) => {
      if (isChecked) {
        // If checked, add the type to the array if it's not already there
        return [...prevTypes, name];
      } else {
        // If unchecked, remove the type from the array
        return prevTypes.filter((t) => t !== name);
      }
    });
  };

  // DATA
  // DATA
  // DATA
  const diet_list = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  const SEARCH_TYPES = [
    { id: 1, name: "Recipe" },
    { id: 2, name: "Ingredient" },
    { id: 3, name: "Nutrient" },
  ];

  // handler
  // handler
  // handler

  // USE CALLBACK
  function handleSearchTypeChange(type) {
    setSearchType(type);
  }

  function handleSearch() {
    // bonk
    let dietString = selectedDiet.join(",");
    let intolerancesString = selectedIntolerances.join(",");

    setSearchParams({
      query: searchInput,
      diet: dietString,
      intolerances: intolerancesString,
    });
    setIsTriggerSeach(true);
  }

  useEffect(() => {
    if (!isTriggerSearch) {
      return;
    }

    const apiKeyUrl = `&apiKey=${apiKey}`;

    let initialUrl = `https://api.spoonacular.com/recipes/complexSearch?`;

    let parameters = [];

    if (searchInput) {
      parameters.push(`query=${searchInput}`);
    }
    if (selectedDiet.length) {
      parameters.push(`diet=${selectedDiet.join("|")}`);
    }
    if (selectedIntolerances.length) {
      parameters.push(`intolerances=${selectedIntolerances.join(",")}`);
    }
    if (listIngredients.length) {
      parameters.push(`includeIngredients=${listIngredients.join(",")}`);
    }
    if (carbohydrates[0] > 0) {
      parameters.push(`minCarbs=${carbohydrates[0]}`);
    }
    if (carbohydrates[1] > 0) {
      parameters.push(`maxCarbs=${carbohydrates[1]}`);
    }
    if (calories[0] > 0) {
      parameters.push(`minCalories=${calories[0]}`);
    }
    if (calories[1] > 0) {
      parameters.push(`maxCalories=${calories[1]}`);
    }
    if (fat[0] > 0) {
      parameters.push(`minFat=${fat[0]}`);
    }
    if (fat[1] > 0) {
      parameters.push(`maxFat=${fat[1]}`);
    }
    if (protein[0] > 0) {
      parameters.push(`minProtein=${protein[0]}`);
    }
    if (protein[1] > 0) {
      parameters.push(`maxProtein=${protein[1]}`);
    }

    protein;

    let apiUrl = `${initialUrl}${parameters.join("&")}${apiKeyUrl}`;

    console.log(apiUrl);

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);

        let tempRecipe = {
          recipes: response.data.results,
          totalResults: response.data.totalResults,
        };

        // 2. Axios data is automatically parsed as JSON
        setSearchResults(tempRecipe);

        console.log(tempRecipe);
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
        // if reached 50 points
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
        setIsTriggerSeach(false);
      }
    };

    fetchRecipeData();
  }, [isTriggerSearch]);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {searchTerm === null ? (
        <>
          {/* heading */}
          <div className="w-10/12 mx-auto mt-30">
            <SectionHeading
              heading="Find Your Perfect Meal"
              subheading="Browse All Recipes by Category or Filter"
            />
          </div>

          <div className="w-10/12 mx-auto">
            {/* Type */}
            <div className="mb-5">
              <h3 className="mb-2 ms-2 text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
                Search by...
              </h3>
              {/* type of search */}
              <div className="p-2 rounded-lg  bg-white flex flex-col md:flex-row gap-2 md:w-fit border border-black/10">
                {/* item */}
                {SEARCH_TYPES.map((type) => (
                  <SearchTypeItem
                    key={type.id}
                    type_name={type.name}
                    searchType={searchType}
                    onClick={handleSearchTypeChange}
                  />
                ))}
              </div>
            </div>

            {/* form big */}
            <div className="py-20 lg:py-30 xl:py-40 px-10 bg-white border border-black/10 rounded-lg flex md:justify-center ">
              {/* SEARCY BY RECIPE */}
              <div className={`${searchType === "recipe" ? "block" : "hidden"}`}>
                {/* search input */}
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-10">
                  {/* form */}
                  <div className="w-full flex flex-col gap-2">
                    <Label name="Recipe name" required={true} />
                    <input
                      type="text_name"
                      placeholder="e.g. chicken, rice, broccoli"
                      className={`border flex-1 border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  {/* button */}
                  <button
                    className="bg-black w-full cursor-pointer text-white px-4 py-3 rounded-lg uppercase"
                    onClick={handleSearch}
                  >
                    <p>Search</p>
                  </button>
                </div>

                {/* filter */}
                <div className="flex gap-10 flex-col md:flex-row md:gap-10">
                  {/* item - type filter */}
                  <div className="">
                    {/* Heading */}
                    <h3 className="mb-4 text-xl font-medium">Diet</h3>

                    {/* checkboxes */}
                    <div className="flex flex-col gap-2">
                      {/* item */}
                      {diet_list.map((type, index) => (
                        <CheckboxItem
                          key={index}
                          name={type}
                          onCheckBoxChange={handleCheckboxChangeDiet}
                        />
                      ))}
                    </div>
                  </div>

                  {/* item - type filter */}
                  <div className="">
                    {/* Heading */}
                    <h3 className="mb-4 text-xl font-medium">Intolerances</h3>

                    {/* checkboxes */}
                    <div className="flex flex-col gap-2">
                      {/* item */}
                      {intolerances.map((type, index) => (
                        <CheckboxItem
                          key={index}
                          name={type}
                          onCheckBoxChange={handleCheckboxChangeIntolerance}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SEARCH BY NUTRIENTS */}
              <div className={`${searchType === "nutrient" ? "block" : "hidden"} text-center`}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[600px] text-left mb-20">
                  {/* Carbohydrates */}
                  <NutrientFormGroup
                    heading="Carbohydrates"
                    data={carbohydrates}
                    onChange={handleCarbsChange}
                  />

                  {/* Calories */}
                  <NutrientFormGroup
                    heading="Calories"
                    data={calories}
                    onChange={handleCaloriesChange}
                  />

                  {/* Protein */}
                  <NutrientFormGroup
                    heading="Protein"
                    data={protein}
                    onChange={handleProteinChange}
                  />

                  {/* Fat */}
                  <NutrientFormGroup heading="Fat" data={fat} onChange={handleFatChange} />
                </div>

                {/* button */}
                <button
                  className="bg-black w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase"
                  onClick={handleSearch}
                >
                  <p>Search</p>
                </button>
              </div>

              {/* SEARCH BY INGREDIENTS */}
              <div
                className={`${searchType === "ingredient" ? "block" : "hidden"} w-full md:w-fit text-center`}
              >
                <div className="text-left flex flex-col lg:flex-row items-start gap-10">
                  {/* input */}
                  <div className="flex flex-col md:flex-row md:items-end gap-2 lg:py-5 w-full lg:w-fit">
                    {/* form */}
                    <div className="w-full flex flex-col gap-2">
                      <Label name="Enter Ingredient" required={true} />
                      <input
                        type="text_name"
                        placeholder="e.g. chicken, rice, broccoli"
                        className={`border flex-1 border-black/50 rounded-lg px-4 py-3`}
                        onChange={(e) => setIngredient(e.target.value)}
                        value={ingredient}
                      />
                    </div>
                    {/* button */}
                    <button
                      className="bg-black w-full cursor-pointer text-white px-4 py-3 rounded-lg uppercase"
                      onClick={() => addIngredient(ingredient)}
                    >
                      <p>Add</p>
                    </button>
                  </div>

                  {/* ingredient */}
                  <div className="border border-black/20 p-5 rounded-lg bg-[#f5f5f5] w-full lg:w-[400px]">
                    <h3 className="mb-4 text-xl font-medium">Your Ingredient</h3>

                    <div className="h-full min-h-[200px] ">
                      {/* content */}

                      {listIngredients.length > 0 ? (
                        <div className="flex flex-wrap gap-2 ">
                          {listIngredients.map((ingredient, index) => (
                            <IngredientListItem
                              key={index}
                              name={ingredient}
                              onRemove={() => removeIngredient(index)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="h-full">
                          <div className="flex flex-col items-center justify-center text-center h-full py-10 text-gray-500">
                            <FontAwesomeIcon
                              icon={faBoxOpen}
                              className="text-5xl mb-3 opacity-60"
                            />
                            <p className="text-lg font-medium">No ingredients yet</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Start adding items to build your list.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* button */}
                <button
                  className="bg-black w-fit cursor-pointer text-white px-4 py-3 mt-30 rounded-lg uppercase"
                  onClick={handleSearch}
                >
                  <p>Search</p>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* heading */}
          <div className="w-10/12 mx-auto">
            {/* Heading */}
            <div className="text-center my-20 md:my-28 lg:my-32 flex flex-col md:flex-row justify-between items-center gap-10">
              {/* side 1 */}
              <div className={`flex flex-col uppercase gap-2 text-center md:text-left`}>
                <p className="italic text-sm md:text-base lg:text-lg">
                  Browse All Recipes by Category or Filter
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                  {`Search Results for "${searchTerm || ""}"`}
                </h2>
              </div>

              {/* side 2 */}
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
                {searchResults.totalResults} recipes found
              </h2>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-center gap-2 mb-20">
              {/* form */}
              <div className="w-full md:w-fit flex flex-col gap-2">
                <Label name="Recipe name" required={true} />
                <input
                  type="text_name"
                  placeholder="e.g. chicken, rice, broccoli"
                  className={`border flex-1 md:w-fit border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
                />
              </div>
              {/* button */}
              <button className="bg-black w-full md:w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
                <p>Search</p>
              </button>
            </div>

            {/* Parent */}
            <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 min-h-[60vh]">
              {isloading && (
                <>
                  {[...Array(8)].map((_, index) => (
                    <RecipeItemSkeleton key={index} />
                  ))}
                </>
              )}

              {/* --- Conditional Rendering for Data Loaded State --- */}
              {!isloading && searchResults.recipes.length > 0 && (
                <>
                  {searchResults.recipes.map((recipe) => (
                    <RecipeItem
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.title}
                      image_name={recipe.image}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 my-30">
              <button className="px-3 h-10 border border-black rounded-md bg-white">
                <p>Previous</p>
              </button>
              <button className="w-10 h-10 border border-black rounded-lg bg-black text-white">
                <p>1</p>
              </button>
              <button className="w-10 h-10 border border-black rounded-lg bg-white">
                <p>2</p>
              </button>
              <button className="px-3 h-10 border border-black rounded-lg bg-white">
                <p>Next</p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
