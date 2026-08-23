import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./About.jsx";
import Menu from "./Menu.jsx";
import "./App.css";
import Search from "./Search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <Menu />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
    </Routes>
</BrowserRouter>
);
