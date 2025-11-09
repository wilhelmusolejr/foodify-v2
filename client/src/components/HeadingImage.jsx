import React from "react";

export default function HeadingImage({ image_path = "" }) {
  return (
    <div className={`min-w-40 h-40 rounded-md`}>
      <img
        src={image_path}
        alt={`Image for header food item`}
        className=" object-cover object-center w-full h-full rounded-sm"
      />
    </div>
  );
}
