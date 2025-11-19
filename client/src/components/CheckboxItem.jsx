import React from "react";

export default function CheckboxItem({ name, onCheckBoxChange }) {
  const handleChange = (event) => {
    onCheckBoxChange(name, event.target.checked);
  };

  return (
    <div className="">
      <input type="checkbox" id={name} className="mr-2 cursor-pointer" onChange={handleChange} />
      <label htmlFor={name} className="capitalize text-[#333333] font-light cursor-pointer">
        {name}
      </label>
    </div>
  );
}
