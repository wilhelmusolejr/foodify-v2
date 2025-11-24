import React from "react";

export default function ProfileHEaderSkeleton() {
  return (
    <div className="bg-gray-100 dark:bg-gray-200 animate-pulse">
      <div className="w-10/12 mx-auto max-w-7xl py-20 mt-10 min-h-[60vh] flex items-center">
        <div className="flex flex-col md:flex-row gap-10 md:max-w-[700px] mx-auto w-full">
          {/* Image Placeholder */}
          <div className="text-center flex justify-center items-center">
            <div className="w-52 h-52 rounded-full bg-gray-300 dark:bg-gray-400"></div>
          </div>

          {/* Data Placeholders */}
          <div className="flex-1">
            {/* Name Placeholder */}
            <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-400 rounded mb-4"></div>

            {/* Bio Placeholder */}
            <div className="space-y-2 mb-5">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-400 rounded"></div>
              <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-400 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-400 rounded"></div>
            </div>

            {/* Stats Placeholders */}
            <div className="flex gap-2 flex-col capitalize text-lg lg:text-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
