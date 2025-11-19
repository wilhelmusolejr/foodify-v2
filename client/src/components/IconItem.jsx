import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconItem({ icon, name, status }) {
  let color = status === false ? "red" : "green";

  return (
    <div
      className={`bg-${color}-100 aspect-square text-${color}-800 p-2 rounded-lg text-center shadow-sm flex items-center justify-center flex-col`}
    >
      <FontAwesomeIcon icon={icon} className="mb-2" size="xl" />
      <h3 className="font-semibold text-base capitalize">{name}</h3>
    </div>
  );
}
