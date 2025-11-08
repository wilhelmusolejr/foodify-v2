import React from "react";

export default function BlogItem({ heading, date, description, imageUrl }) {
  return (
    <div className="my-20 border-b border-black/20 pb-20">
      {/* image */}
      <div className="h-50">
        <img
          src={`images/blog/${imageUrl}`}
          alt={`Image for ${heading}`}
          className=" object-cover object-center w-full h-full rounded-sm"
        />
      </div>

      {/* data */}
      <div className="pt-5">
        <h3 className="mb-2">{date}</h3>
        <h2 className="font-medium text-2xl mb-2">{heading}</h2>
        <p className="mb-10">{description}</p>
        <a href="#" className="underline capitalize text-xl">
          Continue Reading
        </a>
      </div>
    </div>
  );
}
