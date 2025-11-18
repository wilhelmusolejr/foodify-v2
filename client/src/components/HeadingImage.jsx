import React from "react";

export default function HeadingImage({ image_name = "", id }) {
  let image_path;

  if (image_name.includes("https")) {
    image_path = image_name;
  } else {
    image_path = `https://img.spoonacular.com/recipes/${image_name}`;
  }

  let recipe_link = `http://localhost:5173/recipe/${id}`;

  return (
    <a href={recipe_link} className={`min-w-[200px] h-[150px] rounded-md`}>
      <img
        src={image_path}
        alt={`Image for header food item`}
        className=" object-cover object-center w-full h-full rounded-sm"
      />
    </a>
  );
}
