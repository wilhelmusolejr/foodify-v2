import React from "react";

export default function Button({
  children,
  isDisabled = false,
  color = "bg-green-900",
  hoverColor = "hover:bg-green-800",
  textColor = "text-white",
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      disabled={isDisabled}
      className={`
        px-6 py-4 
        ${color} 
        ${textColor}
        font-semibold 
        rounded-lg 
        shadow-sm 
        transition-all 
        duration-200 
        ${hoverColor} 
        hover:shadow-md 
        hover:scale-[1.02]
        cursor-pointer
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
