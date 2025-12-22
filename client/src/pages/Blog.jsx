import React, { useEffect } from "react";

import SectionHeading from "@components/SectionHeading";
import Navigator from "@components/Navigator";
import Label from "@components/Label";
import BlogItemV2 from "@components/BlogItemV2";
import Pagination from "@components/Pagination";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";

// UTILS
import { ENV } from "@/config/env";
import { fadeUp, staggerContainer } from "@/animations/motionVariants";

// LIBRARY
import { motion } from "framer-motion";

let blogs = [
  {
    header: "10 Quick and Easy Dinner Recipes for Busy Weeknights",
    date: "November 15, 2025",
    image_name: "blog1.jpg",
    description:
      "Discover simple, tasty dinner ideas that you can make in under 30 minutes—perfect for those busy evenings when time is short but flavor still matters.",
  },
  {
    header: "5 Delicious One-Pot Meals to Simplify Your Cooking",
    date: "November 18, 2025",
    image_name: "blog2.jpg",
    description:
      "Cut down on cleanup without sacrificing taste. These one-pot meals are hearty, comforting, and incredibly easy to make on any night of the week.",
  },
  {
    header: "Healthy Breakfast Ideas to Kickstart Your Morning",
    date: "November 20, 2025",
    image_name: "blog3.jpg",
    description:
      "Start your day right with these nutritious and energizing breakfast ideas that blend convenience with wholesome ingredients.",
  },
  {
    header: "10 Quick and Easy Dinner Recipes for Busy Weeknights",
    date: "November 15, 2025",
    image_name: "blog4.jpg",
    description:
      "Discover simple, tasty dinner ideas that you can make in under 30 minutes—perfect for those busy evenings when time is short but flavor still matters.",
  },
  {
    header: "5 Delicious One-Pot Meals to Simplify Your Cooking",
    date: "November 18, 2025",
    image_name: "blog5.jpg",
    description:
      "Cut down on cleanup without sacrificing taste. These one-pot meals are hearty, comforting, and incredibly easy to make on any night of the week.",
  },
  {
    header: "Healthy Breakfast Ideas to Kickstart Your Morning",
    date: "November 20, 2025",
    image_name: "blog6.jpg",
    description:
      "Start your day right with these nutritious and energizing breakfast ideas that blend convenience with wholesome ingredients.",
  },
];

export default function Blog() {
  // Page title
  useEffect(() => {
    document.title = `Articles | ${ENV.pageName}`;
  }, []);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* heading */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-10/12 max-w-7xl mx-auto mt-30"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading heading="Blog" subheading="Browse All Recipes by Category or Filter" />
        </motion.div>

        {/* Search */}
        <div className="flex justify-end  mb-14 mt-30">
          <div className="flex flex-col md:flex-row md:items-end justify-center gap-2">
            {/* form */}
            <div className="w-full md:w-fit flex flex-col gap-2">
              <Label name="Blog name" required={true} />
              <input
                type="text_name"
                placeholder="e.g. chicken, rice, broccoli"
                className={`border flex-1 md:w-fit border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
              />
            </div>
            {/* button */}
            <button className="bg-black w-full md:w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
              <p>Search</p>
            </button>
          </div>
        </div>

        {/* parent */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {blogs.map((blog, index) => (
            <BlogItemV2 data={blog} />
          ))}
        </div>

        <Pagination />
      </motion.div>

      <br />

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
