import React from "react";
import LabeledInput from "@components/LabeledInput";

export default function NutrientFormGroup({ heading, data, onChange }) {
  return (
    <div className="border rounded-lg p-5 border-black/20 ">
      {/* Heading */}
      <h3 className="mb-4 text-xl font-medium">{heading}</h3>
      <div className="flex flex-col gap-5">
        {/* minimum */}
        <LabeledInput
          name="Minimum"
          data={data[0]}
          onChange={onChange}
          nutrientName={heading.toLowerCase()}
        />
        {/* maximum */}
        <LabeledInput
          name="Maximum"
          data={data[1]}
          onChange={onChange}
          nutrientName={heading.toLowerCase()}
        />
      </div>
    </div>
  );
}
