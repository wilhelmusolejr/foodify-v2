import React, { useState } from "react";

export default function HeadingImage({ image_name = "", id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  let image_path;

  if (image_name.includes("https")) {
    image_path = image_name;
  } else {
    image_path = `https://img.spoonacular.com/recipes/${image_name}`;
  }

  let recipe_link = `/recipe/${id}`;

  const sizeClasses = `min-w-[200px] h-[150px] rounded-md`;
  const shouldShowSkeleton = isLoading || hasError;

  return (
    <a href={recipe_link} className={sizeClasses}>
      {/* Skeleton / Placeholder (Conditionally rendered) */}
      {shouldShowSkeleton && (
        <div
          className={`${sizeClasses} bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center`}
        >
          {/* Optional: Add a simple icon or text for a failed state */}
          {hasError && <span className="text-sm text-gray-500">Error</span>}
        </div>
      )}

      {/* Actual Image (Conditionally rendered and tracked) */}
      <img
        // 4. Use the event handlers to update state
        onLoad={() => setIsLoading(false)} // Image loaded successfully
        onError={() => {
          setIsLoading(false); // Stop loading animation
          setHasError(true); // Show error state/placeholder permanently
        }}
        // 5. Hide the image until it's loaded (prevents a flash of broken image/ugly layout)
        style={{ display: isLoading || hasError ? "none" : "block" }}
        src={image_path}
        alt={`Image for recipe ${id}`}
        className="object-cover object-center w-full h-full rounded-sm"
      />
    </a>
  );
}
