import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { formatCommentDate } from "../utils/dateUtils";

export default function CommentItem({ userProfile, commentData }) {
  return (
    <>
      <div className="flex gap-4 p-5 bg-white shadow-md border border-gray-200 rounded-xl transition hover:shadow-lg">
        {/* 👤 User Avatar/Icon (1) */}
        <div className="shrink-0">
          {/* Placeholder or actual user image */}
          {true ? (
            <img
              src={userProfile.profile_path}
              alt={`s profile`}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 w-10 h-10" />
          )}
        </div>

        {/* 💬 Comment Content (2) */}
        <div className="grow">
          {/* Header: User, Date, and Recipe Link */}
          <div className="flex justify-between items-start mb-2">
            {/* User and Date */}
            <div className="flex flex-col">
              {/* User Name */}
              <p className="font-semibold text-gray-800 text-base">
                {`${userProfile.firstName} ${userProfile.lastName}`}
              </p>
              {/* Date */}
              <p className="text-xs text-gray-500">{formatCommentDate(commentData.createdAt)}</p>
            </div>

            {/* Recipe Link */}
            <a
              href={`/recipe/${commentData.recipe_id}`}
              className="text-sm font-medium text-green-700 hover:text-green-900 transition underline whitespace-nowrap"
              title={`View ${"recipeTitle"}`}
            >
              Recipe: {`${commentData.recipe_id}`}
            </a>
          </div>

          {/* Comment Text */}
          <p className="text-base text-gray-700 leading-relaxed">{commentData.comment_text}</p>

          {/* Optional: Icon for visual context at the bottom */}
          <div className="mt-3 text-right text-gray-400">
            <FontAwesomeIcon icon={faComment} size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}
