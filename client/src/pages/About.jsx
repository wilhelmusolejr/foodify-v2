import React, { useEffect } from "react";

// Components
import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import FeatureItem from "@components/FeatureItem";
import SocialItem from "@components/SocialItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import TextImageBlock from "@components/TextImageBlock";
import TeamItem from "@components/TeamItem";
import Paragraph from "@components/Paragraph";

// Animation
import { fadeUp, staggerContainer, slideLeft } from "@/animations/motionVariants";

// Library
import { motion } from "framer-motion";

import {
  faBowlFood,
  faHeart,
  faListCheck,
  faShareNodes,
  faUserTie,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { scaleFade, slideRight } from "../animations/motionVariants";

let featureList = [
  {
    id: 1,
    icon: faHeart,
    title: "Recipe Management",
    description: `Easily organize and categorize your recipes with our intuitive management tools.
    Create collections, tag ingredients, and access your favorite dishes anytime,
    anywhere.`,
  },
  {
    id: 2,
    icon: faUtensils,
    title: "Smart Ingredient Tracking",
    description: `Track ingredients you have on hand and never miss an essential item again.
    Get suggestions based on your pantry to reduce waste and cook smarter.`,
  },
  {
    id: 3,
    icon: faListCheck,
    title: "Automated Meal Planning",
    description: `Plan your meals for the week with ease. Our system generates balanced meal
    schedules based on your preferences, dietary needs, and available ingredients.`,
  },
  {
    id: 4,
    icon: faBowlFood,
    title: "Step-by-Step Cooking Mode",
    description: `Follow recipes effortlessly with a clean, step-by-step view optimized for
    cooking. No distractions — just clear instructions and visual guidance.`,
  },
  {
    id: 5,
    icon: faShareNodes,
    title: "Share & Discover Recipes",
    description: `Explore community-created recipes and share your own masterpieces.
    Save your favorites, leave reviews, and inspire others with your creations.`,
  },
];

const socialLinks = [
  {
    icon: faUserTie,
    name: "portfolio",
    link: "https://wilhelmus.vercel.app",
  },
  {
    icon: faFacebookF,
    name: "facebook",
    link: "https://facebook.com/wilhelmus.ole",
  },
  {
    icon: faGithubAlt,
    name: "GitHub",
    link: "https://github.com/wilhelmusolejr",
  },
  {
    icon: faLinkedinIn,
    name: "LinkedIn",
    link: "https://linkedin.com/wilhelmusolejr",
  },
];

export default function About() {
  const PAGE_NAME = import.meta.env.VITE_PAGE_NAME;

  // Page title
  useEffect(() => {
    document.title = `About Us | ${PAGE_NAME}`;
  }, []);

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* header */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="my-10 md:my-14 about-header"
      >
        <div className="min-h-[50vh] text-white flex items-center justify-center ">
          <div className="text-center capitalize flex gap-2 flex-col">
            <motion.p
              variants={fadeUp}
              className="italic  uppercase text-base md:text-lg lg:text-xl "
            >
              Turn Your Leftovers into Delicious Meals
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            >
              about us
            </motion.h2>
          </div>
        </div>
      </motion.header>

      {/* Paragraphs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
        className="py-30 bg-white"
      >
        <div className="w-10/12 max-w-7xl mx-auto ">
          {/* paragraph */}
          <div className="flex flex-col gap-10 ">
            <motion.div variants={fadeUp}>
              <Paragraph className="mx-auto">
                At
                <span className="inline-block px-2">
                  <img src="images/logo.png" alt="" className="w-20" />
                </span>
                , we believe that food is more than just meals—it’s a way to connect, create, and
                celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs
                alike to easily organize, discover, and share their favorite recipes. Whether you’re
                meal-planning for the week, preserving family traditions, or experimenting with new
                flavors, we provide the tools to make recipe management simple, intuitive, and
                enjoyable. Built by food lovers, for food lovers, we’re here to help you turn every
                ingredient into inspiration.
              </Paragraph>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Paragraph className="mx-auto">
                At LOGO, we believe that food is more than just meals—it’s a way to connect, create,
                and celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs
                alike to easily organize, discover, and share their favorite recipes.
              </Paragraph>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="py-40 bg-green-900 text-white"
      >
        <div className="w-10/12 max-w-7xl mx-auto ">
          {/* HEADING */}
          <motion.div variants={fadeUp}>
            <SectionHeading heading="Our Features" subheading="Empowering Your Culinary Journey" />
          </motion.div>

          {/* Parent */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-5">
            {/* item */}
            {featureList.map((item) => (
              <FeatureItem icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Text - Image  */}
      <div className="py-40 bg-white">
        <div className="w-10/12 max-w-7xl mx-auto ">
          <div className="flex flex-col gap-20 ">
            {/* item */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideLeft}
            >
              <TextImageBlock
                image_path={"images/about/about (1).png"}
                heading={"Our Mission"}
                description={
                  "Our mission is to revolutionize the way people interact with food and cooking. We aim to empower individuals to make the most of their ingredients, reduce food waste, and inspire creativity in the kitchen. By providing innovative tools and a supportive community, we strive to make cooking accessible, enjoyable, and sustainable for everyone."
                }
                type={"1"}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideRight}
            >
              <TextImageBlock
                image_path={"images/about/about (2).png"}
                heading={"We care for"}
                description={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi quasi quae tempore corporis officiis quis beatae eius molestias enim earum. Nostrum totam molestiae vel asperiores, saepe mollitia fuga quasi deserunt!"
                }
                type={"2"}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-40"
      >
        <div className="w-10/12 max-w-7xl mx-auto ">
          {/* HEADING */}
          <SectionHeading heading="Our Features" subheading="Empowering Your Culinary Journey" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5  max-w-[700px] mx-auto">
            {/* item */}
            <motion.div variants={scaleFade}>
              <TeamItem />
            </motion.div>
            {/* item */}
            <motion.div variants={scaleFade}>
              <TeamItem />
            </motion.div>
            {/* item */}
            <motion.div variants={scaleFade}>
              <TeamItem />
            </motion.div>
            {/* item */}
            <motion.div variants={scaleFade}>
              <TeamItem />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Actual about */}
      <div className="py-40 bg-white">
        <div className="w-10/12 max-w-7xl mx-auto ">
          {/* image */}
          <div className="mb-20 h-50 md:h-70 lg:h-90 relative">
            <img
              src="images/about/background_logo.png"
              alt=""
              className="object-cover object-center w-full h-full rounded-sm"
            />

            <img
              src="images/logo.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 md:w-32 lg:w-40"
            />
          </div>

          <div className="flex flex-col gap-10 max-w-prose text-xl mx-auto leading-relaxed text-[#333] font-light">
            <Paragraph className="mb-10 mx-auto">
              We believe that food is more than just meals—it’s a way to connect, create, and
              celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs alike
              to easily organize, discover, and share their favorite recipes. Whether you’re
              meal-planning for the week, preserving family traditions, or experimenting with new
              flavors, we provide the tools to make recipe management simple, intuitive, and
              enjoyable. Built by food lovers, for food lovers, we’re here to help you turn every
              ingredient into inspiration.
            </Paragraph>

            <div className="">
              <h2 className="capitalize font-medium text-2xl">Connect With Us</h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-5 flex flex-col gap-5"
              >
                {socialLinks.map((social, index) => (
                  <motion.div key={index} variants={fadeUp}>
                    <SocialItem
                      key={index}
                      icon={social.icon}
                      name={social.name}
                      link={social.link}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
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
