import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// COMPONENTS
import Navigator from "@components/Navigator";
import DateCardItem from "../components/mealplanner/DateCardItem";

export default function Mealplanner() {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateData, setSelectedDateData] = useState({});

  // Today in ISO format
  const todayISO = new Date().toISOString().slice(0, 10);

  // Build week schedule
  const schedule = getWeekSchedule();
  // mimic date
  schedule[0].meal.breakfast = [5252];
  schedule[2].meal.breakfast = [5252, 7949];
  schedule[5].meal.breakfast = [5252, 7949];

  // Load today's schedule item into state
  useEffect(() => {
    const todayData = schedule.find((day) => day.iso === todayISO);

    console.log(todayData);

    if (todayData) {
      setSelectedDate(todayData.date); // e.g. "December 13"
      setSelectedDateData(todayData); // entire object
    }
  }, [todayISO]);

  function changeSelectedDate(target) {
    console.log(target);
    setSelectedDate();
  }

  let nutrients = [
    {
      name: "Calories",
      amount: 478.32,
      unit: "kcal",
      percentOfDailyNeeds: 23.92,
    },
    {
      name: "Fat",
      amount: 34.31,
      unit: "g",
      percentOfDailyNeeds: 52.78,
    },
    {
      name: "Saturated Fat",
      amount: 3.89,
      unit: "g",
      percentOfDailyNeeds: 24.3,
    },
    {
      name: "Carbohydrates",
      amount: 12.57,
      unit: "g",
      percentOfDailyNeeds: 4.19,
    },
    {
      name: "Net Carbohydrates",
      amount: 9.36,
      unit: "g",
      percentOfDailyNeeds: 3.4,
    },
    {
      name: "Sugar",
      amount: 5.12,
      unit: "g",
      percentOfDailyNeeds: 5.69,
    },
    {
      name: "Cholesterol",
      amount: 72.32,
      unit: "mg",
      percentOfDailyNeeds: 24.11,
    },
    {
      name: "Sodium",
      amount: 940.04,
      unit: "mg",
      percentOfDailyNeeds: 40.87,
    },
    {
      name: "Alcohol",
      amount: 0,
      unit: "g",
      percentOfDailyNeeds: 100,
    },
    {
      name: "Alcohol %",
      amount: 0,
      unit: "%",
      percentOfDailyNeeds: 100,
    },
    {
      name: "Protein",
      amount: 32.66,
      unit: "g",
      percentOfDailyNeeds: 65.32,
    },
    {
      name: "Vitamin C",
      amount: 131.81,
      unit: "mg",
      percentOfDailyNeeds: 159.77,
    },
    {
      name: "Vitamin B3",
      amount: 16.03,
      unit: "mg",
      percentOfDailyNeeds: 80.13,
    },
    {
      name: "Vitamin B6",
      amount: 1.37,
      unit: "mg",
      percentOfDailyNeeds: 68.53,
    },
    {
      name: "Selenium",
      amount: 39.61,
      unit: "µg",
      percentOfDailyNeeds: 56.58,
    },
    {
      name: "Phosphorus",
      amount: 361.79,
      unit: "mg",
      percentOfDailyNeeds: 36.18,
    },
    {
      name: "Manganese",
      amount: 0.67,
      unit: "mg",
      percentOfDailyNeeds: 33.59,
    },
    {
      name: "Vitamin K",
      amount: 34.24,
      unit: "µg",
      percentOfDailyNeeds: 32.61,
    },
    {
      name: "Vitamin E",
      amount: 4,
      unit: "mg",
      percentOfDailyNeeds: 26.66,
    },
    {
      name: "Potassium",
      amount: 897.47,
      unit: "mg",
      percentOfDailyNeeds: 25.64,
    },
    {
      name: "Magnesium",
      amount: 88.76,
      unit: "mg",
      percentOfDailyNeeds: 22.19,
    },
    {
      name: "Vitamin B5",
      amount: 2.1,
      unit: "mg",
      percentOfDailyNeeds: 20.98,
    },
    {
      name: "Vitamin A",
      amount: 950.52,
      unit: "IU",
      percentOfDailyNeeds: 19.01,
    },
    {
      name: "Copper",
      amount: 0.32,
      unit: "mg",
      percentOfDailyNeeds: 16.22,
    },
    {
      name: "Vitamin B2",
      amount: 0.26,
      unit: "mg",
      percentOfDailyNeeds: 15.14,
    },
    {
      name: "Vitamin B1",
      amount: 0.2,
      unit: "mg",
      percentOfDailyNeeds: 13.59,
    },
    {
      name: "Folate",
      amount: 53.97,
      unit: "µg",
      percentOfDailyNeeds: 13.49,
    },
    {
      name: "Fiber",
      amount: 3.21,
      unit: "g",
      percentOfDailyNeeds: 12.83,
    },
    {
      name: "Iron",
      amount: 2.07,
      unit: "mg",
      percentOfDailyNeeds: 11.53,
    },
    {
      name: "Zinc",
      amount: 1.34,
      unit: "mg",
      percentOfDailyNeeds: 8.96,
    },
    {
      name: "Calcium",
      amount: 50.45,
      unit: "mg",
      percentOfDailyNeeds: 5.04,
    },
    {
      name: "Vitamin B12",
      amount: 0.23,
      unit: "µg",
      percentOfDailyNeeds: 3.88,
    },
  ];

  return (
    <>
      <Navigator />

      <div className="mt-40">
        <div className="w-10/12 mx-auto">
          {/* schedule */}
          <div className="flex gap-5 justify-center">
            {schedule.map((item, idx) => (
              <DateCardItem
                key={item.iso} // prefer stable key
                dayName={item.day_type}
                dateLabel={item.date}
                meals={item.meal}
                isToday={item.iso === todayISO}
                onClick={changeSelectedDate}
              />
            ))}
          </div>

          <div className="my-30 flex gap-10 justify-between mx-auto">
            {/* side 1 */}
            <div className="w-8/12">
              <h2 className="text-3xl font-medium capitalize mb-10">Today's meal</h2>

              <ul className="flex gap-10 flex-col">
                {/* breakfast */}
                {selectedDateData?.meal?.breakfast?.length > 0 && (
                  <li>
                    <h2 className="text-xl mb-4">Breakfast</h2>
                    <div className="flex  gap-5">
                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>
                    </div>
                  </li>
                )}

                {/* lunch */}
                {selectedDateData?.meal.lunch?.length > 0 && (
                  <li>
                    <h2 className="text-xl mb-4">Breakfast</h2>
                    <div className="flex  gap-5">
                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>
                    </div>
                  </li>
                )}

                {/* dinner */}
                {selectedDateData?.meal?.dinner?.length > 0 && (
                  <li>
                    <h2 className="text-xl mb-4">Breakfast</h2>
                    <div className="flex  gap-5">
                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>

                      {/* item */}
                      <div className="">
                        <div className="w-60 h-60 bg-red-500 rounded-lg"></div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {/* side 2 */}
            <div className="flex-1 max-w-[400px]">
              {/* button */}
              <div className="mb-10 flex flex-col gap-2">
                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                  <p>Generate shopping list weekly</p>
                </div>

                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                  <p>Add meal</p>
                </div>

                {/* item */}
                <div className="py-5 border border-black/10 rounded-lg text-center bg-white uppercase cursor-pointer">
                  <p>Modify</p>
                </div>
              </div>

              {/* nutrition  */}
              <div className="px-7 py-10 bg-white rounded-lg border border-black/10 shadow-md">
                {/* headig */}
                <div className="">
                  <h2 className="text-2xl lg:text-3xl uppercase font-semibold">Nutrition facts</h2>
                </div>

                {/* list */}

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
    </>
  );
}

/**
 * Return an array for the week (length = 7) that contains the given date (default = today).
 *
 * Each day object has the shape:
 * {
 *   date: "December 12",       // friendly
 *   iso: "2025-12-12",         // yyyy-mm-dd
 *   short: "Mon 12",           // short label
 *   day_type: "monday",        // lowercase weekday name
 *   meal: { breakfast: [], lunch: [], dinner: [] }
 * }
 *
 * @param {Date|String|Number} [baseDate=new Date()] - date to compute week for
 * @param {"monday"|"sunday"} [weekStart="monday"] - week start day
 * @param {string} [locale="en-US"] - locale for month/weekday names
 * @returns {Array<Object>} 7-day array
 */
export function getWeekSchedule(baseDate = new Date(), weekStart = "monday", locale = "en-PH") {
  const today = baseDate instanceof Date ? new Date(baseDate) : new Date(baseDate);

  // normalize time
  today.setHours(0, 0, 0, 0);

  // JS getDay(): 0 (Sun) ... 6 (Sat)
  const jsDay = today.getDay();

  // Determine how many days to subtract to get the week start
  const startOffset = weekStart === "sunday" ? jsDay : (jsDay + 6) % 7; // 0 for Monday when weekStart = monday

  const weekStartDate = new Date(today);
  weekStartDate.setDate(today.getDate() - startOffset);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(weekStartDate.getDate() + i);

    const monthName = d.toLocaleString(locale, { month: "long" }); // "December"
    const dayNumber = d.getDate(); // 1..31
    const weekdayFull = d.toLocaleString(locale, { weekday: "long" }); // "Monday"
    const weekdayShort = d.toLocaleString(locale, { weekday: "short" }); // "Mon"

    const iso = d.toISOString().slice(0, 10); // "YYYY-MM-DD"

    return {
      date: `${monthName} ${dayNumber}`,
      iso,
      short: `${weekdayShort} ${dayNumber}`,
      day_type: weekdayFull.toLowerCase(),
      meal: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
    };
  });

  return days;
}
