import React, { useEffect } from "react";

// Library
import { motion } from "framer-motion";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import CategoryItem from "@components/CategoryItem";
import MailLetter from "@components/MailLetter";
import Footer from "@components/Footer";
import Test from "../components/Test";

// Animation
import { fadeUp, staggerContainer } from "@/animations/motionVariants";

export default function Category() {
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;

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

  // Page title
  useEffect(() => {
    document.title = `Explore Categories | ${PAGE_NAME}`;
  }, []);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="pb-20 ">
        <div className="w-10/12 mx-auto my-10 md:my-20 lg:my-28 xl:my-32">
          {/* Section Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeading
              heading="Categories"
              subheading="Turn Your Leftovers into Delicious Meals"
            />
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="md:w-10/12 mx-auto max-w-[900px] 
                       grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                       gap-10 gap-y-10 place-items-center"
          >
            {listCategory.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <Test name={item.name} image_name={item.image_name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
