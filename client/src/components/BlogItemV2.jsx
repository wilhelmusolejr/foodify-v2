import React from "react";

import Paragraph from "@components/Paragraph";

export default function BlogItemV2({ data }) {
  const { header, date, image_name, description } = data;

  return (
    <div className="bg-white  rounded-lg shadow-md flex flex-col">
      {/* image */}
      <a href="#" className="w-full h-[230px] overflow-hidden group">
        <img
          src={`images/blog/${image_name}`}
          alt={header}
          className="object-cover object-center w-full h-full rounded-t-lg transition-all duration-500 ease-out group-hover:scale-110 "
        />
      </a>

      {/* data */}
      <div className="flex flex-col flex-1 p-5 py-10">
        <h3 className="mb-4 uppercase font-medium">{date}</h3>
        <h2 className="font-bold text-3xl mb-2 poltawski-nowy text-[#2B4A13]">{header}</h2>

        <Paragraph className="mx-auto mb-10">{description}</Paragraph>

        {/* Push link to bottom */}
        <a href="#" className="underline capitalize text-xl text-[#2B4A13] mt-auto">
          Continue Reading
        </a>
      </div>
    </div>
  );
}
