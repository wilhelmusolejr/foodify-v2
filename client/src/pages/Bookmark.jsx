import React, { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faDownLong } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS
import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";
import MailLetter from "@components/MailLetter";
import RecipeItem from "@components/RecipeItem";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRandomApiKey } from "../utils/apiUtils";

const skeletonRecipes = Array.from({ length: 12 }, () => <RecipeItemSkeleton />);

export default function Bookmark() {
  const apiKey = getRandomApiKey();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_BOOKMARK_URL = `${BACKEND_URL}/api/bookmark`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;

  const { id } = useParams();

  const fetchUserBookmarks = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing user id");

    const BACKEND_API = `${BACKEND_BOOKMARK_URL}/getUserBookmarks/${id}`;
    const res = await axios.get(BACKEND_API, { signal });
    return res.data.bookmarks;
  };
  const {
    data: userBookmarks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-bookmark", id],
    queryFn: fetchUserBookmarks,
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  //   Fetch Recipe
  const bookmarkIds = useMemo(() => {
    // extract numeric/string ids and join into a stable string
    return (
      userBookmarks
        ?.map((b) => b?.recipe_id)
        .filter(Boolean)
        .join(",") ?? ""
    );
  }, [userBookmarks]);

  const fetchRecipe = async ({ queryKey, signal }) => {
    // queryKey: ["recipes", id, idsString]
    const [, id, idsString] = queryKey;
    const apiUrl = `${FOOD_API}/recipes/informationBulk?ids=${idsString}&apiKey=${apiKey}`;
    console.log(apiUrl);
    const res = await axios.get(apiUrl, { signal });
    return res.data;
  };
  const {
    data: recipeData = [],
    isLoading: recipesLoading,
    error: recipesError,
  } = useQuery({
    queryKey: ["recipes", id, bookmarkIds],
    queryFn: fetchRecipe,
    enabled: !!id && bookmarkIds.length > 0,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  let recipes = recipeData.length === 0 ? skeletonRecipes : recipeData;

  console.log(recipes);
  console.log(recipeData.length);
  return (
    <>
      {/* navigator */}
      <Navigator />

      {/* heading */}
      <div className="w-10/12 mx-auto mt-30">
        {/* heading */}
        <SectionHeading heading="Bookmark" subheading="Browse All Recipes by Category or Filter" />

        <div className="flex flex-col gap-3 mb-14 md:flex-row max-w-7xl mx-auto">
          <div className="p-5 border border-black/30 rounded-lg flex items-center justify-between gap-2">
            <p>Recipes</p>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          <button className="p-5 border border-black/30 rounded-lg w-full md:w-fit">
            Generate Shopping List
          </button>
        </div>

        {/* recipe */}
        <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 min-h-[60vh]">
          {recipeData.length === 0 ? (
            <>
              {recipes.map((recipe, index) => (
                <RecipeItem
                  key={index}
                  image_name={recipe.image}
                  id={recipe.id}
                  name={recipe.title}
                />
              ))}
            </>
          ) : (
            <>
              {recipes.map((recipe, index) => (
                <RecipeItem
                  key={index}
                  image_name={recipe.image}
                  id={recipe.id}
                  name={recipe.title}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <MailLetter />
    </>
  );
}
