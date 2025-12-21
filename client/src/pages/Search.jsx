import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faGear } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS
import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import SearchTypeItem from "@components/SearchTypeItem";
import CheckboxItem from "@components/CheckboxItem";
import Label from "@components/Label";
import NutrientFormGroup from "@components/NutrientFormGroup";
import IngredientListItem from "@components/ingredientListItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";
import RecipeItem from "@components/RecipeItem";
import PaginationButton from "@components/PaginationButton";
import SearchButton from "@components/SearchButton";
import Paragraph from "@components/Paragraph";
import InputError from "@components/InputError";

// LIBRARY
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";

// JSON
import offlineRecipeData from "./recipe.json";

// UTILS
import { getRandomApiKey } from "../utils/apiUtils";
import { ENV } from "@/config/env";

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

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");

  const [searchType, setSearchType] = useState("recipe");
  const [searchInput, setSearchInput] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState("");
  const [searchResults, setSearchResults] = useState({ recipes: [] });
  const [isTriggerSearch, setIsTriggerSeach] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const [nutrientRanges, setNutrientRanges] = useState({
    carbohydrates: ["", ""],
    calories: ["", ""],
    fat: ["", ""],
    protein: ["", ""],
  });
  const [listIngredients, setListIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [isIngredientInputValid, setIsIngredientValid] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);

  // Searh parameters

  // HANDLER FOR SEARCH BY NUTRIENTS
  // Use a single, generic handler:
  const handleNutrientRangeChange = (nutrientKey, newValue, indexToUpdate) => {
    setNutrientRanges((prevRanges) => ({
      ...prevRanges,
      [nutrientKey]: [
        ...prevRanges[nutrientKey].slice(0, indexToUpdate),
        newValue,
        ...prevRanges[nutrientKey].slice(indexToUpdate + 1),
      ],
    }));
  };

  // ---------------------------------------
  // ingredients
  // ---------------------------------------
  function addIngredient(ingredient) {
    if (ingredient.trim() === "") {
      setIsIngredientValid(false);
      return;
    }

    setListIngredients([...listIngredients, ingredient]);
    setIngredient("");
    setIsIngredientValid(true);
  }

  function removeIngredient(indexToRemove) {
    setListIngredients(listIngredients.filter((_, index) => index !== indexToRemove));
  }

  // ---------------------------------------
  // Recipe
  // ---------------------------------------
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

  // ---------------------------------------
  // handler
  // ---------------------------------------

  // USE CALLBACK
  function handleSearchTypeChange(type) {
    setSearchType(type);
    setInputError("");
  }

  function handleSearch() {
    switch (searchType) {
      case "recipe":
        if (searchInput.trim() === "") {
          setInputError("Invalid input");
          return;
        }
        break;
      case "ingredient":
        if (listIngredients.length === 0) {
          setInputError("Invalid input");
          return;
        }
        break;
      case "nutrient":
        console.log("ccc");
        const areAllEmpty = Object.values(nutrientRanges).every((range) =>
          range.every((v) => v === "")
        );
        if (areAllEmpty && sea) {
          setInputError("Invalid input");
          return;
        }
        break;
    }

    setIsTriggerSeach(true);
    setPageNum(1);
  }

  useEffect(() => {
    if (!isTriggerSearch && searchParams.size === 0) {
      return;
    }

    const searchParameters = {
      array: [
        { key: "diet", value: selectedDiet, separator: "|" },
        { key: "intolerances", value: selectedIntolerances, separator: "," },
        { key: "includeIngredients", value: listIngredients, separator: "," },
      ],
      numerical: [
        { key: "minCarbs", value: nutrientRanges.carbohydrates[0] },
        { key: "maxCarbs", value: nutrientRanges.carbohydrates[1] },
        { key: "minCalories", value: nutrientRanges.calories[0] },
        { key: "maxCalories", value: nutrientRanges.calories[1] },
        { key: "minFat", value: nutrientRanges.fat[0] },
        { key: "maxFat", value: nutrientRanges.fat[1] },
        { key: "minProtein", value: nutrientRanges.protein[0] },
        { key: "maxProtein", value: nutrientRanges.protein[1] },
        { key: "offset", value: (pageNum - 1) * 10 },
      ],
      string: [{ key: "query", value: searchInput === "" ? searchTerm : searchInput }],
    };

    let urlParameter = {};

    // 1. Process String Filters (e.g., query)
    searchParameters.string.forEach((filter) => {
      if (filter.value) {
        urlParameter[filter.key] = filter.value;
      }
    });

    // 2. Process Array Filters (e.g., diet, intolerances)
    searchParameters.array.forEach((filter) => {
      // Check if the array exists and has elements
      if (filter.value && filter.value.length > 0) {
        urlParameter[filter.key] = filter.value.join(filter.separator);
      }
    });

    // 3. Process Numerical Filters (min/max ranges)
    searchParameters.numerical.forEach((filter) => {
      // Check if the numerical value is greater than zero
      if (filter.value > 0) {
        urlParameter[filter.key] = filter.value;
      }
    });

    const params = new URLSearchParams(urlParameter); // Pass the object directly

    setSearchParams(urlParameter);

    const fetchRecipeData = async () => {
      for (let attempt = 1; attempt <= ENV.maxTry; attempt++) {
        try {
          const apiKey = getRandomApiKey();
          params.append("apiKey", apiKey);
          const apiUrl = `${ENV.foodApiUrl}/recipes/complexSearch?${params.toString()}`;

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
            pageLimit: Math.ceil(response.data.totalResults / 10),
          };

          // 2. Axios data is automatically parsed as JSON
          setSearchResults(tempRecipe);
          return;
        } catch (error) {
          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;
          console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

          if (attempt === ENV.maxTry) {
            // last attempt – fallback
            const localRecipes = Array.from({ length: 8 }, () => ({
              ...offlineRecipeData,
            }));

            toast.error("Showing offline data. API LIMIT");

            let tempRecipe = {
              recipes: localRecipes,
              totalResults: localRecipes.length,
              pageLimit: Math.ceil(localRecipes.length / 10),
            };

            console.log(tempRecipe);

            setSearchResults(tempRecipe);
            return;
          }

          // if reached 50 points
          setError(error.response ? error.response.data.message : error.message);
        } finally {
          setIsLoading(false);
          setIsTriggerSeach(false);
        }
      }
    };

    fetchRecipeData();
  }, [isTriggerSearch, searchParams.size]);

  function handlePagination(gotoPage) {
    if (gotoPage === pageNum) {
      return;
    }

    setPageNum(gotoPage);
    setIsTriggerSeach(true);
  }

  // Page title
  useEffect(() => {
    let pageName = isTriggerSearch ? "Search Results" : "Find Recipes";
    document.title = `${pageName} | ${ENV.pageName}`;
  }, [isTriggerSearch]);

  const slideUpFadeSwitch = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      {/* Navigator */}
      <Navigator />
      <Toaster position="top-center" reverseOrder={false} />

      {searchParams.size == 0 ? (
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchType} // 🔥 THIS IS THE FIX
                  variants={slideUpFadeSwitch}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className=""
                >
                  {/* SEARCH BY RECIPE */}
                  {searchType === "recipe" && (
                    <div>
                      <InputError error={inputError} />

                      {/* search input */}
                      <div className="flex flex-col md:flex-row md:items-end gap-2 mb-10 ">
                        {/* form */}
                        <div className="w-full flex flex-col gap-2 relative">
                          <Label name="Recipe name" required={true} />
                          <input
                            type="text_name"
                            placeholder="e.g. chicken, rice, broccoli"
                            className={`border flex-1 rounded-lg px-4 py-3 lg:min-w-80 border-black/50`}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                        </div>
                        {/* button */}
                        <SearchButton
                          onClick={handleSearch}
                          isDisabled={searchInput.length === 0}
                        />
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
                  )}

                  {/* SEARCH BY NUTRIENTS */}
                  {searchType === "nutrient" && (
                    <div>
                      <InputError error={inputError} />

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[600px] text-left mb-20">
                        {/* Carbohydrates */}
                        <NutrientFormGroup
                          heading="Carbohydrates"
                          data={nutrientRanges.carbohydrates}
                          onChange={handleNutrientRangeChange}
                        />

                        {/* Calories */}
                        <NutrientFormGroup
                          heading="Calories"
                          data={nutrientRanges.calories}
                          onChange={handleNutrientRangeChange}
                        />

                        {/* Protein */}
                        <NutrientFormGroup
                          heading="Protein"
                          data={nutrientRanges.protein}
                          onChange={handleNutrientRangeChange}
                        />

                        {/* Fat */}
                        <NutrientFormGroup
                          heading="Fat"
                          data={nutrientRanges.fat}
                          onChange={handleNutrientRangeChange}
                        />
                      </div>

                      {/* button */}
                      <SearchButton onClick={handleSearch} />
                    </div>
                  )}

                  {/* SEARCH BY INGREDIENTS */}
                  {searchType === "ingredient" && (
                    <div className="w-full md:w-fit text-center">
                      <InputError error={inputError} />

                      <div className="text-left flex flex-col lg:flex-row items-start gap-10 mb-20">
                        {/* input */}
                        <div className="flex flex-col md:flex-row md:items-end gap-2 lg:py-5 w-full lg:w-fit ">
                          {/* form */}
                          <div className="w-full flex flex-col gap-2">
                            <Label name="Enter Ingredient" required={true} />
                            <input
                              type="text_name"
                              placeholder="e.g. chicken, rice, broccoli"
                              className={`border flex-1 border-black/50 rounded-lg px-4 py-3 ${isIngredientInputValid ? "border-black/50" : "bg-red-100 border-red-400"}`}
                              onChange={(e) => setIngredient(e.target.value)}
                              value={ingredient}
                            />
                          </div>
                          {/* button */}
                          <button
                            disabled={ingredient === ""}
                            className={`bg-black w-full cursor-pointer text-white px-4 py-3 rounded-lg uppercase ${
                              ingredient === ""
                                ? "bg-gray-400 cursor-not-allowed opacity-70"
                                : "bg-black hover:bg-gray-800 cursor-pointer"
                            }`}
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
                      <SearchButton
                        onClick={handleSearch}
                        isDisabled={listIngredients.length === 0}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* heading */}
          {/* heading */}
          {/* heading */}
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
                  {`Search by ${searchType}`}
                </h2>
              </div>

              {/* side 2 */}
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
                <span className="font-semibold">{searchResults.totalResults}</span> recipe
                {`${searchResults.totalResults > 1 ? "s" : ""}`} found
              </h2>
            </div>

            <div className="flex justify-center max-w-7xl mx-auto items-end mb-20">
              {/* Filler/Spacer */}
              <div className="w-10 hidden"></div>

              {/* Search  */}
              <div className="flex flex-col md:flex-row md:items-end justify-center gap-2 w-full">
                {/* form */}
                <div className="w-full md:w-fit flex flex-col gap-2 ">
                  <Label name="Recipe name" required={true} />
                  <input
                    type="text_name"
                    placeholder="e.g. chicken, rice, broccoli"
                    className={`border flex-1 md:w-fit border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                {/* button */}
                <SearchButton onClick={handleSearch} />
              </div>

              <div className="hidden">
                <div className=" px-4 py-3 bg-blue-600 text-white rounded-lg flex justify-center items-center">
                  <FontAwesomeIcon icon={faGear} size="2xl" />
                </div>
              </div>
            </div>

            {/* Parent */}
            <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 min-h-[60vh]">
              {/* 1. Loading State */}
              {isloading && (
                <>
                  {[...Array(8)].map((_, index) => (
                    <RecipeItemSkeleton key={index} />
                  ))}
                </>
              )}

              {/* 2. Success State: Recipes Found */}
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

              {/* 3. Empty State: No Recipes Found (New Block) */}
              {!isloading && searchResults.recipes.length === 0 && (
                // Note: The empty state should span the entire grid area.
                <div className="col-span-full py-20 px-10 text-center border rounded-lg bg-white border-black/10">
                  <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4 pt-10">
                    No Recipes Found{" "}
                  </h3>
                  <Paragraph className="mx-auto">
                    We couldn't find any recipes matching your criteria. Try adjusting your search
                    query, diet, or nutrient filters.
                  </Paragraph>
                </div>
              )}
            </div>

            {/* Pagination */}
            {searchResults.totalResults > 10 && (
              <div className="flex justify-center items-center gap-3 my-30">
                {pageNum > 1 && (
                  <PaginationButton
                    pageNum={pageNum - 1}
                    onClick={handlePagination}
                    className="px-3"
                    isDisabled={pageNum <= 1}
                    text={"Previous"}
                  />
                )}
                {pageNum > 1 && (
                  <PaginationButton
                    pageNum={pageNum - 1}
                    text={pageNum - 1}
                    onClick={handlePagination}
                  />
                )}

                <PaginationButton
                  pageNum={pageNum}
                  text={pageNum}
                  isDisabled={true}
                  className={"bg-black text-white"}
                />

                {pageNum < searchResults.pageLimit && (
                  <>
                    <PaginationButton
                      pageNum={pageNum + 1}
                      text={pageNum + 1}
                      onClick={handlePagination}
                    />
                    <PaginationButton
                      pageNum={pageNum + 1}
                      text={"Next"}
                      onClick={handlePagination}
                      className="px-3"
                    />
                  </>
                )}
              </div>
            )}
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
