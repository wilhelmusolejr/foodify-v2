import React from "react";

export default function HeadingImage({ image_path = "" }) {
  return (
    <div className={`min-w-[200px] h-[150px] rounded-md`}>
      <img
        src={image_path}
        alt={`Image for header food item`}
        className=" object-cover object-center w-full h-full rounded-sm"
      />
    </div>
  );
}
