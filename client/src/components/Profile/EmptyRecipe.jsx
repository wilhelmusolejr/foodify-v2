import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

export default function EmptyRecipe({ isVisitor, userProfile }) {
  if (isVisitor) {
    // VIEW FOR VISITOR (Another user is looking at this profile)
    return (
      <div className="border min-h-[30vh] flex justify-center items-center border-black/10 rounded-lg bg-gray-50 p-6">
        <div className="text-center">
          <FontAwesomeIcon icon={faBookmark} size="2x" className="text-yellow-500 mb-2" />
          <h3 className="mt-2 text-lg font-semibold text-gray-900">
            {userProfile.firstName} hasn't bookmarked any recipes yet.
          </h3>
          <p className="mt-1 text-md text-gray-500 max-w-sm mx-auto">
            This section will update once they start saving their favorite dishes.
          </p>
        </div>
      </div>
    );
  } else {
    // VIEW FOR OWNER (The current logged-in user)
    return (
      <div className="border min-h-[40vh] flex justify-center items-center border-black/10 rounded-lg bg-white shadow-md p-8">
        <div className="text-center max-w-[500px]">
          <FontAwesomeIcon icon={faBookmark} size="2x" className="text-yellow-500 mb-5" />
          <div className="mb-7">
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              It looks like you haven't bookmarked any recipes yet
            </h3>
            <p className="text-md text-gray-500">
              Ready to find your next favorite meal? Discover new flavors or search for specific
              dishes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/category"
              className="rounded-full px-6 py-3 flex-1 bg-green-900 text-white text-lg font-medium shadow-md hover:bg-green-800 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <p>Explore Categories</p>
            </a>
            <a
              href="/search"
              className="rounded-full px-6 py-3 flex-1 text-lg font-medium flex items-center justify-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <FontAwesomeIcon icon={faSearch} />
              <p className="text-black/80">Start Searching</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
