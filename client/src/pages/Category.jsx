import React from "react";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import CategoryItem from "@components/CategoryItem";
import MailLetter from "@components/MailLetter";
import Footer from "@components/Footer";
import Test from "../components/Test";

export default function Category() {
  let listCategory = [
    {
      id: 1,
      name: "Main course",
      image_name: "main_course.jpg",
    },
    {
      id: 2,
      name: "Side dish",
      image_name: "side_dish.jpg",
    },
    {
      id: 3,
      name: "Dessert",
      image_name: "dessert.jpg",
    },
    {
      id: 4,
      name: "Appetizer",
      image_name: "appetizer.jpg",
    },
    {
      id: 5,
      name: "Salad",
      image_name: "salad.jpg",
    },
    {
      id: 6,
      name: "Bread",
      image_name: "bread.jpg",
    },
    {
      id: 7,
      name: "Breakfast",
      image_name: "breakfast.jpg",
    },
    {
      id: 8,
      name: "Soup",
      image_name: "soup.jpg",
    },
    {
      id: 9,
      name: "Beverage",
      image_name: "beverage.jpg",
    },
    {
      id: 10,
      name: "Sauce",
      image_name: "sauce.jpg",
    },
    {
      id: 11,
      name: "Marinade",
      image_name: "marinade.jpg",
    },
    {
      id: 12,
      name: "Fingerfood",
      image_name: "fingerfood.jpg",
    },
    {
      id: 13,
      name: "Snack",
      image_name: "snack.jpg",
    },
    {
      id: 14,
      name: "Drink",
      image_name: "drink.jpg",
    },
  ];

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <div className="pb-20 ">
        <div className="w-10/12 mx-auto my-10 md:my-20 lg:my-28 xl:my-32">
          <SectionHeading
            heading="Categories"
            subheading="Turn Your Leftovers into Delicious Meals"
          />

          {/* Categories content here */}
          <div className="md:w-10/12 mx-auto max-w-[900px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-10 place-items-center">
            {listCategory.map((item) => (
              <Test key={item.id} name={item.name} image_name={item.image_name} />
            ))}
          </div>
        </div>
      </div>

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
