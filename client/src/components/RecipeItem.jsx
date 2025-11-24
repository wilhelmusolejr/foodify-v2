import React from "react";

import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { randomFoodIcon } from "../utils/foodLoaderUtils";

export default function RecipeItem({ image_name, id, name }) {
  let image_path;
  let icon = randomFoodIcon();

  if (image_name) {
    if (image_name.includes("https")) {
      image_path = image_name;
    } else {
      image_path = `https://img.spoonacular.com/recipes/${image_name}`;
    }
  } else {
    image_path = null;
  }

  let recipe_link = `http://localhost:5173/recipe/${id}`;

  return (
    <>
      <a href={recipe_link} className="">
        <div className="aspect-square rounded-lg flex items-center justify-center border border-black/10 relative">
          {image_path ? (
            <img
              src={image_path}
              alt={`Image for header food item`}
              className=" object-cover object-center w-full h-full rounded-sm border border-black/10 bg-white"
            />
          ) : (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <FontAwesomeIcon icon={icon} size="2x" className="text-black/50" />
            </div>
          )}
        </div>
        <h2 className="capitalize mt-2 text-lg font-medium">{name}</h2>
      </a>
    </>
  );
}
