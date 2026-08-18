import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Dropdown from "./Dropdown.jsx";
import Menu from "./Menu.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <Menu />
    <App />

  <BrowserRouter>
  <Menu />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dropdown" element={<Dropdown />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
