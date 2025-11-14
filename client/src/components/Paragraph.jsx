import React from "react";

export default function Paragraph({ children, className }) {
  return (
    <p
      className={`font-light text-[#333] max-w-prose text-base md:text-lg  xl:text-xl leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}
