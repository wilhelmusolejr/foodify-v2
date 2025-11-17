import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ChecklistItem({ name, iconClassname = "" }) {
  return (
    <div className="flex flex-row items-center gap-2 ">
      <FontAwesomeIcon icon={faCheck} className={`${iconClassname}`} />
      <span>{name}</span>
    </div>
  );
}
