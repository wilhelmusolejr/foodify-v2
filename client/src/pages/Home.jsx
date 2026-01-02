import React, { useEffect, useState } from "react";
import "../App.css";

// Components
import BlogItem from "@components/BlogItem";
import CategoryItem from "@components/CategoryItem";
import CategoryListItem from "@components/CategoryListItem";
import HeadingImage from "@components/Home/HeadingImage";
import SectionHeading from "@components/SectionHeading";
import StatCard from "@components/StatCard";
import Navigator from "@components/Navigator";
import IngredientListItem from "@components/ingredientListItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import Paragraph from "@components/Paragraph";
import RecipeItemSkeleton from "@components/RecipeItemSkeleton";
import RecipeItem from "@components/RecipeItem";
import SearchButton from "@components/SearchButton";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// Library
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// UTILS
import { getRandomApiKey } from "../utils/apiUtils";
import { ENV } from "@/config/env";
import { useQuery } from "@tanstack/react-query";
import { fadeUp, staggerContainer } from "@/animations/motionVariants";

// recipe data
// recipe data
import offlineRecipeData from "./recipe.json";

// JSON
import blogData from "@/demo/blogs.json";

function Home() {
  // ENV
  const SEARCH_URL = `${ENV.frontEndUrl}/search`;
  const apiKey = getRandomApiKey();

  // STATE
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [ingredientError, setIngredientError] = useState(false);
  const [ingredient, setIngredient] = useState("");

  function addIngredient(ingredient) {
    if (ingredient.trim() === "") {
      setIngredientError(true);
      return;
    }

    setCurrentIngredients((prev) => [...prev, ingredient]);
    setIngredient("");
    setIngredientError(false);
  }

  function removeIngredient(indexToRemove) {
    setCurrentIngredients(currentIngredients.filter((_, index) => index !== indexToRemove));
  }

  // HANDLER
  function handleSearch() {
    const searchParameters = {
      array: [{ key: "includeIngredients", value: currentIngredients, separator: "," }],
    };

    let urlParameter = {};

    // 1. Process Array Filters (e.g., diet, intolerances)
    searchParameters.array.forEach((filter) => {
      // Check if the array exists and has elements
      if (filter.value && filter.value.length > 0) {
        urlParameter[filter.key] = filter.value.join(filter.separator);
      }
    });

    let params = new URLSearchParams(urlParameter);

    let finalUrl = `${SEARCH_URL}?${params}`;
    window.location.href = finalUrl;
  }

  // FETCH RECIPE DATA
  const fetchRecipesFromApi = async ({ signal }) => {
    for (let attempt = 1; attempt <= ENV.maxTry; attempt++) {
      if (signal?.aborted) {
        throw new Error("Request was aborted");
      }

      const apiKey = getRandomApiKey();

      try {
        const url = `${ENV.foodApiUrl}/recipes/random?number=17&apiKey=${apiKey}`;
        const res = await axios.get(url, { signal });
        return Array.isArray(res.data?.recipes) ? res.data.recipes : [];
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.warn(`Attempt ${attempt} failed (status: ${status}): ${message}`);

        if (attempt === ENV.maxTry) {
          // last attempt – fallback
          const localRecipes = Array.from({ length: 20 }, () => ({
            ...offlineRecipeData,
          }));

          toast.error("Showing offline data. API LIMIT");

          return localRecipes;
        }
      }
    }
  };

  const {
    data: recipes = {},
    isLoading,
    error: recipeError,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipesFromApi,
    enabled: !!ENV.foodApiUrl && !!apiKey, // only run if config exists
    select: (recipesData = []) => ({
      popular: recipesData.slice(0, 8),
      explore: recipesData.slice(8, 13),
      heading: recipesData.slice(13, 16),
    }),
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    document.title = `Discover | ${ENV.pageName}`;
  }, []);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <Toaster position="top-center" reverseOrder={false} />

      {/* Head */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="header min-h-[80vh] xl:min-h-[75vh] my-10 md:my-14 py-20 text-white flex justify-center items-center bg-white border border-black/10"
      >
        <div className="w-10/12 mx-auto max-w-7xl flex flex-col gap-20">
          {/* GROUP 1 */}
          <div className="">
            {/* heading */}
            <h1 className="text-2xl md:text-3xl xl:text-5xl max-w-4xl mb-4 autour-one">
              Discover, share, and savor. Delicious recipes from around the world.
            </h1>

            {/* paragraph */}
            <Paragraph className="mb-10 text-[#f5f5f5]">
              Unlock a world of variety culinary recipes and unleash your inner beauty the easy way
              with Foodify.
            </Paragraph>

            {/* button */}
            <div className="btn">
              <button className="bg-[#2B4A13] text-white px-5 uppercase py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>

          {/* GROUP 2 */}
          <div className=" flex gap-5 flex-wrap justify-center items-center xl:flex-nowrap xl:flex-row-reverse xl:justify-between">
            {/* stats */}
            <div className="flex justify-center gap-5 flex-1">
              <StatCard number="2500+" label="Recipes" />
              <StatCard number="2500+" label="Deliveries" />
              <StatCard number="2500+" label="Users" />
            </div>

            {/* images */}
            <div className="flex gap-5 overflow-auto md pb-5">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div className={`min-w-[200px] h-[150px] rounded-md animate-pulse`} key={index}>
                      <div className="w-full h-full rounded-sm bg-gray-300" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {recipes.heading.map((headingRecipe, index) => (
                    <HeadingImage
                      image_name={headingRecipe.image}
                      id={headingRecipe.id}
                      key={index}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section - Categories */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="bg-white py-40 border-t border-black/10"
      >
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <SectionHeading
            heading={"Explore meal types"}
            subheading={"Discover delicious meals for every ocean"}
          />

          {/* list */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* item */}
            <motion.div variants={fadeUp}>
              <CategoryItem image_path="images/category/category1.png" title="Main course" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CategoryItem image_path="images/category/category2.png" title="Sea food" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CategoryItem image_path="images/category/category3.png" title="Dessert" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <CategoryItem image_path="images/category/category4.png" title="Salad" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Section - Recipe Finder */}
      <div className="py-40 border-t border-black/10">
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <SectionHeading
            heading={"What's in Your Fridge?"}
            subheading={"Turn Your Leftovers into Delicious Meals"}
            className={"md:text-center"}
          />

          <Paragraph className="mx-auto mb-20">
            This interactive tool lets you enter ingredients from your fridge or pantry (like
            apples, flour, or sugar) and instantly generates recipe ideas that match what you have.
            Prioritize recipes that maximize your available items or minimize missing ones, while
            optionally ignoring pantry staples like salt or water. Perfect for reducing food waste
            and whipping up quick meals!
          </Paragraph>

          {/* modal */}
          <div className="border-black/10 border rounded-lg p-4  bg-green-900 text-white md:w-2/3 lg:w-full lg:max-w-[1000px] mx-auto">
            <h2 className="uppercase text-xl pb-4 md:pb-5">Recipe finder tool</h2>
            <div className="flex flex-col lg:flex-row min-h-90">
              {/* box 1 */}
              <div className="px-4 xl:px-10 py-10 md:px-5 bg-white text-black rounded-lg rounded-b-none border-b-2 border-green-900 lg:rounded-e-none lg:rounded-s-lg lg:border-e-2 lg:border-b-0">
                <div className="flex flex-col gap-6 justify-between">
                  {/* heading */}
                  <div className="">
                    <h3 className="text-2xl mb-3">Tell us what ingredients you have!</h3>
                    <Paragraph className="mx-auto mb-10">
                      Type the first ingredient you have in the search box and pick the best match
                      from the drop down. We need a minimum of 3 ingredients to find you some
                      recipes.
                    </Paragraph>
                  </div>

                  {/* form */}
                  <div className="flex gap-3 flex-wrap ">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="e.g. chicken, rice, broccoli"
                        className={`w-full border  ${ingredientError ? "border-red-500" : "border-black/50"} rounded-lg px-4 py-3 pr-10 focus:outline-none`}
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                      />
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className={`absolute right-3 top-1/2 -translate-y-1/2  pointer-events-none ${ingredientError ? "text-red-500" : "text-transparent"}`}
                      />
                    </div>
                    <button
                      disabled={ingredient === ""}
                      className={`bg-black min-w-30 w-full hover:bg-gray-800 cursor-pointer
                      }} cursor-pointer lg:w-30 text-white px-4 py-3 rounded-lg uppercase flex gap-2 justify-center items-center`}
                      onClick={() => addIngredient(ingredient)}
                    >
                      <p>add</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* box 2 */}
              <div className="px-4 xl:px-10 py-10 relative md:px-5 bg-white min-h-80 lg:min-w-90 lg:max-w-90 text-black rounded-lg rounded-t-none lg:rounded-e-lg lg:rounded-s-none overflow-hidden">
                <h3 className="text-2xl mb-4">Your ingredients list</h3>

                {currentIngredients.length > 0 && (
                  <SearchButton onClick={handleSearch} className="absolute right-5 bottom-5" />
                )}

                <div className="h-full ">
                  {/* content */}
                  {currentIngredients.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {currentIngredients.map((ingredient, index) => (
                        <IngredientListItem
                          key={index}
                          name={ingredient}
                          onRemove={() => removeIngredient(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full py-10 text-gray-500">
                      <FontAwesomeIcon icon={faBoxOpen} className="text-5xl mb-3 opacity-60" />
                      <p className="text-lg font-medium">No ingredients yet</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Start adding items to build your list.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section - Popular Recipes */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white py-40 border-t border-black/10"
      >
        <div className="w-10/12 mx-auto max-w-7xl">
          {/* Heading */}
          <SectionHeading
            heading={"Popular Recipes"}
            subheading={"Discover delicious meals for every ocean"}
          />

          {/* parent */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <>
                {[...Array(8)].map((_, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <RecipeItemSkeleton />
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {recipes.popular.map((popularRecipe, index) => (
                  <motion.div key={popularRecipe.id} variants={fadeUp}>
                    <RecipeItem
                      name={popularRecipe.title}
                      image_name={popularRecipe.image}
                      id={popularRecipe.id}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Section - Blog */}
      <div className="py-40 border-t border-black/10">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col lg:flex-row gap-50 lg:gap-10 max-w-7xl mx-auto">
            {/* side 1 */}
            <div className="flex-1">
              <SectionHeading
                heading={"Community Picks"}
                subheading={"Top-Rated Recipes from Our Cooking Community This Week"}
                className={"text-left"}
              />

              {/* parent */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {blogData.map((blog, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <BlogItem
                      heading={blog.header}
                      date={blog.date}
                      description={blog.description}
                      imageUrl={blog.image_name}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* side 2 */}
            <div className="flex flex-col gap-20 lg:w-[300px] xl:w-[350px] ">
              {/* recipes */}
              <div className="">
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold">Explore Recipes</h2>
                </div>

                {/* parent */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                  {isLoading ? (
                    <>
                      {[...Array(6)].map((_, index) => (
                        <RecipeItemSkeleton key={index} />
                      ))}
                    </>
                  ) : (
                    <>
                      {recipes.explore.map((exploreRecipe, index) => (
                        <RecipeItem
                          key={index}
                          name={exploreRecipe.title}
                          image_name={exploreRecipe.image}
                          id={exploreRecipe.id}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Category list */}
              <div className="w-full md:w-2/3 mx-auto lg:w-full">
                {/* heading */}
                <div className="py-10 text-center rounded-lg rounded-b-none bg-black text-white">
                  <h2 className="text-2xl uppercase">Recipe collections</h2>
                </div>
                {/* list */}
                <div className="bg-slate-200 rounded-lg rounded-t-none border border-black/10 border-t-none">
                  {/* item */}
                  <CategoryListItem name={"Quick & Easy Recipes"} number={"78"} />
                  <CategoryListItem name={"Healthy Meals"} number={"54"} />
                  <CategoryListItem name={"Desserts & Baking"} number={"62"} />
                  <CategoryListItem name={"Vegan & Vegetarian"} number={"41"} />
                  <CategoryListItem name={"Global Cuisines"} number={"89"} />
                  <CategoryListItem name={"Soups & Salads"} number={"36"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
