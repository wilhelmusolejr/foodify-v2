import React from "react";

export default function NutritionFacts({ className, html }) {
  return (
    <>
      <div
        className={`my-14 overflow-auto pe-3 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
