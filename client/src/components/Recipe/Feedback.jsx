import React from "react";

import Paragraph from "@components/Paragraph";

export default function Feedback({ className = "" }) {
  return (
    <div
      className={`min-h-[30vh] px-10  bg-green-900 rounded-lg text-white flex justify-center items-center ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl lg:text-3xl uppercase font-bold">Have your tried this recipe?</h2>
        <Paragraph className=" text-[#f5f5f5] lg:w-10/12 mx-auto text-left">
          Let us know what you think! Your feedback helps us improve our recipes and provide you
          with the best cooking experience.
        </Paragraph>
      </div>
    </div>
  );
}
