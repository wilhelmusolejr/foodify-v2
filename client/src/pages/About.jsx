import Navigator from "@components/Navigator";
import SectionHeading from "@components/SectionHeading";
import {
  faBowlFood,
  faHeart,
  faListCheck,
  faShareNodes,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import FeatureItem from "@components/FeatureItem";
import SocialItem from "@components/SocialItem";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";
import TextImageBlock from "@components/TextImageBlock";
import React from "react";
import TeamItem from "../components/TeamItem";

export default function About() {
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

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* header */}
      <header className="my-10 md:my-20 lg:my-28 xl:my-32 about-header">
        <div className="min-h-[50vh]  text-white flex items-center justify-center ">
          <div className="text-center capitalize flex gap-2 flex-col">
            <p className="italic w-8/12 mx-auto">Turn Your Leftovers into Delicious Meals</p>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold">about us</h2>
          </div>
        </div>
      </header>

      {/* Paragraphs */}
      <div className="py-30 bg-white">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col gap-10">
            <p className="leading-relaxed text-[#333] font-light">
              At
              <span className="inline-block px-2">
                <img src="images/logo.png" alt="" className="w-20" />
              </span>
              , we believe that food is more than just meals—it’s a way to connect, create, and
              celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs alike
              to easily organize, discover, and share their favorite recipes. Whether you’re
              meal-planning for the week, preserving family traditions, or experimenting with new
              flavors, we provide the tools to make recipe management simple, intuitive, and
              enjoyable. Built by food lovers, for food lovers, we’re here to help you turn every
              ingredient into inspiration.
            </p>

            <p className="leading-relaxed text-[#333] font-light">
              At LOGO, we believe that food is more than just meals—it’s a way to connect, create,
              and celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs
              alike to easily organize, discover, and share their favorite recipes.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-30 bg-green-900 text-white">
        <div className="w-10/12 mx-auto">
          <SectionHeading heading="Our Features" subheading="Empowering Your Culinary Journey" />

          {/* Parent */}
          <div className="flex flex-col gap-10">
            {/* item */}
            {featureList.map((item) => (
              <FeatureItem icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>

      {/* Text - Image  */}
      <div className="py-30 bg-white">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col gap-20">
            {/* item */}
            <TextImageBlock
              image_path={"images/about/about (1).png"}
              heading={"Our Mission"}
              description={
                "Our mission is to revolutionize the way people interact with food and cooking. We aim to empower individuals to make the most of their ingredients, reduce food waste, and inspire creativity in the kitchen. By providing innovative tools and a supportive community, we strive to make cooking accessible, enjoyable, and sustainable for everyone."
              }
            />

            {/* item */}
            <TextImageBlock
              image_path={"images/about/about (2).png"}
              heading={"We care for"}
              description={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi quasi quae tempore corporis officiis quis beatae eius molestias enim earum. Nostrum totam molestiae vel asperiores, saepe mollitia fuga quasi deserunt!"
              }
            />
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-30">
        <div className="w-10/12 mx-auto">
          <SectionHeading heading="Our Team" subheading={"This interactive tool lets"} />

          <div className="flex justify-center flex-wrap gap-5">
            {/* item */}
            <TeamItem />
            {/* item */}
            <TeamItem />
            {/* item */}
            <TeamItem />
            {/* item */}
            <TeamItem />
          </div>
        </div>
      </div>

      {/* Actual about */}
      <div className="py-30 bg-white">
        <div className="w-10/12 mx-auto">
          {/* image */}
          <div className="mb-20 h-50 relative">
            <img
              src="images/about/background_logo.png"
              alt=""
              className="object-cover object-center w-full h-full rounded-sm"
            />

            <img
              src="images/logo.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20"
            />
          </div>

          <p className="leading-relaxed text-[#333] font-light mb-10 text-lg">
            We believe that food is more than just meals—it’s a way to connect, create, and
            celebrate. Our platform is designed for home cooks, food enthusiasts, and chefs alike to
            easily organize, discover, and share their favorite recipes. Whether you’re
            meal-planning for the week, preserving family traditions, or experimenting with new
            flavors, we provide the tools to make recipe management simple, intuitive, and
            enjoyable. Built by food lovers, for food lovers, we’re here to help you turn every
            ingredient into inspiration.
          </p>

          <div className="">
            <h2 className="capitalize font-medium text-2xl">Follow Us</h2>

            <div className="mt-5 flex flex-col gap-5">
              {/* item */}
              <SocialItem icon={faShareNodes} name="Facebook" />
              <SocialItem icon={faShareNodes} name="Twitter" />
              <SocialItem icon={faShareNodes} name="YouTube" />
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
