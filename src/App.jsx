import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "./components/Headers";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import CartDetails from "./components/CartDetails";
import toast, { Toaster } from "react-hot-toast";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

const App = () => {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
