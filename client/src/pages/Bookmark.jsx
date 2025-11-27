import React, { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faDownLong } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS
import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";
import MailLetter from "@components/MailLetter";
import RecipeItem from "@components/RecipeItem";
import Label from "@components/Label";
import SearchButton from "@components/SearchButton";
import Footer from "@components/Footer";

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

        {/* option */}
        <div className="mb-5 lg:mb-10 mt-30  max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-end gap-10">
          {/* option 1 */}
          <div className="flex flex-col gap-3 md:flex-row w-full md:justify-between lg:justify-start">
            {/* drop down */}
            <div className="relative">
              <select className="appearance-none px-4 py-3 w-fullborder border-black/30 rounded-md pr-1 cursor-pointer">
                <option value="recipe" selected>
                  Recipe
                </option>
                <option value="blog">Blog</option>
              </select>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black/60">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>

            {/* generate */}
            <button className="px-4 py-3 border border-black/30 rounded-lg w-full md:w-fit">
              Generate Shopping List
            </button>
          </div>

          {/* Search  */}
          <div className="flex flex-col md:flex-row md:items-end justify-center gap-2">
            {/* form */}
            <div className="w-full md:w-fit flex flex-col gap-2 ">
              <Label name="Recipe name" required={true} />
              <input
                type="text_name"
                placeholder="e.g. chicken, rice, broccoli"
                className={`border flex-1 md:w-fit border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
                // value={searchInput}
                // onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            {/* button */}
            <SearchButton />
          </div>
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

      <MailLetter />

      <Footer />
    </>
  );
}
