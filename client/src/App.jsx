import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Category from "@pages/Category";
import About from "@pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
