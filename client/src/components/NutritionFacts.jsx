import React from "react";

export default function NutritionFacts({ className, data }) {
  const nutrients = data?.nutrients || [];

  return (
    <>
      <div
        className={`px-7 py-10 bg-white rounded-lg border border-black/10 shadow-md ${className}`}
      >
        <div className="">
          <h2 className="text-2xl lg:text-3xl uppercase font-semibold">Nutrition facts</h2>
        </div>

        <ul className="mt-5 flex gap-5 flex-col max-h-[500px] overflow-auto pe-3">
          {/* Mapping over the nutrients array */}
          {nutrients.map((item, index) => (
            // The key must be on the outermost repeating element (the <li>)
            <li
              key={index} // Using index as a key is okay here since the list order is static
              className="flex border-b border-black/10 justify-between text-lg lg:text-xl pb-2"
            >
              {/* Nutrient Name */}
              <div className=" text-gray-700">
                <p>{item.name}</p>
              </div>

              {/* Nutrient Amount and Unit */}
              <div className=" text-gray-900">
                <p>
                  {/* Display amount, rounded to 1 decimal place, followed by the unit */}
                  {item.amount.toFixed(1)} {item.unit}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
