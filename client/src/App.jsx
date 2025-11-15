import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Category from "@pages/Category";
import About from "@pages/About";
import Search from "@pages/Search";
import Blog from "@pages/Blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
