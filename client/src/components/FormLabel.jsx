import React from "react";

export default function FormLabel({ labelName, isRequired, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="font-medium text-gray-700 capitalize">
      {labelName} {isRequired ? <span className="text-red-500">*</span> : ""}
    </label>
  );
}
