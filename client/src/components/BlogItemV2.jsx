import React from "react";

import Paragraph from "@components/Paragraph";

export default function BlogItemV2({ data }) {
  const { header, date, image_name, description } = data;

  return (
    <div className="bg-white p-5 py-10 rounded-lg shadow-md">
      {/* image */}
      <div className="w-full max-h-[200px] overflow-hidden">
        <img
          src={`images/blog/${image_name}`}
          alt={`Image for `}
          className="object-cover object-center w-full h-full rounded-sm"
        />
      </div>

      {/* data */}
      <div className="pt-5 flex-1">
        <h3 className="mb-4 uppercase font-medium">{date}</h3>
        <h2 className="font-bold text-3xl mb-2 poltawski-nowy text-[#2B4A13]">{header}</h2>

        <Paragraph className="mx-auto mb-10">{description}</Paragraph>

        <a href="#" className="underline capitalize text-xl text-[#2B4A13]">
          Continue Reading
        </a>
      </div>
    </div>
  );
}
