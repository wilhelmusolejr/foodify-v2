import React from "react";

export default function CategoryItem({ image_path, title }) {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      {/* image */}
      <div className="w-30 h-30 rounded-full">
        <img
          src={image_path}
          alt={`Image for header food item`}
          className=" object-cover object-center w-full h-full rounded-sm"
        />
      </div>

      <p>{title}</p>
    </div>
  );
}
