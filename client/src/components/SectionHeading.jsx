import React from "react";

export default function SectionHeading({ heading, subheading }) {
  return (
    <div className="text-center capitalize flex gap-2 flex-col mb-14">
      <p className="italic w-8/12 mx-auto">{subheading}</p>
      <h2 className="text-2xl md:text-3xl font-semibold">{heading}</h2>
    </div>
  );
}
