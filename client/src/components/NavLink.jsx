import React from "react";
import { useLocation } from "react-router-dom";

// /GGG

export default function NavLink({ url = "#", label }) {
  const location = useLocation();

  let className =
    location.pathname === url
      ? "text-green-600 font-semibold"
      : "text-gray-500 hover:text-green-500";

  return (
    <li className={`list-none text-xl ${className}`}>
      <a href={url}>{label}</a>
    </li>
  );
}
