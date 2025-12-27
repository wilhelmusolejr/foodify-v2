import React from "react";
import { ENV } from "@/config/env";
import { Link } from "react-router-dom";

export default function Test({ name, image_name }) {
  let image_path = `images/category/${image_name}`;

  let link = `${ENV.frontEndUrl}/search?query=${name}`;

  return (
    <div className="text-center flex flex-col items-center gap-5 w-full group">
      {/* image */}
      <Link to={link} className="rounded-full overflow-hidden">
        <img
          src={image_path}
          alt={`Image for header food item`}
          className=" object-cover border border-black/10 shadow-md aspect-square bg-white w-full h-full object-center rounded-full
            transition-all duration-500 ease-out
            group-hover:scale-110 
            group-hover:rotate-3"
        />
      </Link>

      <a href={link} className="text-xl font-medium uppercase">
        {name}
      </a>
    </div>
  );
}
