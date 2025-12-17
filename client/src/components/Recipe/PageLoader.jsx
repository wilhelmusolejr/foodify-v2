import React from "react";

export default function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-30 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* 1. Header Section: Title and Quick Info */}
      <div className="mb-10">
        {/* Title Placeholder */}
        <div className="h-10 bg-gray-300 rounded w-3/4 md:w-1/2 mb-4"></div>
        {/* Subtitle/Time Placeholder */}
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
      </div>

      {/* 2. Main Content Grid (Image and Details) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column (Main Image Placeholder) */}
        <div className="md:col-span-2">
          <div className="aspect-video bg-gray-300 rounded-xl h-96"></div>

          {/* Summary Placeholder */}
          <div className="mt-8">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        {/* Right Column (Nutritional/Source Info) */}
        <div className="md:col-span-1 space-y-4">
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* 3. Ingredients/Instructions Section */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Ingredients List Placeholder */}
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div> {/* Section Heading */}
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Instructions/Steps Placeholder */}
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div> {/* Section Heading */}
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
        </div>
      </div>
    </div>
  );
}
