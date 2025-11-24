import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { randomFoodIcon } from "../utils/foodLoaderUtils";

export default function RecipeItemSkeleton() {
  let icon = randomFoodIcon();

  return (
    <div className="animate-pulse">
      {/* Mirrors: <div className="aspect-square ..."> and <img> */}
      <div className="aspect-square rounded-lg flex items-center relative justify-center">
        <div
          // Match the size and shape of the image container
          className="w-full h-full rounded-sm bg-gray-300 border border-black/10 absolute inset-0 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </div>
      </div>

      {/* 2. Title Placeholder */}
      {/* Mirrors: <h2 className="capitalize mt-2 text-lg font-medium"> */}
      <div className="mt-2">
        <div
          // Placeholder bar that mimics the text size and width
          className="h-6 bg-gray-300 rounded w-3/4"
        />
      </div>
    </div>
  );
}
