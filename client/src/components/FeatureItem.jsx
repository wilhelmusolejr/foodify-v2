import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureItem({ icon, title, description }) {
  return (
    <div className="border border-white/20 px-5 py-10 rounded-lg bg-black/20">
      <div className="h-14 w-14 flex items-center justify-center bg-white/10 rounded-full mb-4">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <h3 className="text-xl font-semibold mb-4 uppercase">{title}</h3>
      <p className="leading-relaxed text-[#f5f5f5] font-light">{description}</p>
    </div>
  );
}
