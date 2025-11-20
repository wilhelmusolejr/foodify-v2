import React from "react";

export default function CategoryItem({ image_path, title }) {
  let link = `http://localhost:5173/search?query=${title}`;

  return (
    <a href={link} className="text-center flex flex-col items-center gap-4">
      {/* image */}
      <div className="w-30 h-30 lg:w-40 lg:h-40 xl:w-[200px] xl:h-[200px] rounded-full">
        <img
          src={image_path}
          alt={`Image for header food item`}
          className=" object-cover object-center w-full h-full rounded-sm"
        />
      </div>

      <p className="md:text-xl">{title}</p>
    </a>
  );
}
