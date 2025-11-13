import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialItem({ icon, name }) {
  return (
    <div className="p-3 border border-black/10 rounded-lg flex items-center gap-3 bg-gray-100 max-w-50">
      {/* icon */}
      <div className="w-10 h-10 border border-black/10 rounded-lg flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="" />
      </div>

      {/* Text */}
      <p className="text-xl">{name}</p>
    </div>
  );
}
