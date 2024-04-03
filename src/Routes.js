import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
