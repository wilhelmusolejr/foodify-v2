import React from "react";

export default function ListItem({ children }) {
  return <li className="capitalize flex items-center gap-3">{children}</li>;
}
