import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Prop from "./Prop.jsx";
import Menu from "./Menu.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Prop" element={<Prop />} />
    </Routes>
  </BrowserRouter>
);
