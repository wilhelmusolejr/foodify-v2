import React from "react";

import SectionHeading from "@components/SectionHeading";
import Label from "@components/Label";
import Recipe from "@components/Recipe";

export default function SearchResult({ data }) {
  let recipeNames = [
    "Spaghetti Carbonara",
    "Grilled Chicken Salad",
    "Creamy Mushroom Risotto",
    "Beef Stir-Fry with Veggies",
    "Lemon Garlic Shrimp Pasta",
    "Classic Margherita Pizza",
  ];

  let recipes = recipeNames.map((name, index) => ({
    name,
    image_path: `images/recipe/recipe (${index + 1}).png`,
  }));

  return (
    <>
      {/* heading */}
      <div className="w-10/12 mx-auto max-w-7xl ">
        {/* Heading */}
        <div className="text-center my-20 md:my-28 lg:my-32 flex flex-col md:flex-row justify-between items-center gap-10">
          {/* side 1 */}
          <div className={`flex flex-col uppercase gap-2 text-center md:text-left`}>
            <p className="italic text-sm md:text-base lg:text-lg">
              Browse All Recipes by Category or Filter
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
              {`Search Results for "${data.searchInput || ""}"`}
            </h2>
          </div>

          {/* side 2 */}
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
            89 recipes found
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {recipes.map((recipe, index) => (
            <Recipe key={index} name={recipe.name} image_path={recipe.image_path} />
          ))}
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
  );
}
