import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";

export default function Search() {
  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* headig */}
      <div className="w-10/12 mx-auto mt-30">
        <SectionHeading
          heading="Find Your Perfect Meal"
          subheading="Browse All Recipes by Category or Filter"
        />
      </div>

      <div className="w-10/12 mx-auto">
        <h3 className="mb-2 ms-2 text-xl font-medium">Search by...</h3>
        {/* type of search */}
        <div className=" p-2 rounded-lg mb-10 bg-white">
          {/* item */}
          <div className="py-5 flex items-center justify-center border bg-[#f5f5f5] border-black/20  rounded-lg  cursor-pointer  ">
            <p>Recipe</p>
          </div>

          {/* item */}
          <div className="py-5 flex items-center justify-center  rounded-lg  cursor-pointer hover:shadow-lg transition-shadow">
            <p>Ingredient</p>
          </div>

          {/* item */}
          <div className="py-5 flex items-center justify-center  rounded-lg  cursor-pointer hover:shadow-lg transition-shadow">
            <p>Nutrient</p>
          </div>
        </div>

        {/* form big */}
        <div className="py-20 px-10 bg-white border border-black/10 rounded-lg">
          {/* search input */}
          <div className="flex gap-3 flex-wrap mb-10">
            <div className="w-full ">
              <p className="mb-2 capitalize">Recipe name</p>
              <input
                type="text"
                placeholder="e.g. chicken, rice, broccoli"
                className={`w-full border border-black/50 rounded-lg px-4 py-3 pr-10 focus:outline-none`}
              />
            </div>
            <button className="bg-black min-w-30 w-full cursor-pointer lg:w-30 text-white px-4 py-3 rounded-lg uppercase flex gap-2 justify-center items-center">
              <FontAwesomeIcon icon={faPlus} />
              <p>Search</p>
            </button>
          </div>

          {/* filter */}
          <div className="flex gap-5 flex-col">
            {/* item - type filter */}
            <div className="">
              {/* Heading */}
              <h3 className="mb-4 text-xl font-medium">Dietary Restrictions</h3>

              {/* checkboxes */}
              <div className="flex flex-col gap-2">
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
              </div>
            </div>

            {/* item - type filter */}
            <div className="">
              {/* Heading */}
              <h3 className="mb-4 text-xl font-medium">Intolerances</h3>

              {/* checkboxes */}
              <div className="flex flex-col gap-2">
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
                {/* item */}
                <div className="">
                  <input type="checkbox" id="vegetarian" className="mr-2" />
                  <label htmlFor="vegetarian" className="">
                    Vegetarian
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
