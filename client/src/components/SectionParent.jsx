import React from "react";

export default function SectionParent({ children, className = "" }) {
  return (
    <section className={`w-10/12 mx-auto my-30 ${className}`}>
      {children}
    </section>
  );
}
