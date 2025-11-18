import React from "react";

export default function Heading({ type, className = "", children }) {
  const DynamicTag = type;

  return (
    <DynamicTag className={`text-2xl lg:text-3xl font-semibold ${className}`}>
      {children}
    </DynamicTag>
  );
}
