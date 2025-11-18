import React from "react";

export default function ListItem({ children }) {
  return (
    <li className="capitalize flex items-center gap-3 text-lg lg:text-xl font-light">{children}</li>
  );
}
