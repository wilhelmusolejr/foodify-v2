import React from "react";

export default function CheckboxItem({ name }) {
  return (
    <div className="">
      <input type="checkbox" id={name} className="mr-2" />
      <label htmlFor={name} className="capitalize text-[#333333] font-light">
        {name}
      </label>
    </div>
  );
}
