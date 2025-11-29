import React, { useMemo, useState } from "react";

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
import PaginationButton from "@components/PaginationButton";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRandomApiKey } from "../utils/apiUtils";

// GLOBAL STATE
import { useAuthStore } from "../stores/useAuthStore";

import EmptyRecipe from "@components/Profile/EmptyRecipe";

const skeletonRecipes = Array.from({ length: 12 }, () => <RecipeItemSkeleton />);

export default function Bookmark() {
  // if no user id found show UI
  // if no recipe or bookmark found, show UI
  // Pagination
  // Search function

  const { id } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [bookmarkType, setBookmarkType] = useState("recipe");

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isVisitor = isLoggedIn ? user.id !== id : true;

  const apiKey = getRandomApiKey();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_USER_URL = `${BACKEND_URL}/api/user`;
  const BACKEND_BOOKMARK_URL = `${BACKEND_URL}/api/bookmark`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;

  // Fetch userbookmarks
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

  // Get user profile
  const fetchUserProfile = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing user id");

    const BACKEND_API = `${BACKEND_USER_URL}/profile/${id}`;
    const res = await axios.get(BACKEND_API, { signal });

    const user = res?.data?.user ?? {};

    const initial = (user.firstName?.[0] ?? "U").toUpperCase();
    const profile_path = `https://placehold.co/40x40/4c3c3a/ffffff?text=${encodeURIComponent(initial)}`;

    return {
      ...user,
      profile_path,
    };
  };
  const {
    data: userProfile = {},
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: fetchUserProfile,
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  let recipes = recipeData.length === 0 ? skeletonRecipes : recipeData;

  console.log();

  return (
    <>
      {/* navigator */}
      <Navigator />

      {userProfileError?.response?.data?.isError ? (
        <div className="flex flex-col items-center justify-center my-50 pb-20 text-center w-10/12 mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No User Found</h2>
          <p className="text-gray-500 max-w-md">
            We couldn’t find any user matching your search. Try adjusting your search or filter
            options.
          </p>
        </div>
      ) : (
        <div className="w-10/12 mx-auto mt-30 ">
          {/* heading */}
          <SectionHeading
            heading="Bookmark"
            subheading="Browse All Recipes by Category or Filter"
          />

          {/* option */}
          <div className="mb-5 lg:mb-10 mt-30  max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-end gap-10">
            {/* option 1 */}
            <div className="flex flex-col gap-3 md:flex-row w-full md:justify-between lg:justify-start">
              {/* drop down */}
              <div className="relative">
                <select className="appearance-none px-4 py-3 w-full border border-black/30 rounded-md pr-1 lg:pr-14 cursor-pointer">
                  <option defaultValue="recipe">Recipe</option>
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
                <Label name={`${bookmarkType} name`} required={true} />
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

          {recipeData.length === 0 ? (
            <>
              <div className="max-w-7xl mx-auto mb-20 min-h-[60vh]">
                <EmptyRecipe isVisitor={isVisitor} userProfile={userProfile} />
              </div>
            </>
          ) : (
            <>
              <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 min-h-[60vh]">
                {recipes.map((recipe, index) => (
                  <RecipeItem
                    key={index}
                    image_name={recipe.image}
                    id={recipe.id}
                    name={recipe.title}
                  />
                ))}
              </div>
            </>
          )}

          {/* recipe */}

          {/* Pagination */}
          {recipeData.length > 5 && (
            <div className="flex justify-center items-center gap-3 my-30">
              {pageNum > 1 && (
                <PaginationButton
                  pageNum={pageNum - 1}
                  // onClick={handlePagination}
                  className="px-3"
                  isDisabled={pageNum <= 1}
                  text={"Previous"}
                />
              )}
              {pageNum > 1 && (
                <PaginationButton
                  pageNum={pageNum - 1}
                  text={pageNum - 1}
                  // onClick={handlePagination}
                />
              )}

              <PaginationButton
                pageNum={pageNum}
                text={pageNum}
                isDisabled={true}
                className={"bg-black text-white"}
              />

              {pageNum < 80 && (
                <>
                  <PaginationButton
                    pageNum={pageNum + 1}
                    text={pageNum + 1}
                    // onClick={handlePagination}
                  />
                  <PaginationButton
                    pageNum={pageNum + 1}
                    text={"Next"}
                    // onClick={handlePagination}
                    className="px-3"
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}

      <MailLetter />

      <Footer />
    </>
  );
}
