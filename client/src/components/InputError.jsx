import React from "react";

import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputError({ error }) {
  if (!error) {
    return;
  }

  return (
    <div className="my-5 mb-10 rounded-lg bg-red-50 border border-red-200 p-4">
      <p className="text-red-700 font-medium flex items-center gap-2">
        <FontAwesomeIcon icon={faExclamation} /> {error}
      </p>
    </div>
  );
}
