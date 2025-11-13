import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureItem({ icon, title, description }) {
  return (
    <div className="border border-white/20 px-5 py-10 rounded-lg bg-black/20">
      <FontAwesomeIcon icon={icon} size="2x" className="mb-4" />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="leading-relaxed text-[#f5f5f5] font-light">{description}</p>
    </div>
  );
}
