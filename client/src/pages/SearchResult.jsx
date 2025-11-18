import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Component
import Label from "@components/Label";
import RecipeItem from "@components/RecipeItem";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";

// Axios
import axios from "axios";

import recipeData from "./data.json";

export default function SearchResult({ query }) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState({ recipe: [] });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");

  useEffect(() => {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);

        // 2. Axios data is automatically parsed as JSON
        setSearchResults({
          recipe: response.data.results,
        });

        console.log(response.data);
      } catch (err) {
        // if reached 50 points
        if (err.response.data.message.includes("upgrade your plan")) {
          setSearchResults({
            recipe: recipeData,
          });
        }

        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [searchTerm]);

  return (
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
        <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {isloading && (
            <>
              {[...Array(8)].map((_, index) => (
                <RecipeItemSkeleton key={index} />
              ))}
            </>
          )}

          {/* --- Conditional Rendering for Data Loaded State --- */}
          {!isloading && searchResults.recipe.length > 0 && (
            <>
              {searchResults.recipe.map((recipe) => (
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
  );
}
