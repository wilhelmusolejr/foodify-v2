import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import SearchTypeItem from "@components/SearchTypeItem";
import CheckboxItem from "@components/CheckboxItem";
import Label from "@components/Label";
import NutrientFormGroup from "@components/NutrientFormGroup";
import IngredientListItem from "@components/ingredientListItem";

export default function Search() {
  const [searchType, setSearchType] = React.useState("recipe");

  const meal_types = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
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

  // USE CALLBACK
  // USE CALLBACK
  // USE CALLBACK
  function handleSearchTypeChange(type) {
    setSearchType(type);
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

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
                />
              </div>
              {/* button */}
              <button className="bg-black w-full cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
                <p>Search</p>
              </button>
            </div>

            {/* filter */}
            <div className="flex gap-10 flex-col md:flex-row md:gap-10">
              {/* item - type filter */}
              <div className="">
                {/* Heading */}
                <h3 className="mb-4 text-xl font-medium">
                  Dietary Restrictions <span className="text-red-500">*</span>
                </h3>

                {/* checkboxes */}
                <div className="flex flex-col gap-2">
                  {/* item */}
                  {meal_types.map((type, index) => (
                    <CheckboxItem key={index} name={type} />
                  ))}
                </div>
              </div>

              {/* item - type filter */}
              <div className="">
                {/* Heading */}
                <h3 className="mb-4 text-xl font-medium">
                  Intolerances <span className="text-red-500">*</span>
                </h3>

                {/* checkboxes */}
                <div className="flex flex-col gap-2">
                  {/* item */}
                  {intolerances.map((type, index) => (
                    <CheckboxItem key={index} name={type} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH BY NUTRIENTS */}
          <div className={`${searchType === "nutrient" ? "block" : "hidden"} text-center`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[600px] text-left mb-20">
              {/* Carbohydrates */}
              <NutrientFormGroup heading="Carbohydrates" />
              {/* Calories */}
              <NutrientFormGroup heading="Calories" />
              {/* Fat */}
              <NutrientFormGroup heading="Fat" />
              {/* Protein */}
              <NutrientFormGroup heading="Protein" />
            </div>

            {/* button */}
            <button className="bg-black w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
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
                  />
                </div>
                {/* button */}
                <button className="bg-black w-full cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
                  <p>Add</p>
                </button>
              </div>

              {/* ingredient */}
              <div className="border border-black/20 p-5 rounded-lg bg-[#f5f5f5] w-full lg:w-[400px]">
                <h3 className="mb-4 text-xl font-medium">Your Ingredient</h3>

                <div className="min-h-[30vh] ">
                  <IngredientListItem name="Chicken Breast" />
                </div>
              </div>
            </div>

            {/* button */}
            <button className="bg-black w-fit cursor-pointer text-white px-4 py-3 hidden rounded-lg uppercase">
              <p>Search</p>
            </button>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
