import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleWhole,
  faDollarSign,
  faHeart,
  faLeaf,
  faSeedling,
  faStar,
  faTrophy,
  faBookmark as faBookmarked,
  faUsers,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// Components
import Navigator from "@components/Navigator";
import RecipeTime from "@components/RecipeTime";
import Paragraph from "@components/Paragraph";
import Heading from "@components/Recipe/Heading";
import ListItem from "@components/Recipe/ListItem";
import RecipeItem from "@components/RecipeItem";
import Tags from "@components/Recipe/Tags";
import NutritionFacts from "@components/NutritionFacts";
import Feedback from "@components/Recipe/Feedback";
import SectionHeading from "@components/SectionHeading";
import IconItem from "@components/IconItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import NeedLogin from "@components/Modal/NeedLogin";
import RecipeItemSkeleton from "../components/RecipeItemSkeleton";
import PageLoader from "@components/Recipe/PageLoader";
import AddMealMealPlanner from "@components/Modal/AddMealMealPlanner";
import Button from "@components/Global/Button";

// UTILS
import { formatCommentDate } from "../utils/dateUtils";
import { getRandomApiKey } from "../utils/apiUtils";

// GLOBAL STATE
import { useAuthStore } from "../stores/useAuthStore";

// Library
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useModal } from "../context/ModalContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// DEMO
import bookmarkData from "../demo/bookmarks.json";
import userData from "../demo/users.json";
import commentData from "../demo/comments.json";
import offlineRecipeData from "./recipe.json";

export default function Recipe() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;
  const user = useAuthStore.getState().user;
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  const { modalType, openModal } = useModal();

  // URL
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_COMMENT_URL = `${BACKEND_URL}/api/comment`;
  const BACKEND_BOOKMARK_URL = `${BACKEND_URL}/api/bookmark`;
  const FOOD_API = import.meta.env.VITE_FOOD_API;
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;
  const MAX_TRY = Number(import.meta.env.VITE_MAX_TRY);
  const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

  const [comment, setComment] = useState("");

  // Get recipe information
  const fetchRecipe = async ({ queryKey, signal }) => {
    console.log("Fetching recipe data...");

    const [, id] = queryKey;
    if (!id) throw new Error("Missing recipe id");

    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      if (signal?.aborted) {
        throw new Error("Request was aborted");
      }

      const apiKey = getRandomApiKey();
      const apiUrl = `${FOOD_API}/recipes/${id}/information?includeNutrition=true&addWinePairing=true&apiKey=${apiKey}`;

      try {
        const res = await axios.get(apiUrl, { signal });

        // 2. Axios data is automatically parsed as JSON
        res.data.groupedByAisle = res.data.extendedIngredients.reduce((accumulator, ingredient) => {
          const aisle = ingredient.aisle;

          // If the aisle doesn't exist in the accumulator, initialize it as an array
          if (!accumulator[aisle]) {
            accumulator[aisle] = [];
          }

          // Push the ingredient object (or a subset of its properties)
          accumulator[aisle].push({
            id: ingredient.id,
            name: ingredient.name,
            original: ingredient.original,
          });

          return accumulator;
        }, {});

        res.data.finalIngredientsArray = Object.entries(res.data.groupedByAisle).map(
          ([aisleName, ingredientList]) => {
            return {
              name: aisleName, // The key becomes the 'name' property
              list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
            };
          }
        );

        res.data.tags = [
          {
            heading: "Cheap",
            name: "cheap",
            icon: faDollarSign,
          },
          {
            heading: "Gluten Free",
            name: "glutenFree",
            icon: faWheatAwn,
          },
          {
            heading: "Sustainable",
            name: "sustainable",
            icon: faSeedling,
          },
          {
            heading: "Vegan",
            name: "vegan",
            icon: faLeaf,
          },
          {
            heading: "Vegetarian",
            name: "vegetarian",
            icon: faAppleWhole,
          },
          {
            heading: "Very Healthy",
            name: "veryHealthy",
            icon: faHeart,
          },
          {
            heading: "Very Popular",
            name: "veryPopular",
            icon: faStar,
          },
        ];

        res.data.tags.forEach((tags) => {
          tags.status = res.data[tags.name];
        });

        return res.data;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === MAX_TRY) {
          // 2. Axios data is automatically parsed as JSON
          offlineRecipeData.groupedByAisle = offlineRecipeData.extendedIngredients.reduce(
            (accumulator, ingredient) => {
              const aisle = ingredient.aisle;

              // If the aisle doesn't exist in the accumulator, initialize it as an array
              if (!accumulator[aisle]) {
                accumulator[aisle] = [];
              }

              // Push the ingredient object (or a subset of its properties)
              accumulator[aisle].push({
                id: ingredient.id,
                name: ingredient.name,
                original: ingredient.original,
              });

              return accumulator;
            },
            {}
          );

          offlineRecipeData.finalIngredientsArray = Object.entries(
            offlineRecipeData.groupedByAisle
          ).map(([aisleName, ingredientList]) => {
            return {
              name: aisleName, // The key becomes the 'name' property
              list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
            };
          });

          offlineRecipeData.tags = [
            {
              heading: "Cheap",
              name: "cheap",
              icon: faDollarSign,
            },
            {
              heading: "Gluten Free",
              name: "glutenFree",
              icon: faWheatAwn,
            },
            {
              heading: "Sustainable",
              name: "sustainable",
              icon: faSeedling,
            },
            {
              heading: "Vegan",
              name: "vegan",
              icon: faLeaf,
            },
            {
              heading: "Vegetarian",
              name: "vegetarian",
              icon: faAppleWhole,
            },
            {
              heading: "Very Healthy",
              name: "veryHealthy",
              icon: faHeart,
            },
            {
              heading: "Very Popular",
              name: "veryPopular",
              icon: faStar,
            },
          ];

          offlineRecipeData.tags.forEach((tags) => {
            tags.status = offlineRecipeData[tags.name];
          });

          return offlineRecipeData;
        }
      }
    }
  };
  const {
    data: recipe = {},
    isLoading: recipeLoading,
    error: recipeError,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: fetchRecipe,
    enabled: !!id,
    retry: 0,
    staleTime: 1000 * 60 * 2,
  });

  // Get similar Recipe
  const fetchSimilarRecipe = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing recipe id");

    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      if (signal?.aborted) {
        throw new Error("Request was aborted");
      }

      const apiKey = getRandomApiKey();
      const apiUrl = `${FOOD_API}/recipes/${id}/similar?number=6&apiKey=${apiKey}`;

      try {
        const res = await axios.get(apiUrl, { signal });
        return res.data;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === MAX_TRY) {
          const localRecipes = Array.from({ length: 6 }, () => ({
            ...offlineRecipeData,
          }));

          toast.error("Showing offline data. API LIMIT");

          return localRecipes;
        }
      }
    }
  };
  const {
    data: similarRecipe = [],
    isLoading: similarRecipeLoading,
    error: similarRecipeError,
  } = useQuery({
    queryKey: ["similar-recipe", id],
    queryFn: fetchSimilarRecipe,
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  // Get random recipe
  const fetchRandomRecipe = async ({ signal }) => {
    for (let attempt = 1; attempt <= MAX_TRY; attempt++) {
      if (signal?.aborted) {
        throw new Error("Request was aborted");
      }

      const apiKey = getRandomApiKey();
      const apiUrl = `${FOOD_API}/recipes/random?number=8&apiKey=${apiKey}`;

      try {
        const res = await axios.get(apiUrl, { signal });
        return res.data.recipes;
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === MAX_TRY) {
          const localRecipes = Array.from({ length: 8 }, () => ({
            ...offlineRecipeData,
          }));

          toast.error("Showing offline data. API LIMIT");

          return localRecipes;
        }
      }
    }
  };
  const {
    data: randomRecipe = [],
    isLoading: randomRecipeLoading,
    error: randomRecipeError,
  } = useQuery({
    queryKey: ["random-recipe"],
    queryFn: fetchRandomRecipe,
    enabled: recipe.id != null,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  // Get comments
  // Get comments
  const fetchComments = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing id");

    const BACKEND_API = `${BACKEND_COMMENT_URL}/${id}`;
    const res = await axios.get(BACKEND_API, { signal });
    return res.data;
  };
  const demoFetchComments = () => {
    let listComments = [];

    for (let comment in commentData) {
      let recipeId = commentData[comment].recipe_id.toString();
      if (recipeId === id) {
        for (let user in userData) {
          if (userData[user]._id.$oid === commentData[comment].user_id.$oid) {
            let temp_data = { ...userData[user] };
            temp_data._id = userData[user]._id.$oid;
            commentData[comment].user_id = temp_data;
            break;
          }
        }

        commentData[comment].createdAt = commentData[comment].createdAt.$date;

        listComments.push(commentData[comment]);
      }
    }

    return listComments;
  };
  const {
    data: listComments = [],
    isLoading: listCommentsLoading,
    error: listCommentsError,
  } = useQuery({
    queryKey: ["list-comment", id],
    queryFn: fetchComments,
    initialData: demoFetchComments,
    enabled: !!id && !DEMO_MODE,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  // check if the recipe has been bookmarked by the user
  const checkRecipeBookmarked = async ({ queryKey, signal }) => {
    const [, id] = queryKey;
    if (!id) throw new Error("Missing id");

    if (!token) {
      // Not logged in → treat as not bookmarked
      return { isBookmarked: false, message: "User not logged in" };
    }

    const res = await axios.get(`${BACKEND_BOOKMARK_URL}/status`, {
      params: { recipeId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    return res.data.isBookmarked; // { isBookmarked, message }
  };

  const demoCheckRecipeBookmarked = () => {
    if (isLoggedIn) {
      for (let bookmark in user?.bookmark) {
        console.log(user.bookmark[bookmark].recipe_id);
        if (id === user.bookmark[bookmark].recipe_id) {
          return true;
        }
      }
    }

    return false;
  };

  const {
    data: hasBookmarked = false,
    isLoading: hasBookmarkedLoading,
    error: hasBookmarkedError,
  } = useQuery({
    queryKey: ["has-bookmarked", id],
    queryFn: checkRecipeBookmarked,
    enabled: !!id && !!token && !DEMO_MODE, // only run if logged in
    retry: 1,
    staleTime: 1000 * 60 * 2,
    initialData: demoCheckRecipeBookmarked,
  });

  const addDemoBookmark = () => {
    if (!isLoggedIn || !user?.id) {
      return false;
    }

    // Clone user, avoid mutation
    const updatedUser = structuredClone(user);

    // Ensure bookmark array exists
    if (!Array.isArray(updatedUser.bookmark)) {
      updatedUser.bookmark = [];
    }

    // Create a new bookmark entry
    const newBookmark = {
      id: Date.now(), // unique ID
      user_id: updatedUser.id, // user reference
      recipe_id: id, // recipe being saved
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Prevent duplicates
    const alreadyBookmarked = updatedUser.bookmark.some((b) => b.recipe_id === id);
    if (!alreadyBookmarked) {
      updatedUser.bookmark.unshift(newBookmark);
    }

    // Save to localStorage
    localStorage.setItem("authUser", JSON.stringify(updatedUser));

    // Return updated user
    return true;
  };

  const addBookmarkMutation = useMutation({
    mutationFn: async () => {
      if (DEMO_MODE) {
        return addDemoBookmark(id);
      }

      const response = await axios.post(
        BACKEND_BOOKMARK_URL,
        { recipeId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // assume backend returns the new bookmark or status
      return response.data;
    },

    onSuccess: () => {
      // Option 1: directly set the cached status to true
      queryClient.setQueryData(["has-bookmarked", id], true);

      // Option 2 (alternative): invalidate so it refetches from backend
      // queryClient.invalidateQueries({ queryKey: ["has-bookmarked", id] });

      toast.success("You’ve bookmarked this recipe.");
    },

    onError: (error) => {
      console.error("Error adding bookmark:", error);
      const msg = error.response?.data?.message || "Failed to add bookmark.";
      toast.error(msg);
    },
  });

  const isAddingBookmark = addBookmarkMutation.isPending;

  //
  //

  const demoSubmitComment = () => {
    if (!isLoggedIn || !user?.id) {
      return false; // user not logged in
    }

    // Clone the user object to avoid mutation
    const updatedUser = structuredClone(user);

    // Ensure comment array exists
    if (!Array.isArray(updatedUser.comment)) {
      updatedUser.comment = [];
    }

    // Create new comment entry
    const newComment = {
      _id: {
        $oid: Date.now(),
      },
      user_id: {
        $oid: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        profile_image: updatedUser.profile_image,
      },
      recipe_id: id, // which recipe comment belongs to
      comment_text: "fafafafa",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add newest comment at the top
    updatedUser.comment.unshift(newComment);

    // Save to localStorage
    localStorage.setItem("authUser", JSON.stringify(updatedUser));

    return newComment;
  };

  const submitComment = async (commentText) => {
    if (DEMO_MODE) {
      return demoSubmitComment();
    }

    const commentPayload = {
      comment_text: commentText,
      recipe_id: Number(id),
    };

    const response = await axios.post(BACKEND_COMMENT_URL, commentPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // assuming your backend returns the new comment here:
    return response.data.comment;
  };

  const commentMutation = useMutation({
    mutationFn: submitComment,
    onSuccess: (newComment_api) => {
      // Update cache for ["list-comment", id]
      queryClient.setQueryData(["list-comment", id], (oldComments) => {
        if (!oldComments) return [newComment_api];
        return [newComment_api, ...oldComments];
      });

      setComment(""); // clear textarea/input
    },
    onError: (err) => {
      console.error("Comment submission failed:", err);
      const msg = err.response?.data?.message || "Failed to submit comment. Please try again.";
      setError(msg); // or toast.error(msg)
    },
  });

  // Handler for posting a comment
  async function handleCommentSubmit() {
    // Check if the user is even logged in
    if (!token) {
      openModal("need-login");
      return;
    }

    const trimmedComment = comment.trim();

    // Check if the comment is empty or not
    if (trimmedComment === "") {
      toast.error("Please enter a comment.");
      return;
    }

    commentMutation.mutate(trimmedComment);
  }

  async function handleAddToBookmark() {
    if (!token) {
      openModal("need-login");
      return;
    }

    addBookmarkMutation.mutate();
  }

  // Page title
  useEffect(() => {
    const title = recipe?.title ? recipe.title : "Loading recipe";
    document.title = `${title} | ${PAGE_NAME}`;
  }, [recipe?.title, PAGE_NAME]);

  // MEAL PLANNER
  function handleAddMealPlanner() {
    openModal("meal-planner");
    // toast.success("Added to meal planner!");
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {recipeLoading && <PageLoader />}

      {recipe?.id != null && (
        <div className="">
          <div className="w-10/12 max-w-7xl mx-auto mt-30 ">
            <Toaster position="top-center" reverseOrder={false} />

            {/* heading */}
            <div className="mb-10 relative">
              {/* side 1 */}
              <div className="">
                <div className={`flex flex-col uppercase gap-2 mb-7 `}>
                  <p className="italic text-sm md:text-base lg:text-lg">
                    Browse All Recipes by Category or Filter
                  </p>
                  <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold w-11/12">
                    {recipe.title}
                  </h1>
                </div>

                {/* mini data */}
                <div className="flex items-center flex-wrap gap-5">
                  {/* item */}
                  <div className="p-2 bg-green-900 gap-2 hidden text-white rounded-lg w-fit md:flex items-center">
                    <div className="px-2 py-1 bg-black/10 rounded-lg">{recipe.healthScore}</div>
                    <p>Health Score</p>
                  </div>

                  {/* tags */}
                  <div className="flex flex-wrap gap-5">
                    {/* item */}

                    {recipe.pricePerServing && (
                      <div className="flex flex-row items-center gap-2 ">
                        <FontAwesomeIcon icon={faDollarSign} className={``} />
                        <span className="text-lg lg:text-xl">{recipe.pricePerServing}</span>
                      </div>
                    )}

                    {recipe.spoonacularScore && (
                      <div className="flex flex-row items-center gap-2 ">
                        <FontAwesomeIcon icon={faTrophy} className={``} />
                        <span className="text-lg lg:text-xl">
                          {recipe.spoonacularScore.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {recipe.servings && (
                      <div className="flex flex-row items-center gap-2 ">
                        <FontAwesomeIcon icon={faUsers} className={``} />
                        <span className="text-lg lg:text-xl">{recipe.servings}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* side 2 */}
              <div className="absolute right-0 top-0 md:top-3 md:right-3 lg:top-5 lg:right-5 hidden md:block">
                {isAddingBookmark ? (
                  <span className="animate-spin mr-2 border-t-2 border-green-900 rounded-full w-4 h-4 inline-block"></span>
                ) : (
                  <FontAwesomeIcon
                    icon={hasBookmarked ? faBookmarked : faBookmark}
                    className="text-green-900 w-10 h-10 cursor-pointer"
                    size="2x"
                    onClick={handleAddToBookmark}
                  />
                )}
              </div>
            </div>

            {/* image */}
            <div className="py-10 border-t border-black/10">
              <div className="h-60 md:h-[50vh] lg:h-[60vh] ">
                <img
                  src={recipe.image}
                  alt=""
                  className="object-cover object-center h-full w-full rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* clock */}
            <div className="flex flex-col gap-7 mb-15 md:flex-row md:items-center md:justify-center lg:justify-start">
              {/* item */}
              <RecipeTime heading="Preparation time" time={recipe.preparationMinutes} />
              <RecipeTime heading="Cooking for" time={recipe.cookingMinutes} />
              <RecipeTime heading="Ready in" time={recipe.readyInMinutes} />
            </div>

            {/* content */}
            <div className="lg:flex gap-10 justify-between ">
              {/* side 1 */}
              <div className="lg:w-8/12">
                {/* paragraph */}
                <p
                  className="font-light text-[#333] max-w-prose text-base md:text-lg  xl:text-xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />

                {/* tags */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 border my-20 bg-white p-10 rounded-lg gap-5 border-black/10 text-black ">
                  {recipe.tags.map((tag, index) => (
                    <IconItem icon={tag.icon} name={tag.heading} key={index} status={tag.status} />
                  ))}
                </div>

                <Tags className="lg:hidden my-20" />

                {/* Ingredients */}
                <div className="my-14">
                  {/* heading */}
                  <Heading name="Ingredients" step={`${recipe.extendedIngredients.length} items`} />

                  <div className="flex flex-col gap-7">
                    {recipe.finalIngredientsArray.map((item, index) => (
                      <div className="" key={index}>
                        <h3 className="text-xl lg:text-2xl font-medium text-[#333]">{item.name}</h3>

                        <ul className="flex flex-col gap-3 mt-5 ms-2">
                          {item.list.map((listItem, indexs) => (
                            <ListItem key={indexs}>
                              <div className="rounded-full border w-5 h-5"></div>
                              <p>{listItem.original}</p>
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wine Pairing */}
                <div className="my-20">
                  <Heading name="Wine Pairing" />

                  {/* If no wine data */}
                  {!recipe?.winePairing?.pairedWines?.length && (
                    <ListItem>No wine pairings available for this recipe.</ListItem>
                  )}

                  {/* Paired Wines */}
                  {recipe?.winePairing?.pairedWines?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {recipe.winePairing.pairedWines.map((wine) => (
                        <span
                          key={wine}
                          className="px-3 py-1 text-sm rounded-full bg-rose-100 text-rose-700 font-medium"
                        >
                          {wine}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pairing Text */}
                  {recipe?.winePairing?.pairingText && (
                    <p className="mt-6 text-gray-700 leading-relaxed">
                      {recipe.winePairing.pairingText}
                    </p>
                  )}

                  {/* Product Match */}
                  {recipe?.winePairing?.productMatches?.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-lg font-semibold mb-4">Featured Wine</h3>

                      {recipe.winePairing.productMatches.map((product) => (
                        <div
                          key={product.id}
                          className="border border-black/10 rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition"
                        >
                          {/* Image */}
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-32 h-24 object-cover rounded-md"
                          />

                          {/* Info */}
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold">{product.title}</h4>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span className="font-medium text-rose-600">{product.price}</span>
                              <span>•</span>
                              <span>
                                ⭐ {product.averageRating} ({product.ratingCount} reviews)
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                              {product.description}
                            </p>

                            {/* Button */}
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 text-sm bg-rose-600 text-white px-3 py-1.5 rounded-lg hover:bg-rose-700"
                            >
                              View Product
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="my-20">
                  {/* heading */}
                  <Heading name="Instructions" />

                  {/* If no instructions */}
                  {recipe?.analyzedInstructions.length === 0 && (
                    <p className="text-gray-500 italic mt-4">
                      No instructions available for this recipe.
                    </p>
                  )}

                  {/* list */}
                  <ul className="flex flex-col gap-5">
                    {recipe?.analyzedInstructions[0]?.steps?.map((step, index) => (
                      <li className="flex gap-5 items-start" key={index}>
                        {/* numbering */}
                        <div className="w-7 h-7 rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                          <p>{step.number}</p>
                        </div>

                        <Paragraph className={"flex-1"}>{step.step}</Paragraph>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition Facts */}
                <NutritionFacts className="block lg:hidden my-14" data={recipe.nutrition} />

                {/* feedback */}
                <Feedback className="hidden lg:text-center lg:flex my-20" />
              </div>

              {/* side 2 */}
              <div className="flex-1 ">
                {/* tags */}
                {/* <Tags className="hidden lg:flex mb-14" /> */}

                {/* Add to meal planner */}
                <div className="">
                  <button
                    onClick={handleAddMealPlanner}
                    className="w-full px-5 py-5 bg-green-900 text-white rounded-lg shadow-md hover:bg-green-800 transition duration-150 cursor-pointer"
                  >
                    Add to Meal Planner
                  </button>
                </div>

                {/* nutrition */}
                <NutritionFacts className="hidden lg:block my-14" data={recipe.nutrition} />

                {/* recipes */}
                <div className="my-14">
                  {/* heading */}
                  <div className="mb-10">
                    <h2 className="text-3xl uppercase font-semibold">Explore Recipes</h2>
                  </div>

                  {/* parent */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5">
                    {similarRecipe.map((recipee, index) => (
                      <RecipeItem
                        key={index}
                        name={recipee.title}
                        image_name={recipee.image}
                        id={recipee.id}
                      />
                    ))}
                  </div>
                </div>

                {/* feedback */}
                <Feedback className="lg:hidden my-20" />
              </div>
            </div>

            {/* Comment */}
            <div className="mt-40 lg:w-8/12 lg:mx-auto">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-5">Already made this?</h2>
              <button className="px-7 py-4 border rounded-lg mb-10">Share your feedback</button>
              <div className="h-2 bg-green-900 mb-10"></div>
              <h3 className="text-xl lg:text-2xl font-semibold mt-30 mb-10">
                ({listComments.length}) Comments
              </h3>

              {/* actual comments */}
              <div className="flex flex-col gap-14">
                {listComments.length > 0 ? (
                  <>
                    {listComments.map((comment, index) => (
                      <div
                        key={index} // 2. Added key prop (REQUIRED in lists)
                        className="gap-5 border-t border-black/10 pt-14 flex items-start"
                      >
                        <a href={`/profile/${comment.user_id._id}`}>
                          <img
                            src={comment.user_id.profile_image}
                            alt={`${comment.user_id.firstName}'s profile`}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300 shadow-md"
                          />
                        </a>
                        <div className="flex-1">
                          <a href={`/profile/${comment.user_id._id}`}>
                            <h4 className="text-xl font-medium">
                              {comment.user_id.firstName} {comment.user_id.lastName}
                            </h4>
                          </a>
                          <p className="text-sm">{formatCommentDate(comment.createdAt)}</p>

                          <Paragraph className={"mt-3"}>{comment.comment_text}</Paragraph>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  // **FALSE BLOCK: If no comments are present, render the empty state**
                  <div className="py-10 text-center border border-dashed border-gray-300 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">
                      Be the First to Share Your Feedback! 📝
                    </h4>
                    <p className="text-gray-500">
                      There are no comments available for this recipe yet.
                    </p>
                    {/* You can optionally include a call to action */}
                    <button className="mt-5 px-5 py-2 text-sm cursor-pointer text-white bg-green-800 rounded-lg hover:bg-green-700 transition duration-150 shadow-md">
                      Write a Comment Now
                    </button>
                  </div>
                )}
              </div>

              {/* write a comment */}
              <div className="my-40">
                <div className="flex justify-between items-center mb-5">
                  <div className="">
                    <h5 className="text-2xl lg:text-3xl font-bold">Write a comment</h5>
                  </div>
                  <div className="">
                    {!isLoggedIn && (
                      <button
                        className="underline cursor-pointer"
                        onClick={() => openModal("login")}
                      >
                        Login to comment
                      </button>
                    )}
                  </div>
                </div>

                <div className="min-h-[50vh] lg:min-h-[30vh] p-5 border border-black/10 rounded-lg bg-white shadow-md relative">
                  <textarea
                    name=""
                    className="w-full min-h-[50vh] lg:min-h-[30vh] rounded-lg p-1"
                    placeholder="Write your thoughts"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>

                  <Button className="absolute right-5 bottom-5" onClick={handleCommentSubmit}>
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Section - Popular Recipes */}
          <div className="bg-white py-40 border-t border-black/10">
            <div className="w-10/12 mx-auto max-w-7xl">
              {/* Heading */}
              <SectionHeading
                heading={"Popular Recipes"}
                subheading={"Discover delicious meals for every ocean"}
              />

              {/* parent */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
                {randomRecipeLoading ? (
                  <>
                    {[...Array(8)].map((_, index) => (
                      <RecipeItemSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {randomRecipe.map((popularRecipe, index) => (
                      <RecipeItem
                        key={index}
                        name={popularRecipe.title}
                        image_name={popularRecipe.image}
                        id={popularRecipe.id}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section - mail letter */}
          <MailLetter />

          {/* Footer */}
          <Footer />
        </div>
      )}

      {modalType === "need-login" && <NeedLogin />}
      {modalType === "meal-planner" && <AddMealMealPlanner recipeId={id} />}
    </>
  );
}
