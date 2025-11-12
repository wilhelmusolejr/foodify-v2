import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function ingredientListItem({ name, onRemove }) {
  return (
    <div className="gap-5 py-3 px-4 items-center rounded-lg border border-black/10 w-fit flex">
      <button onClick={onRemove} className="cursor-pointer">
        <FontAwesomeIcon icon={faX} />
      </button>
      <p>{name}</p>
    </div>
  );
}
