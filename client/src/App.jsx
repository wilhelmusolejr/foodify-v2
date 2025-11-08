import "./App.css";
import BlogItem from "./components/BlogItem";
import CategoryItem from "./components/CategoryItem";
import CategoryListItem from "./components/CategoryListItem";
import HeadingImage from "./components/HeadingImage";
import Recipe from "./components/Recipe";
import SectionHeading from "./components/SectionHeading";
import SectionParent from "./components/SectionParent";
import StatCard from "./components/StatCard";

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

  return (
    <>
      {/* Navigator */}
      <nav className="bg-white w-10/12 mx-auto mt-10 p-4 rounded-lg border border-black/10 flex justify-between items-center">
        {/* LOGO */}
        <div className="logo">
          <p>Foodify</p>
        </div>

        {/* BAR */}
        <div className="bar">
          <p>BAR</p>
        </div>
      </nav>

      {/* Head */}
      <div className="header min-h-[80vh] w-10/12 mx-auto mt-10 px-4 py-10 rounded-lg bg-white border border-black/10 flex flex-col justify-between">
        {/* GROUP 1 */}
        <div className="">
          {/* heading */}
          <h1 className="text-2xl mb-4">
            Discover, share, and savor. Delicious recipes from around the world.
          </h1>

          {/* paragraph */}
          <p className="mb-4">
            Unlock a word of variety culinary recipes and unleash your inner
            beauty the easy way with Foodify.
          </p>

          {/* button */}
          <div className="btn">
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* GROUP 2 */}
        <div className="">
          {/* stats */}
          <div className="flex justify-center gap-5 mb-4">
            <StatCard number="2500+" label="Recipes" />
            <StatCard number="2500+" label="Deliveries" />
            <StatCard number="2500+" label="Users" />
          </div>

          {/* images */}
          <div className="flex gap-5 overflow-scroll pb-5">
            <HeadingImage color={"bg-red-600"} />
            <HeadingImage color={"bg-blue-600"} />
            <HeadingImage color={"bg-violet-600"} />
          </div>
        </div>
      </div>

      {/* Section - Categories */}
      <SectionParent>
        {/* Heading */}
        <SectionHeading
          heading={"Explore meal types"}
          subheading={"Discover delicious meals for every ocean."}
        />

        {/* list */}
        <div className="flex gap-4 flex-wrap justify-center">
          {/* item */}
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
      </SectionParent>

      {/* Section - Recipe Finder */}
      <SectionParent>
        <div className="capitalize flex gap-2 flex-col mb-10">
          <p className="italic">Turn Your Leftovers into Delicious Meals</p>
          <h2 className="text-2xl font-semibold">What's in Your Fridge?</h2>
        </div>

        <p className="mb-20">
          This interactive tool lets you enter ingredients from your fridge or
          pantry (like apples, flour, or sugar) and instantly generates recipe
          ideas that match what you have. Prioritize recipes that maximize your
          available items or minimize missing ones, while optionally ignoring
          pantry staples like salt or water. Perfect for reducing food waste and
          whipping up quick meals!
        </p>

        <div className="border-black/10 border rounded-lg p-4 bg-green-900 text-white">
          <h2 className="uppercase text-xl pb-4">Recipe finder tool</h2>
          <div className="">
            {/* box 1 */}
            <div className="px-4 py-10 bg-white text-black rounded-lg rounded-b-none border-b-2 border-black/30">
              <h3 className="text-2xl  mb-2">
                Tell us what ingredients you have!
              </h3>
              <p>
                Type the first ingredient you have in the search box and pick
                the best match from the drop down. We need a minimum of 3
                ingredients to find you some recipes.
              </p>

              {/* form */}
              <div className="flex gap-3 flex-col mt-4">
                <input
                  type="text"
                  placeholder="e.g. chicken, rice, broccoli"
                  className="w-full border border-black/10 rounded-lg px-4 py-3"
                />
                <button className="bg-black w-full text-white px-4 py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>

            {/* box 2 */}
            <div className="px-4 py-10 bg-white min-h-[300px] text-black rounded-lg rounded-t-none">
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
      </SectionParent>

      {/* Section - Popular Recipes */}
      <SectionParent>
        {/* Heading */}
        <SectionHeading
          heading={"Popular Recipes"}
          subheading={"Discover delicious meals for every ocean."}
        />

        {/* parent */}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Recipe name={"Spaghetti Carbonara"} />
          <Recipe name={"Thai Green Curry"} />
          <Recipe name={"Garlic Butter Shrimp"} />
          <Recipe name={"Classic Caesar Salad"} />
          <Recipe name={"Beef Tacos with Salsa"} />
          <Recipe name={"Chocolate Lava Cake"} />
        </div>
      </SectionParent>

      {/* Section - Blog */}
      <SectionParent>
        <div className="flex flex-col gap-50">
          {/* side 1 */}
          <div className="">
            <SectionHeading
              heading={"Community Picks"}
              subheading={
                "Top-Rated Recipes from Our Cooking Community This Week"
              }
            />

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
              <button className="bg-black uppercase text-white px-4 py-3 w-full rounded-lg">
                view more recent blogs
              </button>
            </div>
          </div>

          {/* side 2 */}
          <div className="flex flex-col gap-20 ">
            {/* recipes */}
            <div className="">
              <div className="mb-10">
                <h2 className="text-2xl font-semibold">Explore Recipes</h2>
              </div>

              {/* parent */}
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Recipe name={"Spaghetti Carbonara"} />
                <Recipe name={"Thai Green Curry"} />
                <Recipe name={"Garlic Butter Shrimp"} />
              </div>
            </div>

            {/* Category list */}
            <div className="">
              {/* heading */}
              <div className="py-10 text-center rounded-lg rounded-b-none bg-black text-white">
                <h2 className="text-2xl">Recipe collections</h2>
              </div>
              {/* list */}
              <div className="bg-slate-200 rounded-lg rounded-t-none">
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
      </SectionParent>

      {/* Section - mail letter */}
      <div className="py-20 bg-black text-white mb-30">
        <div className="w-50 h-50 bg-red-400"></div>

        <div className="w-10/12 mx-auto">
          <h2 className="text-3xl font-medium mb-4">
            Deliciousness to your inbox
          </h2>
          <p>Enjoy weekly hand picked recipes and recommendations.</p>

          {/* form */}
          <div className="flex gap-3 flex-col mt-4">
            <input
              type="text"
              placeholder="e.g. chicken, rice, broccoli"
              className="w-full bg-white text-black rounded-lg px-4 py-3"
            />
            <button className="bg-white w-full text-black px-4 py-3 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <footer className="pt-10  w-10/12 mx-auto border border-black/10 rounded-lg ">
        <div className="px-5 pb-10">
          {/* side 1 */}
          <div className="mb-10">
            <div className="logo">
              <p>Foodify</p>
            </div>
            <p>
              “On the other hand, we denouce with righteous indignation and
              dsilike men who are so beguiled and demoralized by the charms of
              pleasure of the moment”
            </p>
          </div>

          {/* side 2 */}
          <div className="flex gap-10 flex-col">
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
