import React, { useEffect } from "react";

// Library
import { motion } from "framer-motion";

import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import MailLetter from "@components/MailLetter";
import Footer from "@components/Footer";
import Test from "@components/Test";

// UTILS
import { fadeUp, staggerContainer } from "@/animations/motionVariants";
import { ENV } from "@/config/env";

// JSON
import listCategory from "@/demo/category.json";

export default function Category() {
  // Page title
  useEffect(() => {
    document.title = `Explore Categories | ${ENV.pageName}`;
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
