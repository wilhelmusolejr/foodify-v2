import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function CommentItem({ comment }) {
  return (
    <>
      <div className="flex gap-5 border rounded-lg p-5 bg-white shadow-md border-black/10">
        {/* icon */}
        <FontAwesomeIcon icon={faComment} className="" size="lg" />
        {/* text */}
        <p className="font-light text-[#333333]">{comment}</p>
      </div>
    </>
  );
}
