import React from "react";

export default function Recipe({ image_path, link, name }) {
  return (
    <>
      <div className="">
        <div className="aspect-square rounded-lg flex items-center justify-center">
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
