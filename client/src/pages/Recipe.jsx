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

import { formatCommentDate } from "../utils/dateUtils";

import { useAuthStore } from "../stores/useAuthStore";

// Library
import axios from "axios";

import recipeData from "./recipe.json";
import IconItem from "../components/IconItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";

export default function Recipe() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const runLocal = import.meta.env.VITE_RUN_LOCAL === "TRUE" ? true : false;

  const { id } = useParams();

  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [listComments, setListComments] = useState([]);
  const [hasBookmarked, setHasBookmarked] = useState(false);

  // Get recipe information
  useEffect(() => {
    if (!id) return;

    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&addWinePairing=true&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (runLocal) {
          throw new Error("upgrade your plan");
        }

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);

        // 2. Axios data is automatically parsed as JSON
        response.data.groupedByAisle = response.data.extendedIngredients.reduce(
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

        response.data.finalIngredientsArray = Object.entries(response.data.groupedByAisle).map(
          ([aisleName, ingredientList]) => {
            return {
              name: aisleName, // The key becomes the 'name' property
              list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
            };
          }
        );

        response.data.tags = [
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

        response.data.tags.forEach((tags) => {
          tags.status = response.data[tags.name];
        });

        setRecipe(response.data);
      } catch (err) {
        // if reached 50 points
        if (err.message.includes("upgrade your plan")) {
          let DATA_FROM_API = recipeData;

          DATA_FROM_API.groupedByAisle = DATA_FROM_API.extendedIngredients.reduce(
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

          DATA_FROM_API.finalIngredientsArray = Object.entries(DATA_FROM_API.groupedByAisle).map(
            ([aisleName, ingredientList]) => {
              return {
                name: aisleName, // The key becomes the 'name' property
                list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
              };
            }
          );

          DATA_FROM_API.tags = [
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

          DATA_FROM_API.tags.forEach((tags) => {
            tags.status = DATA_FROM_API[tags.name];
          });

          setRecipe(DATA_FROM_API);
        }

        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  // Get similar Recipe
  useEffect(() => {
    if (!id) return;

    const apiUrl = `https://api.spoonacular.com/recipes/${id}/similar?number=6&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (runLocal) {
          throw new Error("upgrade your plan");
        }

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);

        setRecipe((prevSettings) => ({
          ...prevSettings,
          ["similarRecipe"]: response.data,
        }));
      } catch (err) {
        // if reached 50 points
        if (err.message.includes("upgrade your plan")) {
          let DATA_FROM_API = [];

          for (let i = 0; i < 6; i++) {
            DATA_FROM_API.push(recipeData);
          }

          setRecipe((prevSettings) => ({
            ...prevSettings,
            ["similarRecipe"]: DATA_FROM_API,
          }));
        }

        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  // Get random recipe
  useEffect(() => {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=8&apiKey=${apiKey}`;

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (runLocal) {
          throw new Error("upgrade your plan");
        }

        // 1. Axios handles the request
        const response = await axios.get(apiUrl);

        // 2. Axios data is automatically parsed as JSON
        setRecipe((prevSettings) => ({
          ...prevSettings,
          ["random"]: response.data.recipes,
        }));
      } catch (err) {
        // if reached 50 points
        if (err.message.includes("upgrade your plan")) {
          let DATA_FROM_API = [];

          for (let i = 0; i < 8; i++) {
            DATA_FROM_API.push(recipeData);
          }

          setRecipe((prevSettings) => ({
            ...prevSettings,
            ["random"]: DATA_FROM_API,
          }));
        }
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, []);

  // Get comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // api url
        const BACKEND_API = `http://localhost:5001/api/comment/${id}`;

        // request
        const response = await axios.get(BACKEND_API);

        setListComments(response.data);

        console.log(response.data);
      } catch (err) {
        console.error("error getting comments:", err);
      }
    };

    fetchComments();
  }, [id]);

  // check if the recipe has been bookmarked by the user
  useEffect(() => {
    const fetchComments = async () => {
      const token = useAuthStore.getState().token;

      const payload = {
        recipeId: id,
      };

      // Prevent unnecessary calls
      if (!token || !id) return;

      try {
        // api url
        const BACKEND_API = `http://localhost:5001/api/bookmark/status`;

        // request
        const response = await axios.get(BACKEND_API, {
          params: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHasBookmarked(response.data.isBookmarked);
      } catch (err) {
        console.error("error getting recipe bookmark status:", err);
      }
    };

    fetchComments();
  }, [id]);

  // Handler for posting a comment
  async function handleCommentSubmit() {
    const token = useAuthStore.getState().token;
    const trimmedComment = comment.trim();

    // Check if the user is even logged in
    if (!token) {
      alert("You must be logged in to post a comment.");
      return;
    }

    // Check if the comment is empty or not
    if (trimmedComment === "") {
      alert("Please enter a comment.");
      return;
    }

    // submit data to database
    const BACKEND_API = "http://localhost:5001/api/comment"; // Your backend endpoint

    const commentPayload = {
      comment_text: trimmedComment,
      recipe_id: Number(id),
    };

    try {
      const response = await axios.post(BACKEND_API, commentPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newComment_api = response.data.comment;

      setListComments((prevComments) => [newComment_api, ...prevComments]);
      setComment("");
    } catch (err) {
      // 6. Error Handling
      console.error("Comment submission failed:", err);
      setError(err.response?.data?.message || "Failed to submit comment. Please try again.");
    }
  }

  async function handleAddToBookmark() {
    const token = useAuthStore.getState().token;

    const payload = {
      recipeId: id,
    };

    const BACKEND_API = "http://localhost:5001/api/bookmark";

    try {
      const response = await axios.post(BACKEND_API, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHasBookmarked(true);
    } catch (error) {
      console.error("Error adding bookmark:", error.response.data.message);
      console.error("Error adding bookmark:", error);
    }
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {isloading && (
        <div className="max-w-7xl mx-auto px-4 mt-30 sm:px-6 lg:px-8 py-10 animate-pulse">
          {/* 1. Header Section: Title and Quick Info */}
          <div className="mb-10">
            {/* Title Placeholder */}
            <div className="h-10 bg-gray-300 rounded w-3/4 md:w-1/2 mb-4"></div>
            {/* Subtitle/Time Placeholder */}
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
          </div>

          {/* 2. Main Content Grid (Image and Details) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column (Main Image Placeholder) */}
            <div className="md:col-span-2">
              <div className="aspect-video bg-gray-300 rounded-xl h-96"></div>

              {/* Summary Placeholder */}
              <div className="mt-8">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            {/* Right Column (Nutritional/Source Info) */}
            <div className="md:col-span-1 space-y-4">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* 3. Ingredients/Instructions Section */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ingredients List Placeholder */}
            <div>
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div> {/* Section Heading */}
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Instructions/Steps Placeholder */}
            <div>
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div> {/* Section Heading */}
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
            </div>
          </div>
        </div>
      )}

      {recipe != null && (
        <div className="">
          <div className="w-10/12 max-w-7xl mx-auto mt-30 ">
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
                    <div className="flex flex-row items-center gap-2 ">
                      <FontAwesomeIcon icon={faDollarSign} className={``} />
                      <span className="text-lg lg:text-xl">{recipe.pricePerServing}</span>
                    </div>

                    <div className="flex flex-row items-center gap-2 ">
                      <FontAwesomeIcon icon={faTrophy} className={``} />
                      <span className="text-lg lg:text-xl">
                        {recipe.spoonacularScore.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-row items-center gap-2 ">
                      <FontAwesomeIcon icon={faUsers} className={``} />
                      <span className="text-lg lg:text-xl">{recipe.servings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* side 2 */}
              <div className="absolute right-0 top-0 md:top-3 md:right-3 lg:top-5 lg:right-5 hidden md:block">
                <FontAwesomeIcon
                  icon={hasBookmarked ? faBookmarked : faBookmark}
                  className="text-green-900 w-10 h-10 cursor-pointer"
                  size="3x"
                  onClick={handleAddToBookmark}
                />
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

                {/* Equipments */}
                <div className="my-14">
                  {/* heading */}
                  <Heading name="Equipments" step="0/12" />

                  {/* item */}
                  <ul className="flex flex-col gap-3 mt-5 ms-2">
                    <ListItem>
                      <div className="rounded-full border w-5 h-5"></div>
                      <p>120 extra virgin olive oil</p>
                    </ListItem>
                  </ul>
                </div>

                {recipe?.analyzedInstructions?.[0]?.steps?.length > 0 && (
                  <div className="my-14">
                    {/* heading */}
                    <Heading name="Instructions" />

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
                )}

                {/* Nutrition Facts */}
                <NutritionFacts className="block lg:hidden my-14" data={recipe.nutrition} />

                {/* feedback */}
                <Feedback className="hidden lg:text-center lg:flex my-20" />
              </div>

              {/* side 2 */}
              <div className="flex-1">
                {/* tags */}
                <Tags className="hidden lg:flex mb-14" />

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
                    {recipe.similarRecipe?.map((recipee, index) => (
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
                        <img
                          src={`https://placehold.co/40x40/4c3c3a/ffffff?text=${comment.user_id.firstName[0]}`}
                          alt={`${comment.user_id.firstName}'s profile`}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300 shadow-md"
                        />
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
                    <p className="underline">Login</p>
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

                  <button
                    className="bg-black cursor-pointer text-white px-5 py-3 rounded-lg absolute right-5 bottom-5"
                    onClick={handleCommentSubmit}
                  >
                    Comment
                  </button>
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
                {isloading && (
                  <>
                    {[...Array(8)].map((_, index) => (
                      <RecipeItemSkeleton key={index} />
                    ))}
                  </>
                )}

                {!isloading && recipe?.random?.length > 0 && (
                  <>
                    {recipe.random.map((popularRecipe, index) => (
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
    </>
  );
}
