import React from "react";

export default function RecipeItem({ image_name, id, name }) {
  let image_path;

  if (image_name.includes("https")) {
    image_path = image_name;
  } else {
    image_path = `https://img.spoonacular.com/recipes/${image_name}`;
  }

  let recipe_link = `http://localhost:5173/recipe/${id}`;

  return (
    <>
      <a href={recipe_link} className="">
        <div className="aspect-square rounded-lg flex items-center justify-center border border-black/10">
          <img
            src={image_path}
            alt={`Image for header food item`}
            className=" object-cover object-center w-full h-full rounded-sm border border-black/10 bg-white"
          />
        </div>
        <h2 className="capitalize mt-2 text-lg font-medium">{name}</h2>
      </a>
    </>
  );
}
