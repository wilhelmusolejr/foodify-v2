import React from "react";

export default function Test({ name, image_name }) {
  let image_path = `images/category/${image_name}`;

  return (
    <div className="text-center flex flex-col items-center gap-5 w-full">
      {/* image */}
      <div className="rounded-full">
        <img
          src={image_path}
          alt={`Image for header food item`}
          className=" object-cover border border-black/10 shadow-md object-center w-full h-full rounded-full aspect-square"
        />
      </div>

      <p className="md:text-xl uppercase">{name}</p>
    </div>
  );
}
