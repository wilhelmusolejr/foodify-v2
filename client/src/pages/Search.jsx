import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import SearchTypeItem from "@components/SearchTypeItem";
import CheckboxItem from "../components/CheckboxItem";
import Label from "../components/Label";

export default function Search() {
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

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* headig */}
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
          <div className="p-2 rounded-lg  bg-white flex flex-col md:flex-row gap-2 md:w-fit">
            {/* item */}
            <SearchTypeItem type_name="Recipe" selected={true} />
            <SearchTypeItem type_name="Ingredient" />
            <SearchTypeItem type_name="Nutrient" />
          </div>
        </div>

        {/* form big */}
        <div className="py-20 lg:py-30 xl:py-40 px-10 bg-white border border-black/10 rounded-lg flex md:justify-center ">
          {/* SEARCY BY RECIPE */}
          <div className="">
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
