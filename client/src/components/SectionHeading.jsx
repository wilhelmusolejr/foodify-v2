import React from "react";

export default function SectionHeading({ heading, subheading, className = "" }) {
  return (
    <div className={`flex flex-col uppercase gap-2 mb-15 text-center ${className}`}>
      <p className="italic text-sm md:text-base lg:text-lg">{subheading}</p>
      <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">{heading}</h2>
    </div>
  );
}
