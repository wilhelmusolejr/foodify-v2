import React from "react";
import { useParams } from "react-router-dom";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle, faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";

import RecipeTime from "@components/RecipeTime";
import Paragraph from "@components/Paragraph";
import ChecklistItem from "@components/ChecklistItem";
import Heading from "@components/Recipe/Heading";
import ListItem from "@components/Recipe/ListItem";
import RecipeItem from "@components/RecipeItem";
import Tags from "../components/Recipe/Tags";
import NutritionFacts from "../components/NutritionFacts";
import Feedback from "../components/Recipe/Feedback";

export default function Recipe() {
  const { id } = useParams();

  let recipeNames = [
    "Spaghetti Carbonara",
    "Grilled Chicken Salad",
    "Creamy Mushroom Risotto",
    "Beef Stir-Fry with Veggies",
    "Lemon Garlic Shrimp Pasta",
    "Classic Margherita Pizza",
  ];

  let recipes_list = recipeNames.map((name, index) => ({
    name,
    image_path: `images/recipe/recipe (${index + 1}).png`,
  }));

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <div className="w-10/12 max-w-7x mx-auto mt-30">
        {/* heading */}
        <div className="mb-10">
          <div className={`flex flex-col uppercase gap-2 mb-7 `}>
            <p className="italic text-sm md:text-base lg:text-lg">
              Browse All Recipes by Category or Filter
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
              Stawberry Cream Cheesecake
            </h2>
          </div>

          {/* mini data */}
          <div className="flex items-center flex-wrap gap-5">
            {/* item */}
            <div className="p-2 bg-green-900 gap-2 hidden text-white rounded-lg w-fit md:flex items-center">
              <div className="px-2 py-1 bg-black/10 rounded-lg">86</div>
              <p>Health Score</p>
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-5">
              {/* item */}
              <ChecklistItem name={"Vegan"} iconClassname="text-green-900" />
              <ChecklistItem name={"Vegan"} iconClassname="text-green-900" />
              <ChecklistItem name={"Vegan"} iconClassname="text-green-900" />
            </div>
          </div>
        </div>

        {/* image */}
        <div className="py-10 border-t border-black/10">
          <div className="h-50 md:h-80 lg:h-90 xl:h-96 bg-black rounded-xl"></div>
        </div>

        {/* clock */}
        <div className="flex flex-col gap-7 mb-15 md:flex-row md:items-center md:justify-center lg:justify-start">
          {/* item */}
          <RecipeTime />
          <RecipeTime />
          <RecipeTime />
        </div>

        {/* content */}
        <div className="lg:flex gap-20 justify-between ">
          {/* side 1 */}
          <div className="lg:w-10/12">
            {/* paragraph */}
            <Paragraph className={"my-14"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Paragraph>
            {/* tags */}
            <Tags className="lg:hidden my-20" />

            {/* Ingredients */}
            <div className="my-14">
              {/* heading */}
              <Heading name="Ingredients" step="0/12" />

              <div className="flex flex-col gap-7">
                {/* item - produce */}
                <div className="">
                  <h3 className="text-xl font-medium text-[#333]">Produce</h3>

                  <ul className="flex flex-col gap-3 mt-5 ms-2">
                    <ListItem>
                      <div className="rounded-full border w-5 h-5"></div>
                      <p>120 extra virgin olive oil</p>
                    </ListItem>
                  </ul>
                </div>

                {/* item - cheese */}
                <div className="">
                  <h3 className="text-xl font-medium text-[#333]">Cheese</h3>

                  <ul className="flex flex-col gap-3 mt-5 ms-2">
                    <ListItem>
                      <div className="rounded-full border w-5 h-5"></div>
                      <p>120 extra virgin olive oil</p>
                    </ListItem>
                  </ul>
                </div>
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
            {/* Instructions */}
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
                <h2 className="text-2xl font-semibold">Explore Recipes</h2>
              </div>

              {/* parent */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                {recipes_list.map((recipee, index) => (
                  <RecipeItem key={index} name={recipee.name} image_path={recipee.image_path} />
                ))}
              </div>
            </div>

            {/* feedback */}
            <Feedback className="lg:hidden my-20" />
          </div>
        </div>

        {/* Comment */}
        <div className="mt-40 lg:w-8/12 lg:mx-auto">
          <h2 className="text-3xl font-bold mb-5">Already made this?</h2>
          <button className="px-7 py-4 border rounded-lg mb-10">Share your feedback</button>
          <div className="h-2 bg-green-900 mb-10"></div>
          <h3 className="text-2xl font-semibold mt-30 mb-10">(36) Comments</h3>

          {/* actual comments */}
          <div className="">
            {/* item */}
            <div className="flex gap-5 border-t border-black/10 pt-10">
              <div className="w-10 h-10 rounded-full bg-black"></div>
              <div className="flex-1">
                <h4 className="text-lg font-medium">Wihelmus Ole</h4>
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
          <div className="my-20">
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
