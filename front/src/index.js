import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./view/admin";
import Dashboard from "./view/dashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./view/user";
import UserDashBoard from "./view/userDashboard";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user" element={<User />} />
      <Route path="/user-dashboard" element={<UserDashBoard />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
