import React from "react";

// COMPONENTS
import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faDownLong } from "@fortawesome/free-solid-svg-icons";

export default function Bookmark() {
  return (
    <>
      {/* navigator */}
      <Navigator />

      {/* heading */}
      <div className="w-10/12 mx-auto mt-30">
        {/* heading */}
        <SectionHeading heading="Bookmark" subheading="Browse All Recipes by Category or Filter" />

        <div className="flex flex-col gap-3">
          <div className="p-5 border border-black/30 rounded-lg flex items-center justify-between gap-2">
            <p>Recipes</p>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          <button className="py-5 border border-black/30 rounded-lg w-full">
            Generate Shopping List
          </button>
        </div>

        {/* recipe */}
        <div className=""></div>
      </div>
    </>
  );
}
