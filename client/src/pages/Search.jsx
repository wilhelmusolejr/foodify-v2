import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

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

import axios from "axios";

export default function Search() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchType, setSearchType] = useState("recipe");
  const [searchInput, setSearchInput] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);

  // Searh parameters
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
    string: [{ key: "query", value: searchInput }],
  };

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

  // ingredients
  // ingredients
  // ingredients
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
    setIsTriggerSeach(true);
    setPageNum(1);
  }

  useEffect(() => {
    if (!isTriggerSearch) {
      return;
    }

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

    const apiKeyUrl = `&apiKey=${apiKey}`;
    let initialUrl = `https://api.spoonacular.com/recipes/complexSearch?`;

    for (let key in urlParameter) {
      if (urlParameter.hasOwnProperty(key)) {
        const value = urlParameter[key];
        if (value != false || value) {
          initialUrl += `&${key}=${value}`;
        }
      }
    }

    let apiUrl = (initialUrl += apiKeyUrl);
    setSearchParams(urlParameter);
    console.log(searchParameters);

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
          pageLimit: Math.ceil(response.data.totalResults / 10),
        };

        // 2. Axios data is automatically parsed as JSON
        setSearchResults(tempRecipe);

        console.log(tempRecipe);
        console.log(apiUrl);
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

  function handlePagination(gotoPage) {
    if (gotoPage === pageNum) {
      return;
    }

    setPageNum(gotoPage);
    setIsTriggerSeach(true);
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

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
                  <SearchButton onClick={handleSearch} />
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

              {/* SEARCH BY INGREDIENTS */}
              <div
                className={`${searchType === "ingredient" ? "block" : "hidden"} w-full md:w-fit text-center`}
              >
                <div className="text-left flex flex-col lg:flex-row items-start gap-10 mb-20">
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
                <SearchButton onClick={handleSearch} />
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
                  {`Search by ${searchType}`}
                </h2>
              </div>

              {/* side 2 */}
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
                <span className="font-semibold">{searchResults.totalResults}</span> recipes found
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {/* button */}
              <SearchButton onClick={handleSearch} />
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
