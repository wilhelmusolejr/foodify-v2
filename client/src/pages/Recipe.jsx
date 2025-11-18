import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faDollarSign, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";

import Navigator from "@components/Navigator";
import RecipeTime from "@components/RecipeTime";
import Paragraph from "@components/Paragraph";
import Heading from "@components/Recipe/Heading";
import ListItem from "@components/Recipe/ListItem";
import RecipeItem from "@components/RecipeItem";
import Tags from "@components/Recipe/Tags";
import NutritionFacts from "@components/NutritionFacts";
import Feedback from "@components/Recipe/Feedback";

export default function Recipe() {
  const { id } = useParams();

  // State for data, loading, and errors

  let recipe = {
    id: 716429,
    image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
    imageType: "jpg",
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    readyInMinutes: 45,
    servings: 2,
    sourceUrl:
      "https://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    lowFodmap: false,
    weightWatcherSmartPoints: 16,
    gaps: "no",
    preparationMinutes: 20,
    cookingMinutes: 25,
    aggregateLikes: 209,
    healthScore: 18,
    creditsText: "Full Belly Sisters",
    license: "CC BY-SA 3.0",
    sourceName: "Full Belly Sisters",
    pricePerServing: 157.06,
    extendedIngredients: [
      {
        id: 1001,
        aisle: "Milk, Eggs, Other Dairy",
        image: "butter-sliced.jpg",
        consistency: "SOLID",
        name: "butter",
        nameClean: "butter",
        original: "1 tbsp butter",
        originalName: "butter",
        amount: 1,
        unit: "tbsp",
        meta: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
      {
        id: 10011135,
        aisle: "Produce",
        image: "cauliflower.jpg",
        consistency: "SOLID",
        name: "cauliflower florets",
        nameClean: "cauliflower florets",
        original: "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
        originalName: "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
        amount: 2,
        unit: "cups",
        meta: ["frozen", "thawed", "cut into bite-sized pieces"],
        measures: {
          us: {
            amount: 2,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 200,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 1038,
        aisle: "Cheese",
        image: "parmesan.jpg",
        consistency: "SOLID",
        name: "cheese",
        nameClean: "cheese",
        original: "2 tbsp grated cheese (I used romano)",
        originalName: "grated cheese (I used romano)",
        amount: 2,
        unit: "tbsp",
        meta: ["grated", "(I used romano)"],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 1034053,
        aisle: "Oil, Vinegar, Salad Dressing",
        image: "olive-oil.jpg",
        consistency: "LIQUID",
        name: "extra virgin olive oil",
        nameClean: "extra virgin olive oil",
        original: "1-2 tbsp extra virgin olive oil",
        originalName: "extra virgin olive oil",
        amount: 1,
        unit: "tbsp",
        meta: [],
        measures: {
          us: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
          metric: {
            amount: 1,
            unitShort: "Tbsp",
            unitLong: "Tbsp",
          },
        },
      },
      {
        id: 11215,
        aisle: "Produce",
        image: "garlic.png",
        consistency: "SOLID",
        name: "garlic",
        nameClean: "garlic",
        original: "5-6 cloves garlic",
        originalName: "garlic",
        amount: 5,
        unit: "cloves",
        meta: [],
        measures: {
          us: {
            amount: 5,
            unitShort: "cloves",
            unitLong: "cloves",
          },
          metric: {
            amount: 5,
            unitShort: "cloves",
            unitLong: "cloves",
          },
        },
      },
      {
        id: 10720420,
        aisle: "Pasta and Rice",
        image: "spaghetti.jpg",
        consistency: "SOLID",
        name: "pasta",
        nameClean: "pasta",
        original: "6-8 ounces pasta (I used linguine)",
        originalName: "pasta (I used linguine)",
        amount: 6,
        unit: "ounces",
        meta: ["(I used linguine)"],
        measures: {
          us: {
            amount: 6,
            unitShort: "oz",
            unitLong: "ounces",
          },
          metric: {
            amount: 170.097,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
      {
        id: 1032009,
        aisle: "Spices and Seasonings",
        image: "red-pepper-flakes.jpg",
        consistency: "SOLID",
        name: "couple of pepper flakes",
        nameClean: "couple of pepper flakes",
        original: "couple of pinches red pepper flakes, optional",
        originalName: "couple of red pepper flakes, optional",
        amount: 2,
        unit: "pinches",
        meta: ["red"],
        measures: {
          us: {
            amount: 2,
            unitShort: "pinches",
            unitLong: "pinches",
          },
          metric: {
            amount: 2,
            unitShort: "pinches",
            unitLong: "pinches",
          },
        },
      },
      {
        id: 1102047,
        aisle: "Spices and Seasonings",
        image: "salt-and-pepper.jpg",
        consistency: "SOLID",
        name: "salt and pepper",
        nameClean: "salt and pepper",
        original: "salt and pepper, to taste",
        originalName: "salt and pepper, to taste",
        amount: 2,
        unit: "servings",
        meta: ["to taste"],
        measures: {
          us: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
          metric: {
            amount: 2,
            unitShort: "servings",
            unitLong: "servings",
          },
        },
      },
      {
        id: 11291,
        aisle: "Produce",
        image: "spring-onions.jpg",
        consistency: "SOLID",
        name: "scallions",
        nameClean: "scallions",
        original: "3 scallions, chopped, white and green parts separated",
        originalName: "scallions, chopped, white and green parts separated",
        amount: 3,
        unit: "",
        meta: ["white", "green", "separated", "chopped"],
        measures: {
          us: {
            amount: 3,
            unitShort: "",
            unitLong: "",
          },
          metric: {
            amount: 3,
            unitShort: "",
            unitLong: "",
          },
        },
      },
      {
        id: 14106,
        aisle: "Alcoholic Beverages",
        image: "white-wine.jpg",
        consistency: "LIQUID",
        name: "white wine",
        nameClean: "white wine",
        original: "2-3 tbsp white wine",
        originalName: "white wine",
        amount: 2,
        unit: "tbsp",
        meta: [],
        measures: {
          us: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
          metric: {
            amount: 2,
            unitShort: "Tbsps",
            unitLong: "Tbsps",
          },
        },
      },
      {
        id: 99025,
        aisle: "Pasta and Rice",
        image: "breadcrumbs.jpg",
        consistency: "SOLID",
        name: "bread crumbs",
        nameClean: "bread crumbs",
        original: "1/4 cup whole wheat bread crumbs (I used panko)",
        originalName: "whole wheat bread crumbs (I used panko)",
        amount: 0.25,
        unit: "cup",
        meta: ["whole wheat", "(I used panko)"],
        measures: {
          us: {
            amount: 0.25,
            unitShort: "cups",
            unitLong: "cups",
          },
          metric: {
            amount: 27,
            unitShort: "g",
            unitLong: "grams",
          },
        },
      },
    ],
    summary:
      'You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.',
    cuisines: [],
    dishTypes: ["side dish", "lunch", "main course", "main dish", "dinner"],
    diets: [],
    occasions: [],
    instructions: "",
    analyzedInstructions: [],
    spoonacularScore: 83.92204284667969,
    spoonacularSourceUrl:
      "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
  };

  recipe.similarRecipe = [
    {
      id: 648259,
      image: "Italian-String-Beans-With-Anchovies-and-Breadcrumbs-648259.jpg",
      imageType: "jpg",
      title: "Italian String Beans With Anchovies and Breadcrumbs",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl:
        "https://www.foodista.com/recipe/GSLXPHB8/italian-string-beans-with-anchovies-and-breadcrumbs",
    },
    {
      id: 157473,
      image: "Cauliflower-Mash-with-Roasted-Garlic-157473.jpg",
      imageType: "jpg",
      title: "Cauliflower Mash with Roasted Garlic",
      readyInMinutes: 15,
      servings: 6,
      sourceUrl: "http://spoonacular.com/-1385395050102",
    },
    {
      id: 661043,
      image: "Spicy-Cauliflower-Soup-With-Garlic-Rye-Croutons-661043.jpg",
      imageType: "jpg",
      title: "Spicy Cauliflower Soup With Garlic Rye Croutons",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "https://www.foodista.com/recipe/76JQ3LT7/spicy-cauliflower-soup-with-garlic-rye-croutons",
    },
    {
      id: 665141,
      image:
        "White-Bean-and-Garlic-Soup-with-Spinach-and-Crispy-Prosciutto-and-Rosemary-Garlic-Toasts-665141.jpg",
      imageType: "jpg",
      title:
        "White Bean and Garlic Soup with Spinach and Crispy Prosciutto and Rosemary-Garlic Toasts",
      readyInMinutes: 60,
      servings: 4,
      sourceUrl:
        "https://www.foodista.com/recipe/RVL5KQP4/white-bean-and-garlic-soup-with-spinach-and-crispy-prosciutto-and-rosemary-garlic-toasts",
    },
    {
      id: 637923,
      image: "Chicken-and-Penne-Pasta-With-Garlic-Rosemary-Sauce-637923.jpg",
      imageType: "jpg",
      title: "Chicken and Penne Pasta With Garlic Rosemary Sauce",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "https://www.foodista.com/recipe/DTDN76GH/chicken-and-penne-pasta-with-garlic-rosemary-sauce",
    },
    {
      id: 644212,
      image: "Garlic---Shrimp-Pasta-644212.jpg",
      imageType: "jpg",
      title: "Garlic & Shrimp Pasta",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://www.foodista.com/recipe/Y7V22KMZ/garlic-shrimp-pasta",
    },
    {
      id: 652716,
      image: "Mushroom--roasted-tomato-and-garlic-pasta-652716.jpg",
      imageType: "jpg",
      title: "Mushroom, roasted tomato and garlic pasta",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl:
        "https://www.foodista.com/recipe/4XTNWW6Q/mushroom-roasted-tomato-and-garlic-pasta",
    },
    {
      id: 660101,
      image: "Simple-Garlic-Pasta-660101.jpg",
      imageType: "jpg",
      title: "Simple Garlic Pasta",
      readyInMinutes: 45,
      servings: 1,
      sourceUrl: "https://www.foodista.com/recipe/BG3S6M3T/simple-garlic-pasta",
    },
    {
      id: 654835,
      image: "Pasta-e-Fagioli-(Pasta-and-Beans)-654835.jpg",
      imageType: "jpg",
      title: "Pasta e Fagioli (Pasta and Beans)",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl: "https://www.foodista.com/recipe/QF3SKD4Y/pasta-e-fagioli-pasta-and-beans",
    },
  ];

  const groupedByAisle = recipe.extendedIngredients.reduce((accumulator, ingredient) => {
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

  const finalIngredientsArray = Object.entries(groupedByAisle).map(
    ([aisleName, ingredientList]) => {
      return {
        name: aisleName, // The key becomes the 'name' property
        list: ingredientList, // The value (the array of ingredients) becomes the 'list' property
      };
    }
  );

  return (
    <>
      {/* Navigator */}
      <Navigator />

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
                {finalIngredientsArray.map((item, index) => (
                  <div className="">
                    <h3 className="text-xl lg:text-2xl font-medium text-[#333]">{item.name}</h3>

                    <ul className="flex flex-col gap-3 mt-5 ms-2">
                      {item.list.map((listItem, indexs) => (
                        <ListItem>
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
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor quos,
                      asperiores iure odit, eos suscipit vero quaerat molestiae aperiam nihil ullam!
                      Qui, commodi provident? Architecto officia voluptate natus obcaecati.
                    </Paragraph>
                  </li>
                  <li className="flex gap-5 items-start">
                    {/* numbering */}
                    <div className="w-7 h-7  rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                      <p>2</p>
                    </div>
                    <Paragraph className={"flex-1"}>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor quos,
                      asperiores iure odit, eos suscipit vero quaerat molestiae aperiam nihil ullam!
                      Qui, commodi provident? Architecto officia voluptate natus obcaecati.
                    </Paragraph>
                  </li>
                  <li className="flex gap-5 items-start">
                    {/* numbering */}
                    <div className="w-7 h-7  rounded-full bg-green-900 text-white font-bold flex justify-center items-center">
                      <p>3</p>
                    </div>
                    <Paragraph className={"flex-1"}>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur dolor quos,
                      asperiores iure odit, eos suscipit vero quaerat molestiae aperiam nihil ullam!
                      Qui, commodi provident? Architecto officia voluptate natus obcaecati.
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
                {recipe.similarRecipe.map((recipee, index) => (
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
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    </>
  );
}
