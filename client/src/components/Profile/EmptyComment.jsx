import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function EmptyComment({ isVisitor, userProfile }) {
  if (isVisitor) {
    // VIEW FOR VISITOR (Another user is looking at this profile)
    return (
      <div className="border min-h-[30vh] flex justify-center items-center border-black/10 rounded-lg bg-gray-50 p-6">
        <div className="text-center">
          <FontAwesomeIcon icon={faCommentDots} size="2x" className="text-yellow-500 mb-2" />
          <h3 className="mt-2 text-lg font-semibold text-gray-900">
            {userProfile.firstName} hasn't posted any comments yet.
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
          <FontAwesomeIcon icon={faCommentDots} size="2x" className="text-yellow-500 mb-5" />
          <div className="mb-7">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              You haven't posted any comments yet!
            </h3>
            <p className="text-md text-gray-500">
              Join the conversation! Find a recipe you love and share your thoughts, tips, or
              questions with the community.
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/category"
              className="border rounded-3xl px-5 py-3 flex-1 bg-green-900 text-white text-lg"
            >
              <p>Browse Recipes</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
