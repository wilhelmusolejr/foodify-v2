import React from "react";
import { useLocation } from "react-router-dom";

export default function NavLink({ url = "#", label }) {
  const location = useLocation();
  console.log(location.pathname);

  let className =
    location.pathname === url
      ? "text-green-500 font-semibold"
      : "text-gray-500 hover:text-green-400";

  return (
    <li className={`list-none text-xl ${className}`}>
      <a href={url}>{label}</a>
    </li>
  );
}
