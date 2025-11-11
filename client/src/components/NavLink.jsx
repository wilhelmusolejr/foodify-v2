import React from "react";

export default function NavLink({ url = "#", label }) {
  return (
    <li className="list-none text-xl">
      <a href={url}>{label}</a>
    </li>
  );
}
