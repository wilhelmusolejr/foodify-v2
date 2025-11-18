import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconItem({ icon, name }) {
  return (
    <div className="bg-green-100 text-green-800 p-5 rounded-lg text-center shadow-sm flex items-center justify-center flex-col">
      <FontAwesomeIcon icon={icon} className="mb-2" size="2xl" />
      <h3 className="font-semibold text-base capitalize">{name}</h3>
    </div>
  );
}
