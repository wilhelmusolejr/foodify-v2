import React from "react";

export default function BlogItem({ heading, date, description, imageUrl }) {
  return (
    <div className="my-20 border-b border-black/20 pb-20">
      <div className="flex gap-5 flex-col md:flex-row">
        {/* image */}
        <div className="w-full md:w-1/3">
          <img
            src={`images/blog/${imageUrl}`}
            alt={`Image for ${heading}`}
            className="object-cover object-center w-full rounded-sm"
          />
        </div>

        {/* data */}
        <div className="pt-5 flex-1">
          <h3 className="mb-4 uppercase font-medium">{date}</h3>
          <h2 className="font-bold text-2xl mb-2 poltawski-nowy text-[#2B4A13]">{heading}</h2>
          <p className="mb-10  text-[#333] font-light leading-relaxed">{description}</p>
          <a href="#" className="underline capitalize text-xl text-[#2B4A13]">
            Continue Reading
          </a>
        </div>
      </div>
    </div>
  );
}
