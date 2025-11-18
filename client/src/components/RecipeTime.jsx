import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

export default function RecipeTime({ heading, time }) {
  if (time === null) {
    return;
  }

  return (
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faClock} className="text-green-900" size="2xl" />
      <div className="font-medium">
        <p className="uppercase text-lg text-[#444]">{heading}</p>
        <h3 className="text-xl ">{time} minutes</h3>
      </div>
    </div>
  );
}
