import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { randomFoodIcon } from "../utils/foodLoaderUtils";
import { faBox, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

export default function RecipeItem({
  image_name,
  id,
  name,
  setListId = useState([]),
  toModify = false,
  mealTime = "",
}) {
  // env
  const FRONT_URL = import.meta.env.VITE_FRONTEND_URL;

  let image_path;
  let icon = randomFoodIcon();
  const recipe_link = `${FRONT_URL}/recipe/${id}`;

  const [isSelected, setIsSelected] = useState(false);

  if (image_name) {
    if (image_name.includes("https")) {
      image_path = image_name;
    } else {
      image_path = `https://img.spoonacular.com/recipes/${image_name}`;
    }
  } else {
    image_path = null;
  }

  function handleClick() {
    if (!toModify) return;

    if (isSelected) {
      // selected, so unselect
      setIsSelected(false);
      setListId((prevList) =>
        prevList.filter((item) => !(item.recipeId === id && item.mealTime === mealTime))
      );
    } else {
      // not selected, so select
      setIsSelected(true);
      setListId((prevList) => {
        const exists = prevList.some((item) => item.recipeId === id && item.mealTime === mealTime);

        if (exists) return prevList; // prevent duplicates

        return [
          ...prevList,
          {
            recipeId: id,
            mealTime,
          },
        ];
      });
    }
  }

  return (
    <a
      href={recipe_link}
      className="group block"
      onClick={(e) => {
        if (toModify) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        onClick={handleClick}
        className="aspect-square rounded-lg flex items-center justify-center border border-black/10 relative overflow-hidden"
      >
        {image_path ? (
          <img
            src={image_path}
            alt={`Image for header food item`}
            className="object-cover object-center w-full h-full rounded-sm border border-black/10 bg-white 
                     transition-transform duration-300 ease-out 
                     group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={icon} size="2x" className="text-black/50" />
          </div>
        )}

        {toModify && (
          <FontAwesomeIcon
            icon={isSelected ? faSquareCheck : faSquare}
            size="2x"
            className="absolute bottom-5 left-2 z-50 text-white"
          />
        )}
      </div>

      <h2 className="capitalize mt-2 text-lg font-medium">{name}</h2>
    </a>
  );
}
