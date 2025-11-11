import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faHeart,
  faStar,
  faBars,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import NavLink from "./NavLink";

export default function Navigator() {
  return (
    <nav className="bg-white w-10/12 mx-auto mt-10 p-4 rounded-lg border border-black/10 flex justify-between items-center gap-10">
      <div className="flex-1">
        <Logo />
      </div>

      <div className="hidden lg:block">
        <ul className="uppercase flex gap-4">
          <NavLink label={"Home"} />
          <NavLink label={"About"} />
          <NavLink label={"Recipes"} />
          <NavLink label={"Blog"} />
          <NavLink label={"Faq"} />
          <li>
            <FontAwesomeIcon icon={faSearch} className="text-base" />
          </li>
        </ul>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <NavLink label={"Login"} />
        <button className="bg-[#2B4A13] text-white px-5 uppercase py-3 rounded-lg font-medium">
          Register
        </button>
      </div>

      {/* BAR */}
      <div className="lg:hidden">
        <FontAwesomeIcon icon={faBars} className="text-3xl" />
      </div>
    </nav>
  );
}
