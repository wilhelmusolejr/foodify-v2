import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLoader from "./components/AuthLoader";
import Home from "@pages/Home";
import Category from "@pages/Category";
import About from "@pages/About";
import Search from "@pages/Search";
import Blog from "@pages/Blog";
import Recipe from "@pages/Recipe";
import Profile from "@pages/Profile";
import Bookmark from "@pages/Bookmark";
import Mealplanner from "@pages/Mealplanner";
import Faq from "@pages/Faq";
import ScrollToTop from "@components/ScrollToTop";
import BlogItem from "@pages/BlogItem";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <AuthLoader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/bookmark/:id" element={<Bookmark />} />
          <Route path="/mealplanner/:id" element={<Mealplanner />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog/:id" element={<BlogItem />} />
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
}

export default App;
