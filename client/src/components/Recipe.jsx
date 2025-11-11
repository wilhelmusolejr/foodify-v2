import React from "react";

export default function Recipe({ image_path, link, name }) {
  return (
    <>
      <div className="">
        <div class="h-32 lg:h-40 xl:h-70 rounded-lg flex items-center justify-center">
          <img
            src={image_path}
            alt={`Image for header food item`}
            className=" object-cover object-center w-full h-full rounded-sm"
          />
        </div>
        <h2 className="capitalize mt-2 text-lg font-medium">{name}</h2>
      </div>
    </>
  );
}
