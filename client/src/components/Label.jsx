import React from "react";

export default function Label({ name, required = false }) {
  return (
    <label htmlFor="text_name" className="capitalize">
      {name} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
