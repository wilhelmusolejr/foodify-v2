import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconItem({ icon, name, status }) {
  const colorClasses = status
    ? {
        bg: "bg-green-100",
        text: "text-green-800",
      }
    : {
        bg: "bg-red-100",
        text: "text-red-800",
      };

  return (
    <div
      className={`aspect-square p-2 rounded-lg text-center shadow-sm flex items-center justify-center flex-col ${colorClasses.bg} ${colorClasses.text}`}
    >
      <FontAwesomeIcon icon={icon} className="mb-2" size="xl" />
      <h3 className="font-semibold text-base capitalize">{name}</h3>
    </div>
  );
}
