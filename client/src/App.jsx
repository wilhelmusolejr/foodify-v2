import "./App.css";
import BlogItem from "./components/BlogItem";
import CategoryItem from "./components/CategoryItem";
import CategoryListItem from "./components/CategoryListItem";
import HeadingImage from "./components/HeadingImage";
import Recipe from "./components/Recipe";
import SectionHeading from "./components/SectionHeading";
import SectionParent from "./components/SectionParent";
import StatCard from "./components/StatCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faHeart, faStar, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

import Logo from "./components/Logo";
import Navigator from "./components/Navigator";

function App() {
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
  ];

  let recipeNames = [
    "Spaghetti Carbonara",
    "Grilled Chicken Salad",
    "Creamy Mushroom Risotto",
    "Beef Stir-Fry with Veggies",
    "Lemon Garlic Shrimp Pasta",
    "Classic Margherita Pizza",
  ];

  let recipes = recipeNames.map((name, index) => ({
    name,
    image_path: `images/recipe/recipe (${index + 1}).png`,
  }));

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* Head */}
      <div className="header min-h-[80vh] w-10/12 mx-auto my-10 text-white px-4 py-10 md:px-10 md:py-14 rounded-lg bg-white border border-black/10 flex flex-col justify-center gap-20 ">
        {/* GROUP 1 */}
        <div className="">
          {/* heading */}
          <h1 className="text-2xl md:text-3xl xl:text-4xl mb-4 autour-one">
            Discover, share, and savor. Delicious recipes from around the world.
          </h1>

          {/* paragraph */}
          <p className="mb-4 font-extralight text-[#f5f5f5] max-w-[600px] leading-relaxed md:text-xl">
            Unlock a word of variety culinary recipes and unleash your inner beauty the easy way
            with Foodify.
          </p>

          {/* button */}
          <div className="btn">
            <button className="bg-[#2B4A13] text-white px-5 uppercase py-3 rounded-lg font-medium">
              Get Started
            </button>
          </div>
        </div>

        {/* GROUP 2 */}
        <div className="flex gap-5 flex-wrap justify-center">
          {/* stats */}
          <div className="flex justify-center gap-5 ">
            <StatCard number="2500+" label="Recipes" />
            <StatCard number="2500+" label="Deliveries" />
            <StatCard number="2500+" label="Users" />
          </div>

          {/* images */}
          <div className="flex gap-5 overflow-auto md pb-5">
            <HeadingImage image_path="images/header/food1.png" />
            <HeadingImage image_path="images/header/food2.png" />
            <HeadingImage image_path="images/header/food3.png" />
          </div>
        </div>
      </div>

      {/* Section - Categories */}
      <div className="bg-white py-30">
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <SectionHeading
            heading={"Explore meal types"}
            subheading={"Discover delicious meals for every ocean."}
          />

          {/* list */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* item */}
            <CategoryItem image_path={"images/category/category1.png"} title="Main course" />
            <CategoryItem image_path={"images/category/category2.png"} title="Sea food" />
            <CategoryItem image_path={"images/category/category3.png"} title="Dessert" />
            <CategoryItem image_path={"images/category/category4.png"} title="Salad" />
          </div>
        </div>
      </div>

      {/* Section - Recipe Finder */}
      <div className="py-30">
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <div className="capitalize flex gap-2 flex-col mb-10 md:text-center">
            <p className="italic">Turn Your Leftovers into Delicious Meals</p>
            <h2 className="text-2xl font-semibold">What's in Your Fridge?</h2>
          </div>

          <p className="mb-20 font-light text-[#333] max-w-lg mx-auto leading-relaxed ">
            This interactive tool lets you enter ingredients from your fridge or pantry (like
            apples, flour, or sugar) and instantly generates recipe ideas that match what you have.
            Prioritize recipes that maximize your available items or minimize missing ones, while
            optionally ignoring pantry staples like salt or water. Perfect for reducing food waste
            and whipping up quick meals!
          </p>

          {/* modal */}
          <div className="border-black/10 border rounded-lg p-4  bg-green-900 text-white md:w-2/3 lg:w-full lg:max-w-[1000px] mx-auto">
            <h2 className="uppercase text-xl pb-4 md:pb-5">Recipe finder tool</h2>
            <div className="flex flex-col lg:flex-row">
              {/* box 1 */}
              <div className="px-4 py-10 md:px-5 bg-white text-black rounded-lg rounded-b-none border-b-2 border-black/30 lg:rounded-e-none lg:rounded-s-lg lg:border-e-2 lg:border-b-0">
                <h3 className="text-2xl mb-3">Tell us what ingredients you have!</h3>
                <p className="font-light text-[#333] mb-10 leading-relaxed">
                  Type the first ingredient you have in the search box and pick the best match from
                  the drop down. We need a minimum of 3 ingredients to find you some recipes.
                </p>

                {/* form */}
                <div className="flex gap-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="e.g. chicken, rice, broccoli"
                    className="flex-1 border border-black/10 rounded-lg px-4 py-3"
                  />
                  <button className="bg-black min-w-30 text-white px-4 py-3 rounded-lg uppercase flex gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={faPlus} />
                    <p>add</p>
                  </button>
                </div>
              </div>

              {/* box 2 */}
              <div className="px-4 py-10 md:px-5 bg-white min-h-[300px] min-w-80 text-black rounded-lg rounded-t-none lg:rounded-e-lg lg:rounded-s-none">
                <h3 className="text-2xl  mb-2">Your ingredients list</h3>

                {/* parent */}
                <div className="">
                  {/* item */}
                  <div className="flex gap-5 py-3 px-4 rounded-lg border border-black/10 w-fit">
                    <p>X</p>
                    <p>Egg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section - Popular Recipes */}
      <div className="bg-white py-30">
        <div className="w-10/12 mx-auto">
          {/* Heading */}
          <SectionHeading
            heading={"Popular Recipes"}
            subheading={"Discover delicious meals for every ocean."}
          />

          {/* parent */}
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <Recipe key={index} name={recipe.name} image_path={recipe.image_path} />
            ))}
          </div>
        </div>
      </div>

      {/* Section - Blog */}
      <div className="py-30">
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col lg:flex-row gap-50 lg:gap-10">
            {/* side 1 */}
            <div className="flex-1">
              <div className=" capitalize flex gap-2 flex-col mb-10">
                <p className="italic">Top-Rated Recipes from Our Cooking Community This Week</p>
                <h2 className="text-2xl font-semibold">Community Picks</h2>
              </div>

              {/* parent */}
              <div className="">
                {blogs.map((blog, index) => (
                  <BlogItem
                    key={index}
                    heading={blog.header}
                    date={blog.date}
                    description={blog.description}
                    imageUrl={blog.image_name}
                  />
                ))}

                {/* button */}
                <div className="md:w-2/3 mx-auto lg:">
                  <button className="bg-black uppercase text-white px-4 py-3 w-full rounded-lg ">
                    view more recent blogs
                  </button>
                </div>
              </div>
            </div>

            {/* side 2 */}
            <div className="flex flex-col gap-20 lg:w-[300px] ">
              {/* recipes */}
              <div className="">
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold">Explore Recipes</h2>
                </div>

                {/* parent */}
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                  {recipes.map((recipe, index) => (
                    <Recipe key={index} name={recipe.name} image_path={recipe.image_path} />
                  ))}
                </div>
              </div>

              {/* Category list */}
              <div className="w-full md:w-2/3 mx-auto lg:w-full">
                {/* heading */}
                <div className="py-10 text-center rounded-lg rounded-b-none bg-black text-white">
                  <h2 className="text-2xl uppercase">Recipe collections</h2>
                </div>
                {/* list */}
                <div className="bg-slate-200 rounded-lg rounded-t-none border border-black/10 border-t-none">
                  {/* item */}
                  <CategoryListItem name={"Quick & Easy Recipes"} number={"78"} />
                  <CategoryListItem name={"Healthy Meals"} number={"54"} />
                  <CategoryListItem name={"Desserts & Baking"} number={"62"} />
                  <CategoryListItem name={"Vegan & Vegetarian"} number={"41"} />
                  <CategoryListItem name={"Global Cuisines"} number={"89"} />
                  <CategoryListItem name={"Soups & Salads"} number={"36"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section - mail letter */}
      <div className="pb-20 pt-40 mt-30 bg-black text-white mb-30 relative box-out">
        <div className="box-in w-60 h-60 absolute left-1/2 -translate-x-1/2 -top-[25%] flex items-center justify-center">
          <img
            src="images/burger.png"
            alt="Burger"
            className="object-contain object-center w-full h-full"
          />
        </div>

        <div className="w-10/12 max-w-96 mx-auto">
          <h2 className="text-3xl font-medium mb-4">Deliciousness to your inbox</h2>
          <p>Enjoy weekly hand picked recipes and recommendations.</p>

          {/* form */}
          <div className="flex gap-3 flex-col mt-4">
            <input
              type="text"
              placeholder="e.g. chicken, rice, broccoli"
              className="w-full bg-white text-black rounded-lg px-4 py-3"
            />
            <button className="bg-white w-full text-black px-4 py-3 rounded-lg">Get Started</button>
          </div>
        </div>
      </div>

      <footer className="bg-white pt-10 w-10/12 mx-auto border border-black/10 rounded-lg mb-30">
        <div className="px-5 pb-10 bg-blue">
          {/* side 1 */}
          <div className="mb-14 flex gap-2 flex-col">
            <Logo />
            <p className="w-10/12 max-w-[450px] leading-relaxed">
              “On the other hand, we denouce with righteous indignation and dsilike men who are so
              beguiled and demoralized by the charms of pleasure of the moment”
            </p>
          </div>

          {/* side 2 */}
          <div className="flex gap-10 flex-col md:flex-row mb-14">
            {/* nav 1 */}
            <div className="uppercase">
              <h2 className=" text-2xl font-medium mb-5">Browse</h2>
              <ul className="flex  gap-5 flex-col">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Recipes</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Faq</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
            {/* nav 2 */}
            <div className="uppercase">
              <h2 className=" text-2xl font-medium mb-5">Browse</h2>
              <ul className="flex  gap-5 flex-col">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Recipes</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Faq</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t text-center border border-black/10">
          <p className="uppercase py-10">all right reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
