import React from "react";

import Navigator from "@components/Navigator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faComment } from "@fortawesome/free-solid-svg-icons";
import Recipe from "@components/Recipe";
import Footer from "@components/Footer";
import Heading from "@components/Heading";
import CommentItem from "@components/CommentItem";
import Paragraph from "@components/Paragraph";

export default function Profile() {
  let recipeNames = [
    "Spaghetti Carbonara",
    "Grilled Chicken Salad",
    "Creamy Mushroom Risotto",
    "Beef Stir-Fry with Veggies",
    "Lemon Garlic Shrimp Pasta",
    "Classic Margherita Pizza",
  ];

  let recipes = recipeNames.map((name, index) => ({
    name,
    image_path: `/images/recipe/recipe (${index + 1}).png`,
  }));

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <div className="">
        {/* header */}
        <div className="bg-green-900">
          <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 text-white min-h-[60vh] flex items-center">
            <div className="flex flex-col md:flex-row gap-10 md:max-w-[700px] mx-auto">
              {/* image */}
              <div className="text-center flex justify-center items-center">
                <div className="w-50 h-50 rounded-full bg-black"></div>
              </div>
              {/* data */}
              <div className="">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">Wilhelmus Ole</h1>
                <Paragraph className="mb-5 text-[#f5f5f5] ">
                  Food enthusiast. Love to cook and share recipes. Always looking for new culinary
                  adventures.
                </Paragraph>
                <div className="flex gap-2 flex-col capitalize text-lg lg:text-xl">
                  {/* item */}
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    <p>35 recipes saved</p>
                  </div>

                  {/* item */}
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    <p>35 recipes saved</p>
                  </div>

                  {/* item */}
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    <p>35 recipes saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="w-10/12 mx-auto max-w-7xl">
          {/* favorites */}
          <div className="my-40">
            <Heading type="h2" className="mb-10">
              Saved Recipes
            </Heading>

            {/* parent */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
              {recipes.map((recipe, index) => (
                <Recipe key={index} name={recipe.name} image_path={recipe.image_path} />
              ))}
            </div>
          </div>

          {/* comments */}
          <div className="">
            <Heading type="h2" className="mb-10">
              Comments{" "}
            </Heading>

            <div className="flex gap-5 flex-col max-w-lg">
              {/* item */}
              <CommentItem comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, inventore." />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}
