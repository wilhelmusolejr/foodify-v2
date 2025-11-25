import React from "react";
import FormLabel from "./FormLabel";

export default function FormLabelInput({
  labelName,
  isRequired = false,
  inputType,
  id,
  onChange,
  value,
  isDisabled = false,
}) {
  return (
    <div className="capitalize flex flex-col gap-2">
      <FormLabel htmlFor={id} labelName={labelName} isRequired={isRequired} />
      <input
        type={inputType}
        name={id}
        id={id}
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          onChange(e, id);
        }}
        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
