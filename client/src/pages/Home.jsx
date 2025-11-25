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

import recipeData from "./recipe.json";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBoxOpen, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// Library
import axios from "axios";

// UTILS
import { getRandomApiKey } from "../utils/apiUtils";
import { useSearchParams } from "react-router-dom";

function Home() {
  const apiKey = getRandomApiKey();
  const runLocal = import.meta.env.VITE_RUN_LOCAL === "true" ? true : false;
  const FOOD_API = import.meta.env.VITE_FOOD_API;

  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [ingredientError, setIngredientError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");
  const [ingredient, setIngredient] = useState("");

  const [pageNum, setPageNum] = useState(1);

  let blogs = [
    {
      header: "10 Quick and Easy Dinner Recipes for Busy Weeknights",
      date: "November 15, 2025",
      image_name: "blog1.jpg",
      description:
        "Discover simple, tasty dinner ideas that you can make in under 30 minutes—perfect for those busy evenings when time is short but flavor still matters.",
    },
    {
      header: "5 Delicious One-Pot Meals to Simplify Your Cooking",
      date: "November 18, 2025",
      image_name: "blog2.jpg",
      description:
        "Cut down on cleanup without sacrificing taste. These one-pot meals are hearty, comforting, and incredibly easy to make on any night of the week.",
    },
    {
      header: "Healthy Breakfast Ideas to Kickstart Your Morning",
      date: "November 20, 2025",
      image_name: "blog3.jpg",
      description:
        "Start your day right with these nutritious and energizing breakfast ideas that blend convenience with wholesome ingredients.",
    },
  ];

  // get random recipes
  useEffect(() => {
    const apiUrl = `${FOOD_API}/recipes/random?number=17&apiKey=${apiKey}`;

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
        setRecipes({
          popular: response.data.recipes.slice(0, 8),
          explore: response.data.recipes.slice(7, 13),
          heading: response.data.recipes.slice(14, 17),
        });
      } catch (err) {
        // if reached 50 points
        if (err.message.includes("upgrade your plan")) {
          let DATA_FROM_API = { recipes: [] };

          for (let i = 0; i < 20; i++) {
            DATA_FROM_API.recipes.push(recipeData);
          }

          setRecipes({
            popular: DATA_FROM_API.recipes.slice(0, 8),
            explore: DATA_FROM_API.recipes.slice(7, 13),
            heading: DATA_FROM_API.recipes.slice(14, 17),
          });
        }

        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeData();
  }, []);

  function addIngredient(ingredient) {
    if (ingredient.trim() === "") {
      setIngredientError(true);
      return;
    }

    setCurrentIngredients([...currentIngredients, ingredient]);
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

    let searchUrl = "http://localhost:5173/search";
    let params = new URLSearchParams(urlParameter);

    let finalUrl = `${searchUrl}?${params}`;
    window.location.href = finalUrl;
  }

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* Head */}
      <div className="header min-h-[80vh] xl:min-h-[75vh] my-10 md:my-14 py-20 text-white flex justify-center items-center bg-white border border-black/10">
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
              {isloading && (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div className={`min-w-[200px] h-[150px] rounded-md animate-pulse`} key={index}>
                      <div className="w-full h-full rounded-sm bg-gray-300" />
                    </div>
                  ))}
                </>
              )}

              {!isloading && recipes && (
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
      </div>

      {/* Section - Categories */}
      <div className="bg-white py-40 border-t border-black/10">
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <SectionHeading
            heading={"Explore meal types"}
            subheading={"Discover delicious meals for every ocean"}
          />

          {/* list */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* item */}
            <CategoryItem image_path={"images/category/category1.png"} title="Main course" />
            <CategoryItem image_path={"images/category/category2.png"} title="Sea food" />
            <CategoryItem image_path={"images/category/category3.png"} title="Dessert" />
            <CategoryItem image_path={"images/category/category4.png"} title="Salad" />
          </div>
        </div>
      </div>

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
                      className="bg-black min-w-30 w-full cursor-pointer lg:w-30 text-white px-4 py-3 rounded-lg uppercase flex gap-2 justify-center items-center"
                      onClick={() => addIngredient(ingredient)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <p>add</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* box 2 */}
              <div className="px-4 xl:px-10 py-10 relative md:px-5 bg-white min-h-80 lg:min-w-90 lg:max-w-90 text-black rounded-lg rounded-t-none lg:rounded-e-lg lg:rounded-s-none overflow-hidden">
                <h3 className="text-2xl mb-4">Your ingredients list</h3>
                <button
                  onClick={handleSearch}
                  className="bg-black py-2 px-4 text-white rounded-lg absolute bottom-5 right-5"
                >
                  Seach
                </button>

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

            {!isloading && recipes && (
              <>
                {recipes.popular.map((popularRecipe, index) => (
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
              <div className="">
                {blogs.map((blog, index) => (
                  <BlogItem
                    key={index}
                    heading={blog.header}
                    date={blog.date}
                    description={blog.description}
                    imageUrl={blog.image_name}
                  />
                ))}

                {/* button */}
                <div className="md:w-2/3 max-w-70 ">
                  <a
                    href="/blog"
                    className="bg-black uppercase text-white px-4 py-3 w-full rounded-lg "
                  >
                    view more recent blogs
                  </a>
                </div>
              </div>
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
                  {isloading && (
                    <>
                      {[...Array(6)].map((_, index) => (
                        <RecipeItemSkeleton key={index} />
                      ))}
                    </>
                  )}

                  {!isloading && recipes && (
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
