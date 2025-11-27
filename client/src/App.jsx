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

function App() {
  return (
    <BrowserRouter>
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
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
}

export default App;
