import React from "react";

import Paragraph from "@components/Paragraph";
import { Link, Links } from "react-router-dom";

export default function BlogItemV2({ data }) {
  const { header, date, image_name, description, id } = data;

  const FRONT_URL = import.meta.env.VITE_FRONTEND_URL;
  const blogLink = `${FRONT_URL}/blog/${id ? id : "1"}`;

  return (
    <div className="bg-white  rounded-lg shadow-md flex flex-col">
      {/* image */}
      <Link to={blogLink} className="w-full h-[230px] overflow-hidden group">
        <img
          src={`images/blog/${image_name}`}
          alt={header}
          className="object-cover object-center w-full h-full rounded-t-lg transition-all duration-500 ease-out group-hover:scale-110 "
        />
      </Link>

      {/* data */}
      <div className="flex flex-col flex-1 p-5 py-10">
        <h3 className="mb-4 uppercase font-medium">{date}</h3>
        <h2 className="font-bold text-xl mb-2 poltawski-nowy text-[#2B4A13]">{header}</h2>

        <Paragraph className="mx-auto mb-10 hidden">{description}</Paragraph>
        <p className="text-[#333] font-light mb-10">{description}</p>

        {/* Push link to bottom */}
        <Link to={blogLink} className="underline capitalize text-md text-[#2B4A13] mt-auto">
          Continue Reading
        </Link>
      </div>
    </div>
  );
}
