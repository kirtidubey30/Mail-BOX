import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Compose from "./components/mail/Compose";
import Sent from "./components/mail/Sent";
import Inbox from "./components/mail/Inbox";
import EmailDetail from "./components/mail/EmailDetail";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/compose" element={<Compose />}></Route>
      <Route path="/sent" element={<Sent />}></Route>
      <Route path="/inbox" element={<Inbox />}></Route>
      <Route path="emailDetail" element={<EmailDetail />}></Route>
    </Routes>
  );
};

export default AllRoutes;
