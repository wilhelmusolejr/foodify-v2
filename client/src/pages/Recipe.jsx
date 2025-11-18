import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faDollarSign, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";

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

// Library
import axios from "axios";

import recipeData from "./data.json";

export default function Recipe() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const { id } = useParams();

  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  // useEffect hook to handle the asynchronous data fetching
  useEffect(() => {
    if (!id) return;

    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    const randomIndex = Math.floor(Math.random() * recipeData.length);
    const randomRecipe = recipeData[randomIndex];

    const fetchRecipeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

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

        setRecipe(response.data);
      } catch (err) {
        // if reached 50 points
        if (err.response.data.message.includes("upgrade your plan")) {
          // 2. Axios data is automatically parsed as JSON
          randomRecipe.groupedByAisle = randomRecipe.extendedIngredients.reduce(
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

          randomRecipe.finalIngredientsArray = Object.entries(randomRecipe.groupedByAisle).map(
            ([aisleName, ingredientList]) => {
              return {
                name: aisleName, // The key becomes the 'name' property
                list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
              };
            }
          );

          setRecipe(randomRecipe);
        }

        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

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
                    <span className="text-lg lg:text-xl">{recipe.spoonacularScore.toFixed(2)}</span>
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
              <FontAwesomeIcon icon={faBookmark} className="text-green-900 w-10 h-10" size="3x" />
            </div>
          </div>

          {/* image */}
          <div className="py-10 border-t border-black/10">
            <div className="h-60 md:h-[50vh] lg:h-[60vh]">
              <img
                src={recipe.image}
                alt=""
                className="object-cover object-center h-full w-full rounded-xl"
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
          <div className="lg:flex gap-20 justify-between ">
            {/* side 1 */}
            <div className="lg:w-10/12">
              {/* paragraph */}
              <p
                className="font-light text-[#333] max-w-prose text-base md:text-lg  xl:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />

              {/* tags */}
              <Tags className="lg:hidden my-20" />

              {/* Ingredients */}
              <div className="my-14">
                {/* heading */}
                <Heading name="Ingredients" step="0/12" />

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

              {recipe.instructions != "" && (
                <div className="my-14">
                  {/* heading */}
                  <Heading name="Instructions" />

                  {/* list */}
                  <ul className="flex flex-col gap-5">
                    <li className="flex gap-5 items-start">
                      {/* numbering */}
                      <div className="w-7 h-7  rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                        <p>1</p>
                      </div>
                      <Paragraph className={"flex-1"}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor
                        quos, asperiores iure odit, eos suscipit vero quaerat molestiae aperiam
                        nihil ullam! Qui, commodi provident? Architecto officia voluptate natus
                        obcaecati.
                      </Paragraph>
                    </li>
                    <li className="flex gap-5 items-start">
                      {/* numbering */}
                      <div className="w-7 h-7  rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                        <p>2</p>
                      </div>
                      <Paragraph className={"flex-1"}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor
                        quos, asperiores iure odit, eos suscipit vero quaerat molestiae aperiam
                        nihil ullam! Qui, commodi provident? Architecto officia voluptate natus
                        obcaecati.
                      </Paragraph>
                    </li>
                    <li className="flex gap-5 items-start">
                      {/* numbering */}
                      <div className="w-7 h-7  rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                        <p>3</p>
                      </div>
                      <Paragraph className={"flex-1"}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor
                        quos, asperiores iure odit, eos suscipit vero quaerat molestiae aperiam
                        nihil ullam! Qui, commodi provident? Architecto officia voluptate natus
                        obcaecati.
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              )}

              {/* Nutrition Facts */}
              <NutritionFacts className="block lg:hidden my-14" />

              {/* feedback */}
              <Feedback className="hidden lg:text-center lg:flex my-20" />
            </div>

            {/* side 2 */}
            <div className="lg:max-w-[300px] xl:max-w-[450px] ">
              {/* tags */}
              <Tags className="hidden lg:flex mb-14" />

              {/* nutrition */}
              <NutritionFacts className="hidden lg:block my-14" />

              {/* recipes */}
              <div className="my-14">
                {/* heading */}
                <div className="mb-10">
                  <h2 className="text-3xl uppercase font-semibold">Explore Recipes</h2>
                </div>

                {/* parent */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
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
            <h3 className="text-xl lg:text-2xl font-semibold mt-30 mb-10">(36) Comments</h3>

            {/* actual comments */}
            <div className="flex flex-col gap-14">
              {/* item */}
              <div className="flex gap-5 border-t border-black/10 pt-14">
                <div className="w-10 h-10 rounded-full bg-black"></div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium">Wihelmus Ole</h4>
                  <p className="text-sm">42 mins ago</p>

                  <Paragraph className={"mt-3"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Paragraph>
                </div>
              </div>

              {/* item */}
              <div className="flex gap-5 border-t border-black/10 pt-14">
                <div className="w-10 h-10 rounded-full bg-black"></div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium">Wihelmus Ole</h4>
                  <p className="text-sm">42 mins ago</p>

                  <Paragraph className={"mt-3"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* write a comment */}
            <div className="my-40">
              <div className="flex justify-between items-center mb-5">
                <div className="">
                  <h5 className="text-2xl font-bold">Write a comment</h5>
                </div>
                <div className="">
                  <p className="underline">Login</p>
                </div>
              </div>

              <div className="min-h-[50vh] lg:min-h-[30vh] p-5 border border-black/10 rounded-lg bg-white shadow-md relative">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolores aliquam
                  eveniet ea odio, porro dicta libero rem tempore quo?
                </p>

                <button className="bg-black text-white px-5 py-3 rounded-lg absolute right-5 bottom-5">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
