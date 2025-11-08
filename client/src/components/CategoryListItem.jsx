import React from "react";

export default function CategoryListItem({ name, number }) {
  return (
    <div className="flex justify-between p-5 border-t border-black/10">
      <p className="underline">{name}</p>
      <p>{number}</p>
    </div>
  );
}
