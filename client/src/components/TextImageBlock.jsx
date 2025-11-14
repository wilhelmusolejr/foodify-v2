import React from "react";
import Paragraph from "./Paragraph";

export default function TextImageBlock({ image_path, description, heading, type }) {
  return (
    <div
      className={`flex gap-30 flex-col items-center justify-between ${type === "2" ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* text */}
      <div className="flex-1 ">
        <h3 className="text-2xl font-semibold mb-2 capitalize">{heading}</h3>
        <Paragraph className="">{description}</Paragraph>
      </div>

      {/* image */}
      <div className="h-50 w-full md:w-65 md:h-65 xl:w-[400px] xl:h-[400px]">
        <img
          src={image_path}
          alt=""
          className="object-cover object-center w-full h-full rounded-sm"
        />
      </div>
    </div>
  );
}
