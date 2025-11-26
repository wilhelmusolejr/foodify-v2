import React from "react";

export default function CategoryItem({ image_path, title }) {
  let FRONTEND_HOST_URL = import.meta.env.VITE_FRONTEND_URL;

  let link = `${FRONTEND_HOST_URL}/search?query=${title}`;

  return (
    <a href={link} className="text-center flex flex-col items-center gap-4 group">
      {/* image wrapper */}
      <div className="w-30 h-30 lg:w-40 lg:h-40 xl:w-[200px] xl:h-[200px] rounded-full overflow-hidden">
        <img
          src={image_path}
          alt={`Image for ${title}`}
          className="
            w-full h-full object-cover object-center rounded-full
            transition-all duration-500 ease-out
            group-hover:scale-110 
            group-hover:rotate-3
          "
        />
      </div>

      <p className="md:text-xl">{title}</p>
    </a>
  );
}
