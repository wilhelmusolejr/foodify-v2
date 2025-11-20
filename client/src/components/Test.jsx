import React from "react";

export default function Test({ name, image_name }) {
  let image_path = `images/category/${image_name}`;

  let link = `http://localhost:5173/search?query=${name}`;

  return (
    <div className="text-center flex flex-col items-center gap-5 w-full">
      {/* image */}
      <a href={link} className="rounded-full">
        <img
          src={image_path}
          alt={`Image for header food item`}
          className=" object-cover border border-black/10 shadow-md object-center w-full h-full rounded-full aspect-square bg-white"
        />
      </a>

      <a href={link} className="text-xl font-medium uppercase">
        {name}
      </a>
    </div>
  );
}
