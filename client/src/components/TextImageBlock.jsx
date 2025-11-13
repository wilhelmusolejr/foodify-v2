import React from "react";

export default function TextImageBlock({ image_path, description, heading }) {
  return (
    <div className="flex gap-5 flex-col">
      {/* text */}
      <div className="">
        <h3 className="text-2xl font-semibold mb-2 capitalize">{heading}</h3>
        <p className="font-light text-[#333] leading-relaxed">{description}</p>
      </div>
      {/* image */}
      <div className="h-50">
        <img
          src={image_path}
          alt=""
          className="object-cover object-center w-full h-full rounded-sm"
        />
      </div>
    </div>
  );
}
