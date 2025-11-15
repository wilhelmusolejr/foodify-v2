import React from "react";

import Paragraph from "@components/Paragraph";

export default function BlogItemV2() {
  return (
    <div className="bg-white p-5 py-10 rounded-lg shadow-md">
      {/* image */}
      <div className="w-full ">
        <img
          src={`images/blog/blog1.jpg`}
          alt={`Image for `}
          className="object-cover object-center w-full rounded-sm"
        />
      </div>

      {/* data */}
      <div className="pt-5 flex-1">
        <h3 className="mb-4 uppercase font-medium">November 30, 2025</h3>
        <h2 className="font-bold text-3xl mb-2 poltawski-nowy text-[#2B4A13]">
          29 cozy soups and strews
        </h2>

        <Paragraph className="mx-auto mb-10">
          Warm your bones with 29 hearty soups and stews designed for chilly evenings. From creamy
          tomato bisque to slow-simmered beef stew, these easy-to-make recipes use pantry.
        </Paragraph>

        <a href="#" className="underline capitalize text-xl text-[#2B4A13]">
          Continue Reading
        </a>
      </div>
    </div>
  );
}
